import { createContext, useContext, useState, useCallback } from 'react';
import zh from './zh.json';
import en from './en.json';

const translations = { zh, en };
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('zh');

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'zh' ? 'en' : 'zh'));
  }, []);

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
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export { zh, en };
