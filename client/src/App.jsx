import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout components
import GovernmentHeader from './components/GovernmentHeader';
import EmployeeNavbar from './components/EmployeeNavbar';
import GovernmentFooter from './components/GovernmentFooter';

// Pages
import LoginPage from './pages/LoginPage';
import StreamSelectionPage from './pages/StreamSelectionPage';
import StreamAssessmentPage from './pages/StreamAssessmentPage';
import GapAnalysisPage from './pages/GapAnalysisPage';
import DashboardPage from './pages/DashboardPage';
import CompetenciesPage from './pages/CompetenciesPage';
import LearningPage from './pages/LearningPage';
import ProgressPage from './pages/ProgressPage';
import CertificatesPage from './pages/CertificatesPage';

// Context
import { StreamProvider, useStream } from './context/StreamContext';

// Help page
function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gov-navy">Help & Support</h1>
        <p className="text-sm text-gov-gray-400 mt-1">Get assistance with the competency portal.</p>
      </div>
      {[
        { q: 'How is my competency score calculated?', a: 'Your score is based on assessment results, self-assessments, and verified learning activities across your chosen professional stream.' },
        { q: 'Can I change my professional stream or retake the assessment?', a: 'Yes. You can re-take your stream assessment or switch to another professional stream from the dashboard or your competency profile.' },
        { q: 'How does iGOT Karmayogi integration work?', a: 'Your iGOT profile is synced to recommend personalized courses and credit certifications upon module completion.' },
        { q: 'Who can I contact for support?', a: 'Reach out to your department\'s Learning & Development coordinator or email support@competency.gov.in.' },
      ].map(({ q, a }) => (
        <div key={q} className="gov-card p-5">
          <p className="text-sm font-semibold text-gov-navy mb-2">{q}</p>
          <p className="text-xs text-gov-gray-600 leading-relaxed">{a}</p>
        </div>
      ))}
    </div>
  );
}

// App shell for authenticated users who have completed stream onboarding
function AppShell({ onLogout }) {
  const { setOnboardingStep, currentRole } = useStream();

  return (
    <div className="min-h-screen flex flex-col bg-gov-off-white">
      <GovernmentHeader ministry={currentRole.ministry} />
      <EmployeeNavbar onLogout={onLogout} />
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/competencies" element={<CompetenciesPage />} />
            <Route
              path="/assessment"
              element={
                <StreamAssessmentPage
                  onBackToStreams={() => setOnboardingStep('stream_selection')}
                  onComplete={() => setOnboardingStep('gap_analysis')}
                />
              }
            />
            <Route
              path="/diagnostic"
              element={
                <GapAnalysisPage
                  onEnterDashboard={() => setOnboardingStep('completed')}
                  onRetake={() => setOnboardingStep('assessment')}
                />
              }
            />
            <Route
              path="/stream-select"
              element={
                <StreamSelectionPage
                  onSelect={() => setOnboardingStep('assessment')}
                />
              }
            />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <GovernmentFooter />
    </div>
  );
}

// Main Flow Manager inside Stream Context
function MainContent({ isLoggedIn, setIsLoggedIn }) {
  const {
    onboardingStep,
    selectStream,
    setOnboardingStep,
    finishOnboarding,
    retakeAssessment,
    resetAll,
  } = useStream();

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // If user is logged in, manage the onboarding steps
  if (onboardingStep === 'stream_selection') {
    return (
      <StreamSelectionPage
        onSelect={(stream) => {
          selectStream(stream);
        }}
      />
    );
  }

  if (onboardingStep === 'assessment') {
    return (
      <StreamAssessmentPage
        onBackToStreams={() => setOnboardingStep('stream_selection')}
        onComplete={() => setOnboardingStep('gap_analysis')}
      />
    );
  }

  if (onboardingStep === 'gap_analysis') {
    return (
      <GapAnalysisPage
        onEnterDashboard={() => finishOnboarding()}
        onRetake={() => retakeAssessment()}
      />
    );
  }

  // Onboarding completed: render dashboard shell
  return (
    <AppShell
      onLogout={() => {
        setIsLoggedIn(false);
        resetAll();
      }}
    />
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('ks_is_logged_in') === 'true';
  });

  const handleLogin = (val) => {
    setIsLoggedIn(val);
    localStorage.setItem('ks_is_logged_in', val ? 'true' : 'false');
  };

  return (
    <BrowserRouter>
      <StreamProvider>
        <MainContent
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={handleLogin}
        />
      </StreamProvider>
    </BrowserRouter>
  );
}
