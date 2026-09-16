import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkillGapCard({ gap, index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const severityConfig = {
    high: { label: 'High Priority', badge: 'badge-gov-danger', border: 'border-l-gov-red', barCurrent: 'bg-gov-red', barRequired: 'bg-gov-red/20' },
    medium: { label: 'Medium Priority', badge: 'badge-gov-warning', border: 'border-l-gov-amber', barCurrent: 'bg-gov-amber', barRequired: 'bg-gov-amber/20' },
    low: { label: 'Low Priority', badge: 'badge-gov-info', border: 'border-l-gov-blue', barCurrent: 'bg-gov-blue', barRequired: 'bg-gov-blue/20' },
  };

  const cfg = severityConfig[gap.severity] || severityConfig.medium;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(11,37,69,0.12)' }}
      className={`gov-card border-l-4 ${cfg.border} p-5`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-gov-saffron shrink-0" />
            <h4 className="text-sm font-semibold text-gov-navy">{gap.skill}</h4>
          </div>
        </div>
        <span className={cfg.badge}>{cfg.label}</span>
      </div>

      {/* Level comparison */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gov-gray-100 rounded-gov p-3 text-center">
          <p className="text-[10px] font-medium text-gov-gray-400 uppercase tracking-wide mb-1">Your Level</p>
          <p className="text-2xl font-bold text-gov-gray-800">{gap.current}%</p>
          <div className="mt-2 progress-track h-1.5">
            <motion.div
              className={`h-full rounded-full ${cfg.barCurrent}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${gap.current}%` } : {}}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            />
          </div>
        </div>
        <div className="bg-gov-blue-light border border-blue-200 rounded-gov p-3 text-center">
          <p className="text-[10px] font-medium text-gov-gray-400 uppercase tracking-wide mb-1">Required Level</p>
          <p className="text-2xl font-bold text-gov-blue">{gap.required}%</p>
          <div className="mt-2 progress-track h-1.5">
            <div className="h-full rounded-full bg-gov-blue" style={{ width: `${gap.required}%` }} />
          </div>
        </div>
      </div>

      {/* Gap indicator */}
      <div className="flex items-center justify-center gap-3 mb-4 py-2 bg-gov-saffron-light rounded-gov border border-orange-200">
        <div className="text-center">
          <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">Skill Gap</p>
          <p className="text-xl font-bold text-gov-saffron">{gap.gap}%</p>
        </div>
        <div className="h-8 w-px bg-orange-200" />
        <div className="text-center">
          <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">Est. Time</p>
          <p className="text-sm font-bold text-gov-gray-800">{gap.estimatedWeeks}w</p>
        </div>
        <div className="h-8 w-px bg-orange-200" />
        <div className="text-center">
          <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">Courses</p>
          <p className="text-sm font-bold text-gov-gray-800">{gap.recommendedCourses}</p>
        </div>
      </div>

      {/* Why this matters */}
      <div className="bg-gov-off-white border border-gov-gray-200 rounded-gov p-3 mb-4">
        <p className="text-[10px] font-semibold text-gov-gray-600 uppercase tracking-wide mb-1">Why This Matters</p>
        <p className="text-xs text-gov-gray-600 leading-relaxed">{gap.reason}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          to="/learning"
          className="flex-1 btn-gov-primary text-xs py-2 justify-center"
        >
          <BookOpen size={12} />
          Improve Skill
        </Link>
        <Link
          to="/competencies"
          className="flex-1 btn-gov-secondary text-xs py-2 justify-center"
        >
          <ArrowRight size={12} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
