import React, { useState } from 'react';
import type { UserProfile } from './types';
import {
  getActiveProfile,
  setActiveProfile,
} from './services/storage';
import { LanguageProvider } from './context/LanguageProvider';
import { useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { WelcomeLanguageScreen } from './screens/WelcomeLanguageScreen';
import { FamilySwitcherScreen } from './screens/FamilySwitcherScreen';
import { PlacementQuizScreen } from './screens/PlacementQuizScreen';
import { LearnerHomeScreen } from './screens/LearnerHomeScreen';
import { FacilitatorDashboardScreen } from './screens/FacilitatorDashboardScreen';
import { LimitsModal } from './components/LimitsModal';

const AppContent: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeProfile, setCurrentProfile] = useState<UserProfile>(() => getActiveProfile());
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'family' | 'quiz' | 'home' | 'facilitator'>('welcome');
  const [isLimitsModalOpen, setIsLimitsModalOpen] = useState(false);

  const handleSelectProfile = (profile: UserProfile) => {
    setCurrentProfile(profile);
    setActiveProfile(profile.id);
    setCurrentScreen('home');
  };

  const handleTakePlacement = (profile?: UserProfile) => {
    if (profile) {
      setCurrentProfile(profile);
      setActiveProfile(profile.id);
    }
    setCurrentScreen('quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Top Navbar */}
      <Navbar
        activeProfile={activeProfile}
        onSwitchProfile={() => setCurrentScreen('family')}
        onToggleFacilitator={() =>
          setCurrentScreen(currentScreen === 'facilitator' ? 'home' : 'facilitator')
        }
        isFacilitatorView={currentScreen === 'facilitator'}
        onOpenLimits={() => setIsLimitsModalOpen(true)}
        onGoHome={() => setCurrentScreen('home')}
      />

      {/* Main Dynamic Screen Body */}
      <main className="flex-1 pb-16">
        {currentScreen === 'welcome' && (
          <WelcomeLanguageScreen
            onProceed={() => setCurrentScreen('family')}
          />
        )}

        {currentScreen === 'family' && (
          <FamilySwitcherScreen
            language={lang}
            onSelectProfile={handleSelectProfile}
            onTakeAssessment={handleTakePlacement}
          />
        )}

        {currentScreen === 'quiz' && (
          <PlacementQuizScreen
            language={lang}
            profile={activeProfile}
            onFinish={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'home' && (
          <LearnerHomeScreen
            profile={activeProfile}
            onTakePlacement={() => setCurrentScreen('quiz')}
          />
        )}

        {currentScreen === 'facilitator' && (
          <FacilitatorDashboardScreen
            language={lang}
            onClose={() => setCurrentScreen('home')}
          />
        )}
      </main>

      {/* Persistent Bottom Bar for Quick Navigation on Tablet */}
      <footer className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-4 flex items-center justify-around text-xs shadow-lg sm:hidden">
        <button
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center gap-1 font-bold ${
            currentScreen === 'home' ? 'text-teal-800' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">🏠</span>
          <span>{t('home')}</span>
        </button>
        <button
          onClick={() => setCurrentScreen('family')}
          className={`flex flex-col items-center gap-1 font-bold ${
            currentScreen === 'family' ? 'text-teal-800' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">👨‍👩‍👧</span>
          <span>{t('family')}</span>
        </button>
        <button
          onClick={() => setCurrentScreen('quiz')}
          className={`flex flex-col items-center gap-1 font-bold ${
            currentScreen === 'quiz' ? 'text-amber-800' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">📝</span>
          <span>{t('quiz')}</span>
        </button>
        <button
          onClick={() => setCurrentScreen('facilitator')}
          className={`flex flex-col items-center gap-1 font-bold ${
            currentScreen === 'facilitator' ? 'text-teal-800' : 'text-slate-500'
          }`}
        >
          <span className="text-lg">📊</span>
          <span>{t('dashboard')}</span>
        </button>
      </footer>

      {/* About & Limits Modal */}
      <LimitsModal
        isOpen={isLimitsModalOpen}
        onClose={() => setIsLimitsModalOpen(false)}
        language={lang}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
