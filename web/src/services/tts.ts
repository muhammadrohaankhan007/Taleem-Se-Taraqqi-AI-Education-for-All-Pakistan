import type { Language } from '../types';

/**
 * How well the current device can speak a language:
 *  - native:  a voice whose language matches (e.g. ur-PK) exists
 *  - fallback: no native voice, but a related-script voice (Urdu/Arabic) exists and is used
 *  - none:    nothing usable; speech is skipped and the UI shows a text-mode notice
 */
export type VoiceStatus = 'native' | 'fallback' | 'none';

type Listener = () => void;

/** Ordered list of BCP-47 language prefixes we are willing to use per UI language. */
const VOICE_PREFERENCE: Record<Language, { native: string[]; fallback: string[] }> = {
  en: { native: ['en'], fallback: [] },
  ur: { native: ['ur'], fallback: ['ar'] },
  // Sindhi has almost no browser voices; Urdu then Arabic share its script.
  sd: { native: ['sd'], fallback: ['ur', 'ar'] },
};

const UTTERANCE_LANG: Record<Language, string> = { en: 'en-US', ur: 'ur-PK', sd: 'sd-PK' };

class TtsService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private listeners = new Set<Listener>();

  constructor() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadVoices();
        // Chrome loads voices asynchronously; refresh and tell listeners.
        this.synth.addEventListener?.('voiceschanged', () => {
          this.loadVoices();
          this.listeners.forEach((fn) => fn()); // voice list changed: subscribers re-check
        });
      }
    } catch {
      this.synth = null;
    }
  }

  private loadVoices() {
    try {
      this.voices = this.synth?.getVoices() ?? [];
    } catch {
      this.voices = [];
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) this.loadVoices();
    return this.voices;
  }

  private findVoice(prefixes: string[]): SpeechSynthesisVoice | undefined {
    const list = this.getVoices();
    for (const prefix of prefixes) {
      const match = list.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
      if (match) return match;
    }
    return undefined;
  }

  /** Describe how speech will behave for a language on this device (no side effects). */
  public getVoiceStatus(lang: Language): VoiceStatus {
    if (!this.synth) return 'none';
    const pref = VOICE_PREFERENCE[lang];
    if (this.findVoice(pref.native)) return 'native';
    if (this.findVoice(pref.fallback)) return 'fallback';
    // English can always use the browser default voice if any voice exists at all.
    if (lang === 'en' && this.getVoices().length > 0) return 'native';
    return 'none';
  }

  public hasVoiceFor(lang: Language): boolean {
    return this.getVoiceStatus(lang) === 'native';
  }

  /** Subscribe to voice-list changes. Returns an unsubscribe function. */
  public subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  /**
   * Speak text. Never throws and never blocks the click that called it.
   * Returns the voice status that was used so callers can show a notice if they wish.
   */
  public speak(text: string, lang: Language, onEnd?: () => void): VoiceStatus {
    const status = this.getVoiceStatus(lang);

    if (!this.synth || status === 'none' || !text) {
      onEnd?.();
      return status === 'none' || !this.synth ? 'none' : status;
    }

    try {
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // slightly slower for low-literacy learners
      utterance.pitch = 1.0;
      utterance.lang = UTTERANCE_LANG[lang];

      const pref = VOICE_PREFERENCE[lang];
      const voice = this.findVoice(pref.native) ?? this.findVoice(pref.fallback);
      if (voice) {
        utterance.voice = voice;
        if (status === 'fallback') utterance.lang = voice.lang; // match the substitute voice
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      } else {
        utterance.onerror = () => undefined; // swallow 'interrupted'/'canceled' errors quietly
      }

      this.synth.speak(utterance);
      return status;
    } catch {
      onEnd?.();
      return 'none';
    }
  }

  public stop() {
    try {
      this.synth?.cancel();
    } catch {
      // ignore
    }
  }
}

export const tts = new TtsService();
