import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, HelpCircle, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const DIFFICULTY_CONFIG = {
  Beginner:     'badge-gov-success',
  Intermediate: 'badge-gov-warning',
  Advanced:     'badge-gov-info',
  Mixed:        'badge-gov-neutral',
};

export default function AssessmentCard({ assessment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="gov-card p-5 border-l-4 border-l-gov-saffron"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] text-gov-saffron font-semibold uppercase tracking-wide mb-1">
            <ClipboardCheck size={10} />
            Next Assessment
          </div>
          <h4 className="text-sm font-semibold text-gov-navy">{assessment.title}</h4>
        </div>
        <span className={DIFFICULTY_CONFIG[assessment.difficulty] || 'badge-gov-neutral'}>
          {assessment.difficulty}
        </span>
      </div>

      <p className="text-xs text-gov-gray-400 leading-relaxed mb-3">
        {assessment.description}
      </p>

      {/* Competencies */}
      <div className="flex flex-wrap gap-1 mb-3">
        {assessment.competencies.map(c => (
          <span key={c} className="badge-gov-neutral text-[9px]">{c}</span>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-[11px] text-gov-gray-400 mb-4 py-3 border-t border-b border-gov-gray-100">
        <div className="flex items-center gap-1.5">
          <HelpCircle size={12} className="text-gov-blue" />
          <strong className="text-gov-navy">{assessment.questions}</strong> Questions
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-gov-blue" />
          <strong className="text-gov-navy">{assessment.duration}</strong> Minutes
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-gov-blue" />
          Due: <strong className="text-gov-navy">{new Date(assessment.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
        </div>
      </div>

      <Link to="/assessment/start" className="btn-gov-primary w-full justify-center text-sm py-2.5">
        <ClipboardCheck size={15} />
        Start Assessment
        <ChevronRight size={14} />
      </Link>
    </motion.div>
  );
}
