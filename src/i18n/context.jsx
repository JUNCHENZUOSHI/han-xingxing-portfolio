import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import zh from './zh.json';
import zhTW from './zh-TW.json';
import en from './en.json';

const translations = { zh, 'zh-TW': zhTW, en };

const LANG_META = {
  zh:    { label: '简体中文', short: '中', icon: '🇨🇳' },
  'zh-TW': { label: '繁體中文', short: '繁', icon: '🇹🇼' },
  en:    { label: 'English',   short: 'EN', icon: '🇺🇸' },
};

const LANG_ORDER = ['zh', 'zh-TW', 'en'];

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('portfolio-lang') || 'zh'; }
    catch { return 'zh'; }
  });

  const changeLang = useCallback((l) => {
    setLang(l);
    try { localStorage.setItem('portfolio-lang', l); } catch {}
  }, []);

  // Sync <html lang> and <title>
  useEffect(() => {
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : lang;
    document.title = `${translations[lang].common.name} — AI-Native Product Designer`;
  }, [lang]);

  const t = useCallback(
    (path, vars) => {
      const keys = path.split('.');
      let val = translations[lang];
      for (const k of keys) {
        if (val == null) return path;
        val = val[k];
      }
      if (typeof val !== 'string') return Array.isArray(val) ? val : path;
      if (vars) {
        return val.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
      }
      return val;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: changeLang, t, LANG_META, LANG_ORDER }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

/** Returns translated profile data for current language */
export function useProfileData() {
  const { t, lang } = useI18n();
  // We use the raw JSON access for structured data, and t() for leaf strings
  const raw = translations[lang];
  const pd = raw.profileData || raw; // fallback

  function getStr(path, vars) {
    const keys = path.split('.');
    let val = pd;
    for (const k of keys) { if (val == null) return ''; val = val[k]; }
    if (typeof val !== 'string') return '';
    if (vars) return val.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
    return val;
  }

  // Return a structured object matching profile.js shape
  return {
    title: getStr('title'),
    subtitle: getStr('subtitle'),
    tagline: getStr('tagline'),
    specialization: pd.specialization || [],
    targetRoles: pd.targetRoles || [],
    status: getStr('status'),
    education: getStr('education'),
    yearsOfExperience: getStr('yearsOfExperience'),
    trustHooks: pd.trustHooks || [],
    narrative: pd.narrative || [],
    industries: pd.industries || [],
    workingStyleSummary: getStr('workingStyleSummary'),
    keywords: pd.keywords || [],
    experience: (pd.experience || []).map((e, i) => ({
      period: e.period || '',
      role: e.role || '',
      company: e.company || '',
      location: e.location || '',
      highlights: e.highlights || [],
      metrics: e.metrics || [],
    })),
    homeCapabilities: (pd.homeCapabilities || []).map((c) => ({
      title: c.title || '',
      description: c.description || '',
      items: c.items || [],
    })),
    skills: pd.skills || [],
    notStatements: pd.notStatements || [],
    coreValue: getStr('coreValue'),
  };
}

/** Returns translated resume page data for current language */
export function useResumeData() {
  const raw = translations[useI18n().lang];
  const rd = raw.resumeData || {};

  function s(path) {
    const keys = path.split('.');
    let val = rd;
    for (const k of keys) { if (val == null) return ''; val = val[k]; }
    return typeof val === 'string' ? val : '';
  }

  return {
    targetPosition: s('targetPosition'),
    salaryExpectation: s('salaryExpectation'),
    targetCity: s('targetCity'),
    gender: s('gender'),
    yearsExpLabel: s('yearsExpLabel'),
    salaryLabel: s('salaryLabel'),
    ageLabel: s('ageLabel'),
    strengthSummary: s('strengthSummary'),
    strengths: rd.strengths || [],
    experience: rd.experience || [],
    education: rd.education || {},
    achievementsLabel: s('achievementsLabel'),
    responsibilitiesLabel: s('responsibilitiesLabel'),
  };
}

/** Returns translated case study content for a given case slug */
export function useCaseI18n(slug) {
  const { lang } = useI18n();
  const raw = translations[lang];
  const cd = raw.casesData?.[slug] || {};
  return cd;
}

export { zh, zhTW, en };
