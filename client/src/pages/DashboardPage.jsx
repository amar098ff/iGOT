import { motion } from 'framer-motion';
import WelcomeHero from '../components/WelcomeHero';
import CompetencyCard from '../components/CompetencyCard';
import SkillGapCard from '../components/SkillGapCard';
import AIInsightCard from '../components/AIInsightCard';
import LearningRecommendation from '../components/LearningRecommendation';
import IGOTStatus from '../components/IGOTStatus';
import GrowthChart from '../components/GrowthChart';
import AssessmentCard from '../components/AssessmentCard';
import { employee, competencies as defaultCompetencies, skillGaps as defaultGaps, recommendations as defaultRecs, upcomingAssessment, serviceImages } from '../data/mockData';
import { useStream } from '../context/StreamContext';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Target, BookOpen, Award, Sparkles, RotateCcw } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

function SectionHeader({ title, subtitle, link, linkLabel }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="section-divider">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-xs text-gov-blue hover:text-gov-navy font-medium flex items-center gap-0.5 transition-colors">
          {linkLabel || 'View All'} <ChevronRight size={12} />
        </Link>
      )}
    </div>
  );
}

export default function DashboardPage() {
  let streamCtx = null;
  try {
    streamCtx = useStream();
  } catch {
    // fallback
  }

  const selectedStream = streamCtx?.selectedStream;
  const gapAnalysis = streamCtx?.gapAnalysis;

  // Dynamic competencies formatted for CompetencyCard
  const dynamicCompetencies = gapAnalysis?.competencyBreakdown ? gapAnalysis.competencyBreakdown.map((c, idx) => ({
    id: `comp-${idx}`,
    name: c.name,
    current: c.current,
    required: c.required,
    status: c.category === 'strong' ? 'achieved' : c.category === 'critical' ? 'gap' : 'developing',
    trend: c.gap > 0 ? +4 : +7,
    lastUpdated: '2026-09-16',
  })) : defaultCompetencies;

  // Dynamic skill gaps
  const dynamicGaps = gapAnalysis?.criticalGaps && gapAnalysis?.developingGaps ? [
    ...gapAnalysis.criticalGaps.map((g, idx) => ({
      id: `gap-crit-${idx}`,
      skill: g.name,
      current: g.current,
      required: g.required,
      gap: g.gap,
      severity: 'high',
      reason: `Mandatory competency for ${streamCtx?.currentRole?.role || 'your role'}. Required to achieve full operational proficiency under standard government guidelines.`,
      recommendedCourses: 2,
      estimatedWeeks: 4,
    })),
    ...gapAnalysis.developingGaps.map((g, idx) => ({
      id: `gap-dev-${idx}`,
      skill: g.name,
      current: g.current,
      required: g.required,
      gap: g.gap,
      severity: 'medium',
      reason: `Important developmental competency to enhance speed and precision in departmental deliverables.`,
      recommendedCourses: 1,
      estimatedWeeks: 2,
    })),
  ] : defaultGaps;

  // Dynamic courses formatted for LearningRecommendation
  const dynamicCourses = gapAnalysis?.recommendedCourses ? gapAnalysis.recommendedCourses.map((c, idx) => ({
    id: c.id,
    title: c.title,
    provider: c.provider,
    providerType: c.provider.toLowerCase().includes('igot') ? 'igot' : 'tpac',
    competency: c.targetGap || c.competency,
    duration: c.duration,
    modules: c.modules,
    level: c.level,
    priority: c.priority === 'High' ? 'high' : 'medium',
    enrolled: idx === 0,
    progress: idx === 0 ? 35 : 0,
    rating: c.rating,
    enrolledCount: c.enrolled,
  })) : defaultRecs;

  const overallScore = gapAnalysis?.overallScore || employee.overallCompetency;
  const topGapCompetencies = dynamicCompetencies.slice(0, 4);

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto">
      {/* Stream Active Pill Banner */}
      {selectedStream && (
        <div className="bg-gov-blue-light/60 border border-blue-200 rounded-gov-md p-3 px-4 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedStream.icon}</span>
            <div>
              <span className="text-gov-gray-500">Active Stream: </span>
              <strong className="text-gov-navy">{selectedStream.name}</strong>
              <span className="text-gov-gray-400 mx-2">·</span>
              <span className="text-gov-gray-500">Designation: </span>
              <strong className="text-gov-navy">{streamCtx?.currentRole?.role}</strong>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => streamCtx?.setOnboardingStep('gap_analysis')}
              className="text-gov-blue hover:text-gov-navy font-semibold flex items-center gap-1"
            >
              <Sparkles size={12} /> View Diagnostic Report
            </button>
            <span className="text-gov-gray-300">|</span>
            <button
              onClick={() => streamCtx?.setOnboardingStep('stream_selection')}
              className="text-gov-gray-600 hover:text-gov-navy font-medium flex items-center gap-1"
            >
              <RotateCcw size={12} /> Change Stream
            </button>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <motion.div {...fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Target, label: 'Overall Score', value: `${overallScore}%`, color: 'text-gov-blue', bg: 'bg-gov-blue-light' },
          { icon: TrendingUp, label: 'Skill Gaps', value: dynamicGaps.length, color: 'text-gov-red', bg: 'bg-gov-red-light' },
          { icon: BookOpen, label: 'Learning Hours', value: '28 hrs', color: 'text-gov-saffron', bg: 'bg-gov-saffron-light' },
          { icon: Award, label: 'Certificates', value: 3, color: 'text-gov-green', bg: 'bg-gov-green-light' },
        ].map(({ icon: Icon, label, value, color, bg }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="stat-box"
          >
            <div className={`w-8 h-8 rounded-gov ${bg} flex items-center justify-center mb-2`}>
              <Icon size={16} className={color} />
            </div>
            <p className="stat-value text-xl">{value}</p>
            <p className="stat-label">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Welcome Hero */}
      <WelcomeHero overallScore={overallScore} />

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Competency Overview */}
          <motion.section {...fadeUp} transition={{ delay: 0.1 }}>
            <SectionHeader
              title="My Competency Profile"
              subtitle="Current level against role requirements"
              link="/competencies"
              linkLabel="Full Profile"
            />
            <div className="grid sm:grid-cols-2 gap-3">
              {topGapCompetencies.map((c, i) => (
                <CompetencyCard key={c.id} competency={c} index={i} />
              ))}
            </div>
          </motion.section>

          {/* Skill Gaps */}
          <motion.section {...fadeUp} transition={{ delay: 0.15 }}>
            <SectionHeader
              title="Your Identified Skill Gaps"
              subtitle="Priority areas requiring development for your current role"
              link="/competencies"
              linkLabel="View All Gaps"
            />
            <div className="space-y-4">
              {dynamicGaps.map((gap, i) => (
                <SkillGapCard key={gap.id} gap={gap} index={i} />
              ))}
            </div>
          </motion.section>

          {/* AI Insight */}
          <motion.section {...fadeUp} transition={{ delay: 0.2 }}>
            <SectionHeader
              title="AI Competency Insight"
              subtitle="Personalised analysis of your competency assessment"
            />
            <AIInsightCard />
          </motion.section>

          {/* Learning Recommendations */}
          <motion.section {...fadeUp} transition={{ delay: 0.22 }}>
            <SectionHeader
              title="Recommended for Your Skill Gaps"
              subtitle="Curated from iGOT Karmayogi and TPAC based on your gaps"
              link="/learning"
              linkLabel="All Recommendations"
            />
            <div className="space-y-3">
              {dynamicCourses.slice(0, 3).map((course, i) => (
                <LearningRecommendation key={course.id} course={course} index={i} />
              ))}
            </div>
          </motion.section>

          {/* Public Service Images */}
          <motion.section {...fadeUp} transition={{ delay: 0.25 }}>
            <SectionHeader
              title="Learning for Better Public Service"
            />
            <div className="grid sm:grid-cols-3 gap-3">
              {serviceImages.map((img, i) => (
                <div key={i} className="rounded-gov-md overflow-hidden border border-gov-gray-200 shadow-gov-card">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-28 object-cover"
                    loading="lazy"
                  />
                  <div className="px-3 py-2 bg-gov-off-white border-t border-gov-gray-200">
                    <p className="text-[10px] text-gov-gray-400 leading-snug">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-5">
          {/* Next Assessment */}
          <motion.div {...fadeUp} transition={{ delay: 0.12 }}>
            <SectionHeader title="Skill Assessment" />
            <AssessmentCard assessment={upcomingAssessment} />
          </motion.div>

          {/* iGOT Status */}
          <motion.div {...fadeUp} transition={{ delay: 0.18 }}>
            <SectionHeader title="iGOT Connection" />
            <IGOTStatus />
          </motion.div>

          {/* Growth Chart */}
          <motion.div {...fadeUp} transition={{ delay: 0.22 }}>
            <SectionHeader title="Competency Growth" />
            <GrowthChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
