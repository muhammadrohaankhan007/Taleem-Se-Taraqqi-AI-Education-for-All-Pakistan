import React, { useCallback, useSyncExternalStore } from 'react';
import { VolumeX, Volume1 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { tts } from '../services/tts';

/**
 * Banner shown only when the device has no native voice for the active language.
 * It is fully localised and tracks the browser's (asynchronously loaded) voice list.
 */
export const SpeechNoticeBadge: React.FC = () => {
  const { lang, t } = useLanguage();

  const getSnapshot = useCallback(() => tts.getVoiceStatus(lang), [lang]);
  const status = useSyncExternalStore(tts.subscribe.bind(tts), getSnapshot, () => 'native' as const);

  if (status === 'native') return null;

  const isNone = status === 'none';
  const Icon = isNone ? VolumeX : Volume1;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 pt-3">
      <div
        role="status"
        className="bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between gap-2 shadow-xs"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{isNone ? t('voiceUnavailable') : t('voiceApproximate')}</span>
        </div>
        <span className="bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
          {t('voiceNoticeLabel')}
        </span>
      </div>
    </div>
  );
};

export default SpeechNoticeBadge;
