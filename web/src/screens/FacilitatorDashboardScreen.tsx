import React, { useState } from 'react';
import type { Language, CohortStudent } from '../types';
import {
  Users,
  CheckCircle2,
  WifiOff,
  ShieldCheck,
  MapPin,
  RefreshCw,
  Star,
} from 'lucide-react';

interface Props {
  language: Language;
  onClose: () => void;
}

const VILLAGES = [
  'گوٹھ غلام محمد (Thatta, Sindh)',
  'دستی والا (Larkana, Sindh)',
  'لیاری کمیونٹی سینٹر (Lyari, Karachi)',
  'چک 42 جنوبی (Rahim Yar Khan, Punjab)',
];

const INITIAL_COHORT: CohortStudent[] = [
  {
    id: 's1',
    name: 'زینب بی بی',
    avatar: '👧',
    level: 'Level 0: Non-Reader',
    pathway: 'حروف شناسی (Alif-Bay)',
    progress: 0.85,
    stars: 18,
    lastSync: 'آج 10:15 AM (Bluetooth Mesh)',
  },
  {
    id: 's2',
    name: 'علی رضا',
    avatar: '👦',
    level: 'Level 1: Emergent Reader',
    pathway: 'بنیادی حساب (1-10)',
    progress: 0.65,
    stars: 24,
    lastSync: 'کل 4:30 PM (Direct P2P)',
  },
  {
    id: 's3',
    name: 'محمد عثمان (کسان)',
    avatar: '🧑‍🌾',
    level: 'Level 1: Applied Practical',
    pathway: 'دھان کی کاشت و منافع',
    progress: 0.95,
    stars: 32,
    lastSync: 'آج 11:00 AM (Community Hub)',
  },
  {
    id: 's4',
    name: 'کلثوم اختر',
    avatar: '🧕',
    level: 'Level 2: Household Health',
    pathway: 'او آر ایس اور پینے کا پانی',
    progress: 0.75,
    stars: 28,
    lastSync: '2 دن پہلے (SD Card Hub)',
  },
  {
    id: 's5',
    name: 'عبدالکریم',
    avatar: '👨',
    level: 'Level 1: Livestock Management',
    pathway: 'بھیڑ بکریوں کی ویکسین',
    progress: 0.5,
    stars: 14,
    lastSync: 'آج 9:45 AM (Bluetooth Mesh)',
  },
  {
    id: 's6',
    name: 'فاطمہ گل',
    avatar: '👧',
    level: 'Level 0: Non-Reader',
    pathway: 'صوتیات اور تصویر شناسی',
    progress: 0.4,
    stars: 9,
    lastSync: 'کل 2:15 PM (P2P Hotspot)',
  },
];

export const FacilitatorDashboardScreen: React.FC<Props> = ({ language, onClose }) => {
  const [selectedVillage, setSelectedVillage] = useState(VILLAGES[0]);
  const [cohort, setCohort] = useState<CohortStudent[]>(INITIAL_COHORT);
  const [isSyncing, setIsSyncing] = useState(false);

  const isUrdu = language === 'ur';
  const isSindhi = language === 'sd';

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setCohort(prev =>
        prev.map(s => ({
          ...s,
          lastSync: 'ابھی سنک ہوا (Just synced via Mesh)',
          stars: s.stars + 1,
        }))
      );
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-teal-100 text-teal-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {isSindhi ? 'ڪميونٽي ٽيلي ميٽري' : isUrdu ? 'کمیونٹی ٹیلی میٹری' : 'Community Telemetry'}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {isSindhi ? 'آف لائن ڳوٺاڻو نيٽ ورڪ' : isUrdu ? 'آف لائن دیہی نیٹ ورک' : 'Offline Village Mesh Network'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'سهولتڪار ۽ ڪميونٽي ڊيش بورڊ' : isUrdu ? 'سہولت کار و کمیونٹی ڈیش بورڈ' : 'Facilitator & Community Dashboard'}
          </h2>
          <p className="text-xs text-slate-500">
            {isSindhi
              ? 'شاگردن جي ترقي ۽ آف لائن پيئر ٽو پيئر ڊيٽا مانيٽرنگ'
              : isUrdu
              ? 'طلباء کی پیشرفت اور آف لائن پیئر ٹو پیئر ڈیٹا مانیٹرنگ'
              : 'Cohort Progress & Peer-to-Peer Mesh Telemetry'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateSync}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing
                ? (isSindhi ? 'سنڪ ٿي رهيو آهي...' : isUrdu ? 'سنک ہو رہا ہے...' : 'Syncing...')
                : (isSindhi ? 'آف لائن سنڪ ڪريو' : isUrdu ? 'آف لائن سنک کریں' : 'Sync Offline Mesh')}
            </span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            {isSindhi ? 'واپس' : isUrdu ? 'واپس' : 'Back to Learner'}
          </button>
        </div>
      </div>

      {/* Village Selector Dropdown */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <MapPin className="w-5 h-5 text-teal-700 shrink-0" />
          <span>{isSindhi ? 'ڳوٺ يا مرڪز چونڊيو:' : 'کمیونٹی سنٹر یا دیہہ منتخب کریں:'}</span>
        </div>
        <select
          value={selectedVillage}
          onChange={e => setSelectedVillage(e.target.value)}
          className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          {VILLAGES.map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">{isSindhi ? 'ڪل سکندڙ' : 'فعال طالب علم'}</span>
            <Users className="w-4 h-4 text-teal-700" />
          </div>
          <span className="text-3xl font-black text-slate-900">48</span>
          <span className="text-[11px] text-slate-500 mt-1">12 خاندانی ٹیبلٹس</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">{isSindhi ? 'مڪمل اسباق' : 'مکمل اسباق'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-3xl font-black text-emerald-700">194</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1">87% تسلسل کی شرح</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">{isSindhi ? 'آف لائن سنک' : 'آف لائن ڈیوائسز'}</span>
            <WifiOff className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-3xl font-black text-amber-700">14</span>
          <span className="text-[11px] text-amber-800 font-semibold mt-1">Bluetooth / WiFi Mesh</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">{isSindhi ? 'حفاظتي الرٽس' : 'ہنگامی الرٹس'}</span>
            <ShieldCheck className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-3xl font-black text-teal-800">0</span>
          <span className="text-[11px] text-teal-700 font-semibold mt-1">کمیونٹی محفوظ ہے</span>
        </div>
      </div>

      {/* Cohort Learner Roster Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <h3
            className={`font-bold text-slate-900 text-base ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'ڳوٺ جي سکندڙن جي فهرست (Cohort Roster):' : 'گروپ کے طلبہ و کسان (Cohort Roster):'}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Showing {cohort.length} learners
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {cohort.map(student => (
            <div
              key={student.id}
              className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                  {student.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">
                    {student.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-teal-800">
                      {student.level}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{student.pathway}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    آخری سنک: {student.lastSync}
                  </span>
                </div>
              </div>

              {/* Progress & Stars */}
              <div className="flex items-center gap-4 sm:w-64">
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500">پیش رفت</span>
                    <span className="text-teal-800">{Math.round(student.progress * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${student.progress * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{student.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
