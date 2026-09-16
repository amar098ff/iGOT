import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  Flag,
  ArrowLeft,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { STREAM_QUESTIONS, STREAM_ROLES } from '../data/streamData';

export default function StreamAssessmentPage({ onBackToStreams, onComplete }) {
  const { selectedStream, submitAssessment } = useStream();
  const streamId = selectedStream?.id || 'stats';
  const questions = STREAM_QUESTIONS[streamId] || STREAM_QUESTIONS.stats;
  const roleInfo = STREAM_ROLES[streamId] || STREAM_ROLES.stats;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const currentQ = questions[current] || questions[0];

  const handleSelectAnswer = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [current]: optionId,
    }));
  };

  const handleClearAnswer = () => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[current];
      return next;
    });
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  };

  const handleSubmit = () => {
    submitAssessment(answers);
    if (onComplete) onComplete();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gov-off-white flex flex-col">
      {/* Government Header Strip */}
      <div className="bg-gov-navy text-white">
        <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green" />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStreams}
              className="p-1.5 rounded-gov bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              title="Back to Stream Selection"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-gov-saffron leading-none">iGOT</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/60 uppercase tracking-widest">Official Assessment</span>
                <span className="badge-gov-saffron text-[9px] px-1.5 py-0.2">
                  {selectedStream?.name || 'Statistical Services'}
                </span>
              </div>
              <p className="text-xs font-semibold text-white truncate max-w-md sm:max-w-xl">
                {roleInfo.assessmentName}
              </p>
            </div>
          </div>

          {/* Steps & Live Timer */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {[
                { n: 1, label: 'Stream', done: true },
                { n: 2, label: 'Assessment', active: true },
                { n: 3, label: 'Diagnostic', active: false },
                { n: 4, label: 'Portal', active: false },
              ].map(({ n, label, active, done }) => (
                <div key={n} className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border
                    ${done ? 'bg-gov-green text-white border-gov-green'
                      : active ? 'bg-gov-saffron text-white border-gov-saffron'
                      : 'bg-white/10 text-white/40 border-white/20'}`}
                  >
                    {done ? '✓' : n}
                  </div>
                  <span className={`text-[10px] ${active ? 'text-white font-semibold' : 'text-white/50'}`}>{label}</span>
                  {n < 4 && <div className="w-4 h-px bg-white/20 mx-0.5" />}
                </div>
              ))}
            </div>

            <div className="bg-white/10 border border-white/20 rounded-gov px-3 py-1.5 flex items-center gap-2">
              <Clock size={14} className={timeLeft < 300 ? 'text-gov-red animate-pulse' : 'text-gov-saffron'} />
              <div className="text-right">
                <p className="text-[9px] text-white/60 uppercase tracking-tight">Time Left</p>
                <p className={`text-xs font-bold font-mono ${timeLeft < 300 ? 'text-gov-red' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Assessment Container */}
      <div className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col">
        <div className="grid lg:grid-cols-4 gap-6 flex-1">
          
          {/* Question Left / Main Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            
            {/* Top Status & Progress */}
            <div className="gov-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ClipboardCheck size={16} className="text-gov-blue" />
                  <span className="font-semibold text-gov-navy">
                    Question {current + 1} of {total}
                  </span>
                  <span className="badge-gov-info text-[10px]">
                    {currentQ.competency}
                  </span>
                </div>
                <div className="text-[11px] text-gov-gray-600">
                  <span className="font-semibold text-gov-blue">{answeredCount}</span> answered · <span className="font-semibold text-gov-amber">{flagged.size}</span> flagged
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-track h-2">
                <div
                  className="h-full bg-gradient-to-r from-gov-blue to-gov-blue-dark rounded-full transition-all duration-300"
                  style={{ width: `${((answeredCount) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="gov-card p-6 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Question header row */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-gov-gray-100">
                    <div>
                      <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider">
                        Question #{current + 1}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-gov-navy mt-1 leading-snug">
                        {currentQ.text}
                      </h2>
                    </div>

                    <button
                      onClick={toggleFlag}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-gov border text-xs font-medium transition-all
                        ${flagged.has(current)
                          ? 'bg-gov-amber-light border-amber-300 text-gov-amber shadow-sm'
                          : 'bg-white border-gov-gray-200 text-gov-gray-400 hover:text-gov-amber hover:border-amber-200'
                        }`}
                    >
                      <Flag size={13} className={flagged.has(current) ? 'fill-gov-amber' : ''} />
                      <span>{flagged.has(current) ? 'Flagged' : 'Flag'}</span>
                    </button>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options.map((option) => {
                      const isSelected = answers[current] === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectAnswer(option.id)}
                          className={`w-full text-left p-4 rounded-gov-md border-2 transition-all flex items-start gap-3
                            ${isSelected
                              ? 'border-gov-blue bg-gov-blue-light/70 text-gov-navy shadow-gov-card'
                              : 'border-gov-gray-200 bg-white hover:border-gov-blue/50 hover:bg-gov-blue-light/20 text-gov-gray-700'
                            }`}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border
                            ${isSelected
                              ? 'bg-gov-blue text-white border-gov-blue'
                              : 'bg-gov-gray-100 text-gov-gray-600 border-gov-gray-300'
                            }`}
                          >
                            {option.id}
                          </div>
                          <div className="flex-1 text-sm font-medium pt-0.5 leading-relaxed">
                            {option.text}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Nav Buttons */}
              <div className="pt-6 border-t border-gov-gray-100 mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
                    disabled={current === 0}
                    className="btn-gov-secondary text-xs px-4 py-2 disabled:opacity-40"
                  >
                    <ChevronLeft size={15} />
                    Previous
                  </button>
                  {answers[current] && (
                    <button
                      onClick={handleClearAnswer}
                      className="text-xs text-gov-gray-400 hover:text-gov-red underline ml-2"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {current < total - 1 ? (
                    <button
                      onClick={() => setCurrent(prev => Math.min(total - 1, prev + 1))}
                      className="btn-gov-primary text-xs px-5 py-2"
                    >
                      Next
                      <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      className="btn-gov-saffron text-xs px-6 py-2 shadow-sm font-semibold"
                    >
                      <CheckCircle size={15} />
                      Submit Assessment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Question Grid Palette (1 col) */}
          <div className="space-y-4">
            <div className="gov-card p-4 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider mb-1">
                  Question Palette
                </h3>
                <p className="text-[11px] text-gov-gray-400">
                  Select any number to jump directly to that question.
                </p>
              </div>

              {/* 20 Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, i) => {
                  const isCurrent = i === current;
                  const isAnswered = answers[i] !== undefined;
                  const isFlagged = flagged.has(i);

                  let bgStyle = 'bg-gov-gray-100 border-gov-gray-200 text-gov-gray-600 hover:border-gov-gray-400';
                  if (isCurrent) {
                    bgStyle = 'ring-2 ring-gov-blue bg-gov-blue text-white font-bold border-transparent';
                  } else if (isAnswered && isFlagged) {
                    bgStyle = 'bg-gov-amber-light border-gov-amber text-gov-amber font-semibold';
                  } else if (isAnswered) {
                    bgStyle = 'bg-gov-green-light border-green-300 text-gov-green font-semibold';
                  } else if (isFlagged) {
                    bgStyle = 'bg-gov-amber-light border-amber-300 text-gov-amber font-semibold';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-9 rounded-gov border text-xs font-medium flex items-center justify-center transition-all ${bgStyle}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-gov-gray-100 space-y-1.5 text-[11px] text-gov-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-gov-green-light border border-green-300 inline-block" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-gov-amber-light border border-amber-300 inline-block" />
                  <span>Flagged ({flagged.size})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-gov-gray-100 border border-gov-gray-200 inline-block" />
                  <span>Not Answered ({total - answeredCount})</span>
                </div>
              </div>

              {/* Ready to Submit Button in Palette */}
              <button
                onClick={() => setShowConfirmModal(true)}
                className="btn-gov-primary w-full justify-center py-2.5 text-xs mt-2"
              >
                <ShieldCheck size={14} />
                Finish & Review
              </button>
            </div>

            {/* Assessment Meta Box */}
            <div className="gov-card p-4 space-y-2 bg-gradient-to-br from-white to-gov-off-white">
              <div className="flex items-center gap-2 text-gov-navy font-semibold text-xs">
                <Award size={14} className="text-gov-saffron" />
                <span>iGOT Assessment Standard</span>
              </div>
              <p className="text-[11px] text-gov-gray-600 leading-relaxed">
                Your performance directly feeds into the MoSPI Competency Gap Engine to formulate your customized Karmayogi learning roadmap.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-gov-lg shadow-gov-card-hover max-w-md w-full p-6 border border-gov-gray-200"
          >
            <div className="w-12 h-12 rounded-full bg-gov-blue-light flex items-center justify-center mx-auto mb-4 text-gov-blue">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="text-base font-bold text-gov-navy text-center mb-1">
              Submit Competency Assessment?
            </h3>
            <p className="text-xs text-gov-gray-600 text-center mb-5">
              You have answered <strong>{answeredCount} of {total}</strong> questions.
              {total - answeredCount > 0 && (
                <span className="text-gov-amber block mt-1 font-medium">
                  ⚠️ You still have {total - answeredCount} unanswered questions.
                </span>
              )}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-gov-secondary justify-center py-2.5 text-xs"
              >
                Return to Test
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleSubmit();
                }}
                className="btn-gov-saffron justify-center py-2.5 text-xs font-semibold"
              >
                Confirm & Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
