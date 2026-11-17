import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export const WaterPurifierTool: React.FC = () => {
  const { lang, isUrdu, isSindhi } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<'boil' | 'sodis' | 'chlorine'>('boil');

  const methods = {
    boil: {
      name: { en: 'Rolling Boil (100°C)', ur: 'تیز ابالنا (100°C)', sd: 'تيز ٽهڪائڻ (100°C)' },
      time: { en: '5 to 10 minutes rolling boil', ur: '۵ سے ۱۰ منٹ مسلسل ابال', sd: '۵ کان ۱۰ منٽ تيز ٽهڪ' },
      effectiveness: '99.9%',
      details: {
        en: 'Heat rapidly destroys all cholera, typhoid, and diarrhea bacteria by destroying their protein envelopes.',
        ur: 'شدید گرمی بیکٹیریا اور وائرس کے پروٹین کو تباہ کر کے انہیں فوری ہلاک کر دیتی ہے۔',
        sd: 'تيز گرمي بيماري پيدا ڪندڙ جراثيمن کي مڪمل ماري ڇڏي ٿي.',
      },
    },
    sodis: {
      name: { en: 'Solar Disinfection (SODIS)', ur: 'شمسی جراثیم کشی (سوڈس)', sd: 'سج جي روشنيءَ سان صفائي (سوڊس)' },
      time: { en: '6 hours in full sunlight', ur: '۶ گھنٹے مکمل تیز دھوپ میں', sd: '۶ ڪلاڪ سِج جي تيز اس ۾' },
      effectiveness: '99.5%',
      details: {
        en: 'Clear PET bottles placed on corrugated tin roof allow solar UV-A rays and heat to penetrate and kill pathogens.',
        ur: 'شفاف پلاسٹک کی بوتل چھت پر رکھنے سے سورج کی الٹرا وائلٹ شعاعیں اور تپش بیکٹیریا ختم کر دیتی ہے۔',
        sd: 'شفاف بوتلون ڇت تي رکڻ سان سج جون تيز شعاعون جراثيمن کي ختم ڪن ٿيون.',
      },
    },
    chlorine: {
      name: { en: 'Chlorine Drops / Liquid Bleach', ur: 'کلورین کے قطرے / بلیچ', sd: 'ڪلورين جا ڦڙا / بليچ' },
      time: { en: '30 minutes waiting time', ur: '۳۰ منٹ انتظار لازمی', sd: '۳۰ منٽ ترسي پوءِ پيئجي' },
      effectiveness: '99.8%',
      details: {
        en: 'Add 2 to 3 drops of household bleach (5%) per liter. Wait 30 minutes for chemical oxidation before drinking.',
        ur: 'ایک لیٹر میں ۲ سے ۳ قطرے ڈال کر ۳۰ منٹ چھوڑ دیں۔ کلورین خلیاتی جھلی کو توڑ دیتی ہے۔',
        sd: 'هڪ ليٽر پاڻيءَ ۾ ۲ کان ۳ ڦڙا وجهي ۳۰ منٽ انتظار ڪريو.',
      },
    },
  };

  const curr = methods[selectedMethod];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h4 className="text-sm font-black text-slate-900">
          {isSindhi ? 'پاڻي صاف ڪرڻ جي ڪيميا ۽ طريقا' : isUrdu ? 'پانی صاف کرنے کی کیمسٹری اور طریقے' : 'Water Purification Chemistry & Protocols'}
        </h4>
        <span className="text-[10px] bg-indigo-100 text-indigo-900 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
          WHO Protocol
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setSelectedMethod('boil')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
            selectedMethod === 'boil'
              ? 'bg-indigo-700 text-white border-indigo-800 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span className="text-xs font-bold text-center">{methods.boil.name[lang]}</span>
        </button>

        <button
          onClick={() => setSelectedMethod('sodis')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
            selectedMethod === 'sodis'
              ? 'bg-indigo-700 text-white border-indigo-800 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sun className="w-5 h-5" />
          <span className="text-xs font-bold text-center">{methods.sodis.name[lang]}</span>
        </button>

        <button
          onClick={() => setSelectedMethod('chlorine')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
            selectedMethod === 'chlorine'
              ? 'bg-indigo-700 text-white border-indigo-800 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold text-center">{methods.chlorine.name[lang]}</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-900">{curr.name[lang]}</span>
          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {curr.effectiveness} Pathogen Kill
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{curr.details[lang]}</p>
        <div className="text-[11px] font-bold text-slate-500 pt-1">
          {isSindhi ? 'ضروري وقت:' : isUrdu ? 'لازمی وقت:' : 'Required Duration:'}{' '}
          <span className="text-slate-900">{curr.time[lang]}</span>
        </div>
      </div>
    </div>
  );
};
