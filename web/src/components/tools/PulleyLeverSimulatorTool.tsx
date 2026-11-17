import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scale } from 'lucide-react';

export const PulleyLeverSimulatorTool: React.FC = () => {
  const { lang, isUrdu, isSindhi } = useLanguage();
  const [loadKg, setLoadKg] = useState<number>(20);
  const [pulleyCount, setPulleyCount] = useState<number>(2); // 1, 2, 4
  const [leverFulcrum, setLeverFulcrum] = useState<number>(50); // % from effort end

  const pulleyEffortKg = (loadKg / pulleyCount).toFixed(1);
  const pulleyEffortNewtons = Math.round(Number(pulleyEffortKg) * 9.8);
  const leverMA = Math.max(0.2, (100 - leverFulcrum) / Math.max(10, leverFulcrum));
  const leverEffortKg = (loadKg / leverMA).toFixed(1);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-600" />
          <h4 className="text-sm font-black text-slate-900">
            {isSindhi ? 'چرخي ۽ ليور سسٽم (فزڪس ليب)' : isUrdu ? 'چرخی اور لیور لیب (طبیعیاتی حساب)' : 'Pulley & Lever Mechanical Lab'}
          </h4>
        </div>
        <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
          {isSindhi ? 'حقيقي فارمولا' : isUrdu ? 'حقیقی سائنسی مساوات' : 'Real Physics Formula'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pulley simulation */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              {isSindhi ? 'کوھ جو ڊول (وزن):' : isUrdu ? 'کنویں کا ڈول (وزن):' : 'Bucket Weight:'}
            </span>
            <span className="text-sm font-black text-slate-900">{loadKg} kg</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={loadKg}
            onChange={(e) => setLoadKg(Number(e.target.value))}
            className="w-full accent-amber-600"
          />

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 block mb-1.5">
              {isSindhi ? 'چرخين جو تعداد:' : isUrdu ? 'چرخیوں کی تعداد:' : 'Number of Pulleys:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 4].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setPulleyCount(cnt)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    pulleyCount === cnt
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cnt} {cnt === 1 ? 'Pulley' : 'Pulleys'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mt-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-amber-800 block">
                {isSindhi ? 'گهربل زور:' : isUrdu ? 'درکار کھینچنے کی طاقت:' : 'Required Pulling Force:'}
              </span>
              <span className="text-lg font-black text-amber-950">
                {pulleyEffortKg} kg ({pulleyEffortNewtons} N)
              </span>
            </div>
            <div className="text-end">
              <span className="text-[10px] text-amber-700 block font-medium">Mechanical Advantage</span>
              <span className="text-sm font-black text-amber-900">MA = {pulleyCount}</span>
            </div>
          </div>
        </div>

        {/* Lever simulation */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              {isSindhi ? 'ليور هينڊل جي ڊيگهه:' : isUrdu ? 'لیور کے ہینڈل کی پوزیشن:' : 'Lever Fulcrum Position:'}
            </span>
            <span className="text-sm font-black text-slate-900">{leverFulcrum}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={80}
            step={5}
            value={leverFulcrum}
            onChange={(e) => setLeverFulcrum(Number(e.target.value))}
            className="w-full accent-amber-600"
          />

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>{isSindhi ? 'مڪينيڪل فائدو:' : isUrdu ? 'مکینیکل فائدہ (MA):' : 'Mechanical Advantage:'}</span>
              <span className="font-black text-slate-900">{leverMA.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between">
              <span>{isSindhi ? 'ضروري زور:' : isUrdu ? 'اٹھانے کے لیے درکار طاقت:' : 'Effort to Lift:'}</span>
              <span className="font-black text-emerald-700">{leverEffortKg} kg</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic leading-relaxed pt-1">
            {lang === 'sd'
              ? 'قانون: جيترو هينڊل ڊگهو هوندو، اوترو مکينيڪل فائدو وڌندو ۽ گهٽ زور لڳندو.'
              : lang === 'ur'
              ? 'قانون: جتنا لمبا ہینڈل ہو گا مکینیکل ایڈوانٹیج بڑھے گا اور بھاری پتھر آسانی سے اٹھے گا۔'
              : 'Principle: Longer effort arm increases mechanical advantage, drastically reducing physical exertion.'}
          </p>
        </div>
      </div>
    </div>
  );
};
