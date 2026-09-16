import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  BarChart3,
  Clock,
  Star
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function GapAnalysisPage({ onEnterDashboard, onRetake }) {
  const { gapAnalysis, selectedStream, currentRole } = useStream();

  const {
    overallScore,
    benchmark,
    correctCount,
    totalQuestions,
    competencyBreakdown,
    criticalGaps,
    developingGaps,
    strongAreas,
    recommendedCourses,
    aiSummary,
  } = gapAnalysis;

  const isAboveBenchmark = overallScore >= benchmark;

  return (
    <div className="min-h-screen bg-gov-off-white flex flex-col">
      {/* Gov Header Strip */}
      <div className="bg-gov-navy text-white">
        <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green" />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-gov-saffron leading-none">iGOT</span>
            </div>
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-widest">
                Government of India · Competency Diagnostic Framework
              </p>
              <p className="text-xs font-semibold text-white">
                {selectedStream?.name} — Competency Diagnostic & Gap Analysis Report
              </p>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {[
              { n: 1, label: 'Stream', done: true },
              { n: 2, label: 'Assessment', done: true },
              { n: 3, label: 'Diagnostic', active: true },
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
        </div>
      </div>

      {/* Main Diagnostic Body */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        
        {/* Top Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="gov-card p-6 sm:p-8 bg-gradient-to-br from-gov-navy via-[#0f2e54] to-gov-navy-dark text-white relative overflow-hidden"
        >
          {/* Subtle watermark seal */}
          <div className="absolute right-4 -bottom-10 opacity-5 pointer-events-none text-[160px] font-serif font-black">
            GOV
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-gov-saffron">
                <ShieldCheck size={14} /> Official Competency Diagnostic Report
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Diagnostic Assessment Results: {selectedStream?.name}
              </h1>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Designation mapped: <strong>{currentRole.role}</strong> ({currentRole.department}).
                Your performance has been benchmarked against National Competency Standards for this role.
              </p>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-4 bg-white/10 border border-white/20 p-4 rounded-gov-md backdrop-blur-xs shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-white/60 uppercase tracking-wider block">Your Score</span>
                <span className="text-3xl sm:text-4xl font-black text-white">{overallScore}%</span>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <span className="text-[10px] text-white/60 uppercase tracking-wider block">Benchmark</span>
                <span className="text-2xl font-bold text-gov-saffron">{benchmark}%</span>
              </div>
            </div>
          </div>

          {/* Status pill strip */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-white/80">
                <Target size={14} className="text-gov-blue-light" />
                <span>Questions Correct: <strong>{correctCount} / {totalQuestions}</strong></span>
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Award size={14} className={isAboveBenchmark ? 'text-gov-green' : 'text-gov-amber'} />
                <span>Status: <strong className={isAboveBenchmark ? 'text-green-300' : 'text-amber-300'}>
                  {isAboveBenchmark ? 'Benchmark Achieved' : 'Capacity Building Required'}
                </strong></span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onRetake}
                className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white underline transition-colors"
              >
                <RotateCcw size={12} /> Retake Assessment
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Insight Diagnostic Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gov-card p-6 border-l-4 border-l-gov-blue bg-gov-blue-light/40"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-gov bg-gov-blue text-white shrink-0 mt-0.5">
              <Sparkles size={18} />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-gov-navy">AI Competency Diagnostic Summary</h2>
              <p className="text-xs sm:text-sm text-gov-gray-700 leading-relaxed">
                {aiSummary}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Competency Gap Breakdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gov-navy flex items-center gap-2">
                <BarChart3 size={18} className="text-gov-blue" />
                Competency Gap Breakdown & Proficiency Levels
              </h2>
              <p className="text-xs text-gov-gray-400 mt-0.5">
                Evaluation across all 6 core competencies required for your stream.
              </p>
            </div>

            {/* Category tags legend */}
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-gov-green font-medium">
                <CheckCircle size={14} /> Strong (≥ 75%)
              </span>
              <span className="flex items-center gap-1.5 text-gov-amber font-medium">
                <AlertTriangle size={14} /> Developing (60-74%)
              </span>
              <span className="flex items-center gap-1.5 text-gov-red font-medium">
                <XCircle size={14} /> Critical Gap (&lt; 60%)
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {competencyBreakdown.map((item, idx) => {
              const isStrong = item.category === 'strong';
              const isCritical = item.category === 'critical';

              return (
                <div
                  key={item.name}
                  className={`gov-card p-5 border-2 transition-all ${
                    isCritical
                      ? 'border-red-200 bg-gov-red-light/30'
                      : isStrong
                      ? 'border-green-200 bg-gov-green-light/30'
                      : 'border-amber-200 bg-gov-amber-light/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block mb-1
                        ${isCritical
                          ? 'bg-gov-red text-white'
                          : isStrong
                          ? 'bg-gov-green text-white'
                          : 'bg-gov-amber text-white'
                        }`}
                      >
                        {item.statusText}
                      </span>
                      <h3 className="text-sm font-bold text-gov-navy">{item.name}</h3>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-gov-navy">{item.current}%</span>
                      <span className="text-[10px] text-gov-gray-400 block">Req: {item.required}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="progress-track h-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.current}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gov-gray-600">
                      <span>Proficiency Level</span>
                      <span>
                        {item.gap > 0 ? (
                          <strong className="text-gov-red">-{item.gap}% Gap</strong>
                        ) : (
                          <strong className="text-gov-green">+{(item.current - item.required)}% Surplus</strong>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommended Karmayogi Learning Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gov-navy flex items-center gap-2">
                <BookOpen size={18} className="text-gov-blue" />
                Personalized Karmayogi Learning Recommendation Roadmap
              </h2>
              <p className="text-xs text-gov-gray-400 mt-0.5">
                High-priority digital courses mapped from iGOT Karmayogi to bridge your specific competency gaps.
              </p>
            </div>
            <span className="badge-gov-info text-xs">
              {recommendedCourses.length} Courses Mapped
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="gov-card p-5 flex flex-col justify-between hover:shadow-gov-card-hover transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="badge-gov-saffron text-[10px]">
                      {course.badge}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded
                      ${course.priority === 'High'
                        ? 'bg-gov-red text-white'
                        : course.priority === 'Medium'
                        ? 'bg-gov-amber text-white'
                        : 'bg-gov-gray-200 text-gov-gray-700'
                      }`}
                    >
                      {course.priority} Priority Gap: {course.targetGap}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gov-navy leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-gov-gray-400 mt-0.5">{course.provider}</p>
                  </div>

                  <p className="text-xs text-gov-gray-600 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.tags.map(t => (
                      <span key={t} className="badge-gov-neutral text-[9px]">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gov-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-gov-gray-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock size={12} className="text-gov-gray-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Star size={12} className="text-gov-saffron fill-gov-saffron" />
                      {course.rating} ({course.enrolled.toLocaleString()} learners)
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-gov-blue flex items-center gap-1">
                    iGOT Karmayogi <ExternalLink size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enter Employee Portal CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="gov-card p-6 sm:p-8 bg-gradient-to-r from-gov-navy to-gov-blue text-white flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">
              Ready to Explore Your Personalized Portal?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Your competency scores, skill gap radar, and tailored learning modules have been loaded for <strong>{selectedStream?.name}</strong>.
            </p>
          </div>

          <button
            onClick={onEnterDashboard}
            className="btn-gov-saffron px-8 py-3.5 text-sm font-bold shadow-lg shrink-0 flex items-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <span>Enter Employee Portal & Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </main>
    </div>
  );
}
