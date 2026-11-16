import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LimitsModal: React.FC<Props> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const isUrdu = language === 'ur';
  const isSindhi = language === 'sd';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="text-lg font-bold">
                {isSindhi
                  ? 'ڇا حقيقي آهي ۽ ڇا ڊيمو (Real vs. Simulated)'
                  : isUrdu
                  ? 'کیا حقیقی ہے اور کیا نقلی (Real vs. Simulated)'
                  : "What's Real vs. What's Simulated"}
              </h2>
              <p className="text-xs text-emerald-200">
                Taleem Se Taraqqi Prototype Integrity Matrix
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-emerald-700/60 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Real Section */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h3 className="text-emerald-900 font-bold text-base flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              {isSindhi ? 'حقيقي ٽيڪنيڪل فيچرز (Real)' : isUrdu ? 'حقیقی تکنیکی خصوصیات (Real)' : 'Real Implemented Capabilities'}
            </h3>
            <ul className="space-y-2 text-emerald-950 text-xs md:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Typography & RTL:</strong> Google Noto Nastaliq Urdu & Noto Naskh Arabic fonts render genuine RTL scripts without OS Arial fallbacks or glyph clipping.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Local Storage & Family Profiles:</strong> Multi-learner accounts (up to 6 members), 4-symbol picture PINs, star awards, and progress persist locally in browser storage.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Touch Tracing Pad:</strong> Smooth 60fps HTML5 Canvas motor skill tracing for Urdu and Sindhi letterforms.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Deterministic Safety Engine:</strong> Ported client-side rule engine intercepts chest pain, snakebites, downer animals, and strictly blocks medical prescription dosages.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>
                  <strong>Farm Profit Calculator:</strong> Live mathematical calculation of acreage, maunds, seed/water/labor costs, and seasonal net profit.
                </span>
              </li>
            </ul>
          </div>

          {/* Simulated Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <h3 className="text-amber-900 font-bold text-base flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              {isSindhi ? 'نقلي ۽ ڊيمو فيچرز (Simulated)' : isUrdu ? 'نقلی و علامتی خصوصیات (Simulated)' : 'Simulated / Mocked Capabilities'}
            </h3>
            <ul className="space-y-2 text-amber-950 text-xs md:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  <strong>Voice Audio:</strong> Currently uses Web Speech API browser synthesis labeled <code>[TEMP AUDIO]</code>. Production requires studio recordings by native dialect voice actors.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  <strong>Interactive Calculators & Science Tools:</strong> All STEM, P&L farming, solar PV, and hydraulics algorithms run real mathematical models locally in your browser.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  <strong>Emergency Calls:</strong> Rescue 1122 and clinic call buttons show a simulated notification <code>[DEMO CALL]</code> instead of cellular dialing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>
                  <strong>Facilitator Dashboard:</strong> Cohort of 48 learners and BLE mesh sync telemetry are pre-seeded sample data labeled <code>[DEMO DASHBOARD]</code>.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm transition-colors"
          >
            {isSindhi ? 'سمجھي ويس (Close)' : isUrdu ? 'سمجھ گیا (Close)' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
