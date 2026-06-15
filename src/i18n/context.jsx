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
      if (typeof val !== 'string') return path;
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

export { zh, zhTW, en };
