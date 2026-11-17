import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Calculator } from 'lucide-react';

export const FarmProfitCalculatorTool: React.FC = () => {
  const { isUrdu, isSindhi } = useLanguage();
  const [cropType, setCropType] = useState<'rice' | 'wheat'>('wheat');
  const [acres, setAcres] = useState<number>(5);
  const [yieldPerAcre, setYieldPerAcre] = useState<number>(45); // maunds
  const [pricePerMaund, setPricePerMaund] = useState<number>(3900); // PKR
  const [costPerAcre, setCostPerAcre] = useState<number>(92000); // PKR seed, fertilizer, diesel, labor

  const totalYieldMaunds = acres * yieldPerAcre;
  const grossRevenue = totalYieldMaunds * pricePerMaund;
  const totalCost = acres * costPerAcre;
  const netProfit = grossRevenue - totalCost;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-lime-700" />
          <h4 className="text-sm font-black text-slate-900">
            {isSindhi ? 'ٻنيءَ جي منافع ۽ نقصان جو حساب ڪتاب' : isUrdu ? 'فارم منافع و نقصان لائیو کیلکولیٹر' : 'Interactive Farm Profit & Loss Calculator'}
          </h4>
        </div>
        <span className="text-[10px] bg-lime-100 text-lime-900 font-bold px-2 py-0.5 rounded-full border border-lime-200">
          {isSindhi ? 'رڳو علامتي سکيا' : isUrdu ? 'صرف علامتی' : 'Illustrative only'}
        </span>
      </div>

      {/* Crop selector */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setCropType('wheat');
            setYieldPerAcre(45);
            setPricePerMaund(3900);
            setCostPerAcre(92000);
          }}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            cropType === 'wheat'
              ? 'bg-lime-700 text-white border-lime-800'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {isSindhi ? 'ڪڻڪ (Wheat)' : isUrdu ? 'ربیع گندم (Wheat)' : 'Rabi Wheat'}
        </button>
        <button
          onClick={() => {
            setCropType('rice');
            setYieldPerAcre(55);
            setPricePerMaund(2500);
            setCostPerAcre(85000);
          }}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            cropType === 'rice'
              ? 'bg-lime-700 text-white border-lime-800'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {isSindhi ? 'چانور (Rice Irri-6)' : isUrdu ? 'خریف دھان (Rice Irri-6)' : 'Kharif Rice (Irri-6)'}
        </button>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">
            {isSindhi ? 'ايڪڙ:' : isUrdu ? 'رقبہ (ایکڑ):' : 'Acreage:'}
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={acres}
            onChange={(e) => setAcres(Math.max(1, Number(e.target.value)))}
            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">
            {isSindhi ? 'اپت (مڻ/ايڪڙ):' : isUrdu ? 'پیداوار (من/ایکڑ):' : 'Yield (Maunds/Acre):'}
          </label>
          <input
            type="number"
            value={yieldPerAcre}
            onChange={(e) => setYieldPerAcre(Number(e.target.value))}
            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">
            {isSindhi ? 'اگھ (رپيا/مڻ):' : isUrdu ? 'نرخ (روپے/من):' : 'Rate (PKR/Maund):'}
          </label>
          <input
            type="number"
            value={pricePerMaund}
            onChange={(e) => setPricePerMaund(Number(e.target.value))}
            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">
            {isSindhi ? 'خرچ (رپيا/ايڪڙ):' : isUrdu ? 'لاگت (روپے/ایکڑ):' : 'Cost (PKR/Acre):'}
          </label>
          <input
            type="number"
            value={costPerAcre}
            onChange={(e) => setCostPerAcre(Number(e.target.value))}
            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* Summary report */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isSindhi ? 'ڪل آمدني:' : isUrdu ? 'کل آمدنی:' : 'Gross Revenue:'}
          </span>
          <span className="text-base font-black text-slate-900">
            Rs {grossRevenue.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 block">
            ({totalYieldMaunds} {isSindhi ? 'مڻ' : isUrdu ? 'من' : 'maunds'})
          </span>
        </div>

        <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 block">
            {isSindhi ? 'ڪل لاڳت:' : isUrdu ? 'کل اخراجات:' : 'Total Cost:'}
          </span>
          <span className="text-base font-black text-rose-700">
            Rs {totalCost.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 block">
            (Rs {costPerAcre.toLocaleString()}/acre)
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${
            netProfit >= 0
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <span className="text-[10px] font-semibold block">
            {isSindhi ? 'پڪو منافعو:' : isUrdu ? 'خالص منافع:' : 'Net Profit:'}
          </span>
          <span className="text-lg font-black block">
            Rs {netProfit.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold block">
            (Rs {Math.round(netProfit / acres).toLocaleString()}/acre)
          </span>
        </div>
      </div>
    </div>
  );
};
