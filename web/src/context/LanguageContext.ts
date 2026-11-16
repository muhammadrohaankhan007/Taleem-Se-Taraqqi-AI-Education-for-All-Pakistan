import { createContext, useContext } from 'react';
import type { Language } from '../types';
import type { TranslationKey } from '../data/translations';

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  fontFamily: string;
  isUrdu: boolean;
  isSindhi: boolean;
  isEnglish: boolean;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
