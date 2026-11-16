import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { getStoredLanguage, saveStoredLanguage } from '../services/storage';
import { translations, type TranslationKey } from '../data/translations';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => getStoredLanguage());

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveStoredLanguage(newLang);
  };

  const dir: 'ltr' | 'rtl' = lang === 'en' ? 'ltr' : 'rtl';
  const fontFamily =
    lang === 'ur' ? 'font-urdu' : lang === 'sd' ? 'font-sindhi' : 'font-sans';

  const isUrdu = lang === 'ur';
  const isSindhi = lang === 'sd';
  const isEnglish = lang === 'en';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  const t = (key: TranslationKey): string => {
    const item = translations[key];
    if (!item) return '';
    if (typeof item === 'object' && ('en' in item || 'ur' in item || 'sd' in item)) {
      const localized = item as Record<Language, string>;
      return localized[lang] || localized.en || localized.ur || '';
    }
    return '';
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        dir,
        fontFamily,
        isUrdu,
        isSindhi,
        isEnglish,
        t,
      }}
    >
      <div className={`min-h-screen bg-slate-50 bg-subtle-pattern text-slate-900 ${fontFamily}`} dir={dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
