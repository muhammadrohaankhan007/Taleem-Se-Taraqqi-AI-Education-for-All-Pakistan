import { createContext, useContext } from 'react';
import type { Language } from '../types';
import type { TranslationKey } from '../data/translations';

export interface LanguageContextType {
  /** Active UI language. Single source of truth for the whole app. */
  lang: Language;
  /** Switch language: updates state, localStorage, <html dir/lang> and typography together. */
  setLang: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  /** Tailwind font class for the active language: font-sans | font-urdu | font-sindhi. */
  fontFamily: string;
  isUrdu: boolean;
  isSindhi: boolean;
  isEnglish: boolean;
  /**
   * Translate a key. Uses the active language unless `forLang` is given
   * (e.g. a language card that always shows its own language).
   * Falls back to English if a string is empty.
   */
  t: (key: TranslationKey, forLang?: Language) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
