import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

const PKR_NOTES = [10, 20, 50, 100, 500, 1000];

export const CashRegisterTool: React.FC = () => {
  const { isUrdu, isSindhi } = useLanguage();
  const [billAmount, setBillAmount] = useState<number>(380);
  const [tenderedNotes, setTenderedNotes] = useState<number[]>([]);

  const totalTendered = tenderedNotes.reduce((a, b) => a + b, 0);
  const changeDue = Math.max(0, totalTendered - billAmount);
  const isShort = totalTendered < billAmount && totalTendered > 0;
  const isPaid = totalTendered >= billAmount;

  const handleAddNote = (val: number) => {
    setTenderedNotes((prev) => [...prev, val]);
  };

  const handleReset = () => {
    setTenderedNotes([]);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h4 className="text-sm font-black text-slate-900">
          {isSindhi ? 'بازار جو ڪيش رجسٽر (پاڪستاني ڪرنسي نوٽ)' : isUrdu ? 'بازار کا کیش رجسٹر (پاکستانی کرنسی نوٹ)' : 'Pakistani Bazaar Cash Register'}
        </h4>
        <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
          {isSindhi ? 'رڳو علامتي سکيا' : isUrdu ? 'صرف علامتی' : 'Illustrative only'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bill setting */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-600 block">
            {isSindhi ? 'خريداري جو بل:' : isUrdu ? 'سودے کا بل:' : 'Grocery Bill:'}
          </span>
          <div className="text-2xl font-black text-slate-900">Rs {billAmount}</div>
          <div className="flex gap-2 pt-1">
            {[180, 380, 650, 850].map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setBillAmount(amt);
                  setTenderedNotes([]);
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                  billAmount === amt
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Rs {amt}
              </button>
            ))}
          </div>
        </div>

        {/* Currency notes to click */}
        <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-600 block">
            {isSindhi ? 'نوٽ شامل ڪريو:' : isUrdu ? 'دکاندار کو نوٹ دیں:' : 'Tender Banknotes:'}
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PKR_NOTES.map((val) => (
              <button
                key={val}
                onClick={() => handleAddNote(val)}
                className="p-2 rounded-xl border-2 border-emerald-600/30 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-600 text-emerald-950 font-black text-xs transition-all active:scale-95 shadow-2xs"
              >
                + Rs {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result calculation strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-semibold">
            {isSindhi ? 'ڏنل ڪل پئسا:' : isUrdu ? 'دی گئی کل رقم:' : 'Total Cash Tendered:'}{' '}
            <span className="font-black text-slate-900 text-sm">Rs {totalTendered}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {isPaid ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSindhi
                    ? `بقايا رقم: Rs ${changeDue}`
                    : isUrdu
                    ? `بقایا رقم: Rs ${changeDue}`
                    : `Change Due: Rs ${changeDue}`}
                </span>
              </span>
            ) : isShort ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700">
                <AlertCircle className="w-4 h-4" />
                <span>
                  {isSindhi
                    ? `پئسا گهٽ آهن: Rs ${billAmount - totalTendered} وڌيڪ ڏيو`
                    : isUrdu
                    ? `رقم کم ہے: Rs ${billAmount - totalTendered} مزید درکار`
                    : `Short: Rs ${billAmount - totalTendered} more needed`}
                </span>
              </span>
            ) : (
              <span className="text-xs text-slate-400">
                {isSindhi ? 'نوٽن تي ڪلڪ ڪري رقم پوري ڪريو' : isUrdu ? 'نوٹوں پر کلک کر کے رقم ادا کریں' : 'Click notes to pay bill'}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isSindhi ? 'صاف ڪريو' : isUrdu ? 'دوبارہ گنیں' : 'Reset'}</span>
        </button>
      </div>
    </div>
  );
};
