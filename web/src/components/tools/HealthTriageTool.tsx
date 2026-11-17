import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { evaluateSafetyRules } from '../../services/safetyEngine';
import { ShieldAlert, AlertTriangle, CheckCircle, PhoneCall } from 'lucide-react';

export const HealthTriageTool: React.FC = () => {
  const { lang, isUrdu, isSindhi } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState<string>('snakebite');

  const scenarios = [
    {
      id: 'snakebite',
      title: { en: 'Snakebite in Rice Field', ur: 'دھان کے کھیت میں سانپ کاٹنا', sd: 'سارين ۾ نانگ جو چڪ' },
      query: 'سانپ نے پاؤں پر کاٹ لیا ہے، شدید درد اور خون',
    },
    {
      id: 'dosage',
      title: { en: 'Asking Child Antibiotic Dose', ur: 'بچے کو اینٹی بائیوٹک کی خوراک', sd: 'ٻار کي تيز دوا ڏيڻ بابت پڇڻ' },
      query: 'بچے کو کھانسی کی کتنی گولی دینی چاہیے؟',
    },
    {
      id: 'ors',
      title: { en: 'Infant Diarrhea & Dehydration', ur: 'بچے میں شدید اسہال اور الٹیاں', sd: 'ٻار کي دست ۽ الٽيون' },
      query: 'بچے کو الٹیاں اور دست ہیں، نمکول کیسے دیں',
    },
  ];

  const currentScen = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];
  const triageResult = evaluateSafetyRules(currentScen.query);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-700" />
          <h4 className="text-sm font-black text-slate-900">
            {isSindhi ? 'هنگامي طبي رهنمائي ۽ اسپتال ريفرل' : isUrdu ? 'ہنگامی طبی رہنمائی و اسپتال ریفرل' : 'Emergency Triage & Clinic Referral Filter'}
          </h4>
        </div>
        <span className="text-[10px] bg-rose-100 text-rose-900 font-bold px-2.5 py-0.5 rounded-full border border-rose-200">
          Rule-Based Triage
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {scenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => setSelectedScenario(scen.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedScenario === scen.id
                ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {scen.title[lang]}
          </button>
        ))}
      </div>

      <div
        className={`p-4 rounded-xl border ${
          triageResult.type === 'emergency'
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : triageResult.type === 'refusal'
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}
      >
        <div className="flex items-start gap-3">
          {triageResult.type === 'emergency' ? (
            <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          ) : triageResult.type === 'refusal' ? (
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          )}

          <div className="space-y-1.5">
            <h5 className="text-xs font-black">
              {lang === 'sd'
                ? triageResult.titleSd
                : lang === 'ur'
                ? triageResult.titleUr
                : triageResult.titleEn}
            </h5>
            <p className="text-xs leading-relaxed opacity-90">
              {lang === 'sd'
                ? triageResult.instructionsSd
                : lang === 'ur'
                ? triageResult.instructionsUr
                : triageResult.instructionsEn}
            </p>

            {triageResult.referralTarget && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-lg text-xs font-bold border border-current/20 mt-2">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>
                  {isSindhi ? 'رابطو ڪريو:' : isUrdu ? 'فوری رابطہ:' : 'Emergency Contact:'}{' '}
                  {triageResult.referralTarget}
                </span>
                <span className="text-[10px] opacity-75 font-normal">[DEMO CALL]</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
