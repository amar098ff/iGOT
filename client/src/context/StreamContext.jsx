import { createContext, useContext, useState, useEffect } from 'react';
import { STREAMS, STREAM_ROLES, generateGapAnalysis } from '../data/streamData';

const StreamContext = createContext(null);

export function StreamProvider({ children }) {
  // Read initial stream state from localStorage
  const [selectedStream, setSelectedStream] = useState(() => {
    const saved = localStorage.getItem('ks_selected_stream');
    return saved ? JSON.parse(saved) : STREAMS[0]; // default to stats
  });

  const [assessmentAnswers, setAssessmentAnswers] = useState(() => {
    const saved = localStorage.getItem('ks_stream_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [assessmentCompleted, setAssessmentCompleted] = useState(() => {
    return localStorage.getItem('ks_assessment_completed') === 'true';
  });

  const [onboardingStep, setOnboardingStep] = useState(() => {
    return localStorage.getItem('ks_onboarding_step') || 'stream_selection'; // stream_selection | assessment | gap_analysis | completed
  });

  // Calculate dynamic gap analysis
  const [gapAnalysis, setGapAnalysis] = useState(() => {
    const streamId = selectedStream?.id || 'stats';
    return generateGapAnalysis(streamId, assessmentAnswers);
  });

  // Re-run gap analysis whenever stream or answers change
  useEffect(() => {
    if (selectedStream) {
      const data = generateGapAnalysis(selectedStream.id, assessmentAnswers);
      setGapAnalysis(data);
    }
  }, [selectedStream, assessmentAnswers]);

  const selectStream = (stream) => {
    setSelectedStream(stream);
    localStorage.setItem('ks_selected_stream', JSON.stringify(stream));
    setOnboardingStep('assessment');
    localStorage.setItem('ks_onboarding_step', 'assessment');
  };

  const submitAssessment = (answers) => {
    setAssessmentAnswers(answers);
    setAssessmentCompleted(true);
    localStorage.setItem('ks_stream_answers', JSON.stringify(answers));
    localStorage.setItem('ks_assessment_completed', 'true');
    setOnboardingStep('gap_analysis');
    localStorage.setItem('ks_onboarding_step', 'gap_analysis');
  };

  const finishOnboarding = () => {
    setOnboardingStep('completed');
    localStorage.setItem('ks_onboarding_step', 'completed');
  };

  const retakeAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentCompleted(false);
    setOnboardingStep('assessment');
    localStorage.removeItem('ks_stream_answers');
    localStorage.setItem('ks_assessment_completed', 'false');
    localStorage.setItem('ks_onboarding_step', 'assessment');
  };

  const switchStream = (streamId) => {
    const stream = STREAMS.find(s => s.id === streamId) || STREAMS[0];
    setSelectedStream(stream);
    setAssessmentAnswers({});
    setAssessmentCompleted(false);
    setOnboardingStep('assessment');
    localStorage.setItem('ks_selected_stream', JSON.stringify(stream));
    localStorage.removeItem('ks_stream_answers');
    localStorage.setItem('ks_assessment_completed', 'false');
    localStorage.setItem('ks_onboarding_step', 'assessment');
  };

  const resetAll = () => {
    setSelectedStream(null);
    setAssessmentAnswers({});
    setAssessmentCompleted(false);
    setOnboardingStep('stream_selection');
    localStorage.removeItem('ks_selected_stream');
    localStorage.removeItem('ks_stream_answers');
    localStorage.removeItem('ks_assessment_completed');
    localStorage.removeItem('ks_onboarding_step');
  };

  const currentRole = STREAM_ROLES[selectedStream?.id || 'stats'] || STREAM_ROLES.stats;

  return (
    <StreamContext.Provider value={{
      selectedStream,
      assessmentAnswers,
      assessmentCompleted,
      onboardingStep,
      gapAnalysis,
      currentRole,
      selectStream,
      submitAssessment,
      finishOnboarding,
      retakeAssessment,
      switchStream,
      resetAll,
      setOnboardingStep,
    }}>
      {children}
    </StreamContext.Provider>
  );
}

export const useStream = () => {
  const ctx = useContext(StreamContext);
  if (!ctx) throw new Error('useStream must be used within StreamProvider');
  return ctx;
};
