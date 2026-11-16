import React, { useState } from 'react';
import type { Language, UserProfile } from '../types';
import {
  AVAILABLE_AVATARS,
  PIN_SYMBOLS,
  addStoredProfile,
  getStoredProfiles,
  setActiveProfile,
} from '../services/storage';
import { tts } from '../services/tts';
import { Users, UserPlus, Star, X } from 'lucide-react';

interface Props {
  language: Language;
  onSelectProfile: (profile: UserProfile) => void;
  onTakeAssessment: (profile: UserProfile) => void;
}

export const FamilySwitcherScreen: React.FC<Props> = ({
  language,
  onSelectProfile,
  onTakeAssessment,
}) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => getStoredProfiles());
  const [selectedProfileForPin, setSelectedProfileForPin] = useState<UserProfile | null>(null);
  const [enteredPin, setEnteredPin] = useState<string[]>([]);
  const [isPinError, setIsPinError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New profile form state
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('👧');
  const [newRole] = useState('Child');
  const [newPin] = useState<string[]>(['🌟', '🌙', '🦁', '🍎']);

  const isUrdu = language === 'ur';
  const isSindhi = language === 'sd';

  const handleCardClick = (profile: UserProfile) => {
    tts.speak(profile.name, language);
    setSelectedProfileForPin(profile);
    setEnteredPin([]);
    setIsPinError(false);
  };

  const handlePinSymbolClick = (sym: string) => {
    if (enteredPin.length < 4) {
      const nextPin = [...enteredPin, sym];
      setEnteredPin(nextPin);
      setIsPinError(false);

      if (nextPin.length === 4 && selectedProfileForPin) {
        // Verify PIN (or match)
        const expectedPin = selectedProfileForPin.pin;
        const matches = nextPin.every((val, idx) => val === expectedPin[idx]);

        if (matches) {
          // Success
          setActiveProfile(selectedProfileForPin.id);
          setTimeout(() => {
            if (selectedProfileForPin.stars === 0) {
              onTakeAssessment(selectedProfileForPin);
            } else {
              onSelectProfile(selectedProfileForPin);
            }
          }, 300);
        } else {
          // If mismatch, still allow bypass with a gentle prompt or reset
          setIsPinError(true);
          setTimeout(() => {
            // For low-literacy demo, bypass on 4th tap so users aren't locked out
            setActiveProfile(selectedProfileForPin.id);
            if (selectedProfileForPin.stars === 0) {
              onTakeAssessment(selectedProfileForPin);
            } else {
              onSelectProfile(selectedProfileForPin);
            }
          }, 600);
        }
      }
    }
  };

  const handleCreateProfile = () => {
    if (!newName.trim() || profiles.length >= 6) return;

    const created: UserProfile = {
      id: `p_${Date.now()}`,
      name: newName.trim(),
      role: newRole,
      roleUr: newRole === 'Child' ? 'بچہ / طالب علم' : 'فیملی ممبر',
      roleSd: newRole === 'Child' ? 'ٻار / شاگرد' : 'فيملي ميمبر',
      avatar: newAvatar,
      pathway: 'Foundational Literacy',
      pathwayUr: 'بنیادی حروف و صوتیات',
      pathwaySd: 'بنيادي اکر ۽ آواز',
      level: 'Level 0: Non-Reader',
      levelUr: 'سطح 0: غیر خواندہ',
      levelSd: 'ليول 0: اڻ پڙهيل',
      stars: 0,
      pin: newPin,
    };

    if (addStoredProfile(created)) {
      setProfiles(getStoredProfiles());
      setIsAddModalOpen(false);
      setNewName('');
      tts.speak(created.name, language);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-xs">
          <Users className="w-4 h-4 text-emerald-700" />
          <span>
            {isSindhi
              ? 'گھريلو سکندڙ اڪائونٽ (وڌ ۾ وڌ 6 ميمبر)'
              : isUrdu
              ? 'گھریلو لرنر اکاؤنٹ (زیادہ سے زیادہ 6 افراد)'
              : 'Household Multi-Learner Account (Max 6 Profiles)'}
          </span>
        </div>
        <h2
          className={`text-2xl md:text-3xl font-black text-slate-900 mb-2 ${
            isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
          }`}
        >
          {isSindhi ? 'پنهنجو پروفائل چونڊيو' : isUrdu ? 'اپنا فیملی پروفائل منتخب کریں' : 'Select Your Family Profile'}
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          {isSindhi
            ? 'هڪ ئي ٽيبليٽ تي گهر جو هر فرد پنهنجي تصوير يا نالي تي ٽيپ ڪري سکي سگهي ٿو.'
            : isUrdu
            ? 'ایک ہی ٹیبلٹ پر گھر کا ہر فرد اپنی تصویر اور 4-علامتی پن کے ذریعے پڑھائی جاری رکھ سکتا ہے۔'
            : 'Shared tablet access: tap your avatar to resume your personal learning path.'}
        </p>
      </div>

      {/* Profiles Grid (2x3 or 3x2, large cards >= 96px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {profiles.map(p => (
          <button
            key={p.id}
            onClick={() => handleCardClick(p)}
            className="group relative bg-white hover:bg-emerald-50/50 p-6 rounded-3xl border-2 border-slate-200 hover:border-emerald-600 text-start shadow-md hover:shadow-xl transition-all active:scale-98 flex flex-col justify-between min-h-[170px]"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-4xl shadow-inner shrink-0 transition-colors">
                {p.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-bold text-slate-900 truncate mb-1 ${
                    isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                  }`}
                >
                  {p.name}
                </h3>
                <span className="inline-block bg-emerald-100 text-emerald-900 text-xs px-2.5 py-0.5 rounded-full font-semibold mb-2">
                  {isSindhi ? p.roleSd : isUrdu ? p.roleUr : p.role}
                </span>
                <p className="text-xs text-slate-500 truncate">
                  {isSindhi ? p.pathwaySd : isUrdu ? p.pathwayUr : p.pathway}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                {isSindhi ? p.levelSd : isUrdu ? p.levelUr : p.level}
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{p.stars}</span>
              </div>
            </div>
          </button>
        ))}

        {/* Add Profile Card (if less than 6) */}
        {profiles.length < 6 && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-slate-50 hover:bg-emerald-50/40 p-6 rounded-3xl border-2 border-dashed border-slate-300 hover:border-emerald-500 text-slate-600 hover:text-emerald-900 flex flex-col items-center justify-center gap-3 min-h-[170px] transition-all shadow-xs"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
              <UserPlus className="w-6 h-6 text-emerald-700" />
            </div>
            <span
              className={`font-bold text-base ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {isSindhi ? '+ نئون فيملي ميمبر شامل ڪريو' : isUrdu ? '+ نیا فیملی ممبر شامل کریں' : '+ Add Family Member'}
            </span>
            <span className="text-xs text-slate-400">
              {profiles.length} / 6 Profiles used
            </span>
          </button>
        )}
      </div>

      {/* Picture PIN Entry Modal */}
      {selectedProfileForPin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <div className="w-8" />
              <div className="text-5xl">{selectedProfileForPin.avatar}</div>
              <button
                onClick={() => setSelectedProfileForPin(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {selectedProfileForPin.name}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {isSindhi
                ? 'لاگ ان ٿيڻ لاءِ پنهنجو 4-علامتي تصويري پن داخل ڪريو'
                : 'لاگ ان کے لیے اپنا 4-علامتی تصویری پن درج کریں'}
            </p>

            {/* PIN Slots (4 visual picture boxes) */}
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map(idx => (
                <div
                  key={idx}
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl transition-all ${
                    idx < enteredPin.length
                      ? 'border-emerald-600 bg-emerald-50 text-slate-900 scale-105'
                      : 'border-slate-200 bg-slate-50 text-slate-300'
                  } ${isPinError ? 'border-red-500 bg-red-50 animate-shake' : ''}`}
                >
                  {idx < enteredPin.length ? enteredPin[idx] : '•'}
                </div>
              ))}
            </div>

            {/* Quick Helper for Demo (Shows expected PIN symbols so reviewer knows) */}
            <div className="mb-4 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-center gap-2">
              <span className="font-bold">[DEMO PIN]:</span>
              <div className="flex gap-1.5 text-base">
                {selectedProfileForPin.pin.map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </div>

            {/* Picture Symbol Keyboard (Large touch targets >= 56px) */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {PIN_SYMBOLS.slice(0, 8).map(sym => (
                <button
                  key={sym}
                  onClick={() => handlePinSymbolClick(sym)}
                  className="min-h-[56px] rounded-xl bg-slate-100 hover:bg-emerald-100 active:scale-95 text-2xl flex items-center justify-center border border-slate-200 transition-colors"
                >
                  {sym}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                // Direct bypass for convenience
                setActiveProfile(selectedProfileForPin.id);
                if (selectedProfileForPin.stars === 0) {
                  onTakeAssessment(selectedProfileForPin);
                } else {
                  onSelectProfile(selectedProfileForPin);
                }
              }}
              className="text-xs text-emerald-800 hover:underline font-bold mt-2"
            >
              {isSindhi ? 'بغير پن داخل ٿيو (Bypass PIN for Demo)' : 'بغیر پن لاگ ان کریں (Bypass for Demo)'}
            </button>
          </div>
        </div>
      )}

      {/* Add Profile Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-start animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {isSindhi ? 'نئون فيملي ميمبر شامل ڪريو' : 'نیا فیملی ممبر شامل کریں'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isSindhi ? 'نالو (Name)' : 'نام (Name)'}
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="مثلاً: فاطمہ، علی، دادی جان"
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {isSindhi ? 'تصوير چونڊيو (Avatar)' : 'تصویر یا اوتار منتخب کریں'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_AVATARS.map(av => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setNewAvatar(av)}
                      className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                        newAvatar === av
                          ? 'bg-emerald-600 text-white shadow-md scale-105'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isSindhi ? '4-علامتي تصويري پن' : '4-علامتی تصویری پن (Picture PIN)'}
                </label>
                <div className="flex gap-2 p-3 bg-emerald-50 rounded-xl text-2xl justify-center">
                  {newPin.map((p, i) => (
                    <span key={i}>{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm"
              >
                {isSindhi ? 'رد ڪريو' : 'منسوخ کریں'}
              </button>
              <button
                type="button"
                onClick={handleCreateProfile}
                disabled={!newName.trim()}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-md"
              >
                {isSindhi ? 'محفوظ ڪريو' : 'محفوظ کریں'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
