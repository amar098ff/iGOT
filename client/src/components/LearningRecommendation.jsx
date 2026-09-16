import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, CheckCircle, ExternalLink, ArrowUpRight } from 'lucide-react';

const DIFFICULTY_BADGE = {
  Beginner:     'badge-gov-success',
  Intermediate: 'badge-gov-warning',
  Advanced:     'badge-gov-info',
};

const PRIORITY_BORDER = {
  high:   'border-l-gov-red',
  medium: 'border-l-gov-amber',
  low:    'border-l-gov-blue',
};

export default function LearningRecommendation({ course, index = 0 }) {
  if (!course) return null;

  const competenciesList = course.competencies || course.tags || (course.competency ? [course.competency] : ['Competency Building']);
  const difficulty = course.difficulty || course.level || 'Intermediate';
  const completionsCount = course.completions || course.enrolledCount || course.enrolled || 1250;
  const priority = course.priority || 'medium';
  const thumbnail = course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80&fit=crop';
  const provider = course.provider || 'iGOT Karmayogi';
  const providerType = course.providerType || (provider.toLowerCase().includes('igot') ? 'igot' : 'tpac');

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className={`gov-card border-l-4 ${PRIORITY_BORDER[priority] || 'border-l-gov-blue'} overflow-hidden flex flex-col sm:flex-row`}
    >
      {/* Thumbnail */}
      <div className="sm:w-36 shrink-0 h-28 sm:h-auto relative overflow-hidden bg-gov-navy/10">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.background = '#E8F0F8'; e.target.src = ''; }}
        />
        <div className="absolute inset-0 bg-gov-navy/20" />
        {/* Provider badge */}
        <div className="absolute top-2 left-2">
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white
            ${providerType === 'igot' ? 'bg-gov-blue' : 'bg-gov-saffron'}`}>
            {provider}
          </span>
        </div>
        {course.enrolled && (
          <div className="absolute bottom-2 left-2">
            <span className="badge-gov-success text-[9px]">
              <CheckCircle size={8} /> Enrolled
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-sm font-semibold text-gov-navy leading-snug line-clamp-2 flex-1">
            {course.title}
          </h4>
          <span className={`${DIFFICULTY_BADGE[difficulty] || 'badge-gov-neutral'} shrink-0 text-[10px]`}>
            {difficulty}
          </span>
        </div>

        {/* Competencies addressed */}
        <div className="flex flex-wrap gap-1 mb-3">
          {competenciesList.map(c => (
            <span key={c} className="badge-gov-neutral text-[9px]">{c}</span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] text-gov-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={10} /> {course.duration || '12 hours'}
          </span>
          <span className="flex items-center gap-1">
            <Star size={10} className="text-gov-amber fill-gov-amber" /> {course.rating || '4.8'}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={10} /> {typeof completionsCount === 'number' ? completionsCount.toLocaleString() : completionsCount} enrolled
          </span>
        </div>

        {/* Action */}
        <a
          href={course.url || 'https://www.igot.gov.in'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 btn-gov-primary text-xs py-1.5 px-3"
        >
          {course.enrolled ? 'Continue Learning' : 'View Learning'}
          <ArrowUpRight size={11} />
        </a>
      </div>
    </motion.div>
  );
}
