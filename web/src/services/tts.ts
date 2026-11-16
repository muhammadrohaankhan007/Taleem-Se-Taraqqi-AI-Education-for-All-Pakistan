import type { Language } from '../types';

class TtsService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.isLoaded = true;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (!this.isLoaded || this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  public hasVoiceFor(lang: Language): boolean {
    const list = this.getVoices();
    if (list.length === 0) return false;

    if (lang === 'ur') {
      return list.some(v => v.lang.startsWith('ur'));
    }
    if (lang === 'sd') {
      return list.some(v => v.lang.startsWith('sd'));
    }
    return list.some(v => v.lang.startsWith('en'));
  }

  public speak(text: string, lang: Language, onEnd?: () => void) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any currently playing audio

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for low-literacy learners
      utterance.pitch = 1.0;

      const voices = this.getVoices();
      let targetLang = 'en-US';
      if (lang === 'ur') targetLang = 'ur-PK';
      if (lang === 'sd') targetLang = 'sd-PK';

      utterance.lang = targetLang;

      // Try matching voice
      const matched = voices.find(v => v.lang.toLowerCase().startsWith(lang));
      if (matched) {
        utterance.voice = matched;
      } else if (lang === 'ur') {
        // Fallback to Hindi or Arabic voice if Urdu voice is missing
        const fallback = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('ar'));
        if (fallback) utterance.voice = fallback;
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const tts = new TtsService();
