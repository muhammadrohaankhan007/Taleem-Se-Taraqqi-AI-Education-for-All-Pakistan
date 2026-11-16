import React, { useEffect, useState } from 'react';
import type { Language } from '../types';
import { tts } from '../services/tts';
import { VolumeX } from 'lucide-react';

interface Props {
  language: Language;
}

export const SpeechNoticeBadge: React.FC<Props> = ({ language }) => {
  const [hasNativeVoice, setHasNativeVoice] = useState(true);

  useEffect(() => {
    // Check voice support
    const check = () => {
      const supported = tts.hasVoiceFor(language);
      setHasNativeVoice(supported);
    };
    check();
    // Voices might load asynchronously
    const timer = setTimeout(check, 500);
    return () => clearTimeout(timer);
  }, [language]);

  if (hasNativeVoice) {
    return null;
  }

  const message =
    language === 'sd'
      ? '[صوتي سھولت ناپيد - ٽيڪسٽ موڊ فعال] (Browser lacks Sindhi voice)'
      : language === 'ur'
      ? '[صوتی سہولت موجود نہیں - ٹیکسٹ موڈ فعال] (Browser lacks Urdu voice)'
      : '[Audio Notice: Default system voice active]';

  return (
    <div className="bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between gap-2 shadow-xs">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <VolumeX className="w-4 h-4 text-amber-700 shrink-0" />
        <span className="truncate">{message}</span>
      </div>
      <span className="bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
        VOICE NOTICE
      </span>
    </div>
  );
};
