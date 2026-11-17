import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Language } from '../types';
import { getStoredLanguage, saveStoredLanguage, LANGUAGE_KEY } from '../services/storage';
import { getTranslation, type TranslationKey } from '../data/translations';
import { tts } from '../services/tts';
import { LanguageContext, type LanguageContextType } from './LanguageContext';

const FONT_CLASS: Record<Language, string> = {
  en: 'font-sans',
  ur: 'font-urdu',
  sd: 'font-sindhi',
};
const ALL_FONT_CLASSES = Object.values(FONT_CLASS);
const isLanguage = (v: unknown): v is Language => v === 'en' || v === 'ur' || v === 'sd';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => getStoredLanguage());

  const setLang = useCallback((next: Language) => {
    if (!isLanguage(next)) return;
    // Persist first so a reload right after the click never reverts the choice.
    tts.stop(); // cut off speech from the previous language; callers may speak right after
    saveStoredLanguage(next);
    setLangState(next);
  }, []);

  const dir: 'ltr' | 'rtl' = lang === 'en' ? 'ltr' : 'rtl';
  const fontFamily = FONT_CLASS[lang];

  // Reflect the active language on the document so the whole page (including modals,
  // toasts and anything outside the React tree wrapper) switches direction and typeface.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    root.dataset.lang = lang;
    document.body.classList.remove(...ALL_FONT_CLASSES);
    document.body.classList.add(fontFamily);
  }, [lang, dir, fontFamily]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LANGUAGE_KEY && isLanguage(e.newValue)) setLangState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const t = useCallback(
    (key: TranslationKey, forLang?: Language) => getTranslation(key, forLang ?? lang),
    [lang],
  );

  const value = useMemo<LanguageContextType>(
    () => ({
      lang,
      setLang,
      dir,
      fontFamily,
      isUrdu: lang === 'ur',
      isSindhi: lang === 'sd',
      isEnglish: lang === 'en',
      t,
    }),
    [lang, setLang, dir, fontFamily, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen bg-slate-50 bg-subtle-pattern text-slate-900" dir={dir} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
