import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const STATUS_CONFIG = {
  achieved: {
    label: 'Competency Achieved',
    icon: CheckCircle,
    color: 'text-gov-green',
    bg: 'bg-gov-green-light border-green-200',
    bar: 'bg-gov-green',
    badge: 'badge-gov-success',
  },
  developing: {
    label: 'Developing',
    icon: AlertTriangle,
    color: 'text-gov-amber',
    bg: 'bg-gov-amber-light border-amber-200',
    bar: 'bg-gov-amber',
    badge: 'badge-gov-warning',
  },
  gap: {
    label: 'Skill Gap',
    icon: XCircle,
    color: 'text-gov-red',
    bg: 'bg-gov-red-light border-red-200',
    bar: 'bg-gov-red',
    badge: 'badge-gov-danger',
  },
};

export default function CompetencyCard({ competency, index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const cfg = STATUS_CONFIG[competency.status];
  const Icon = cfg.icon;
  const pct = competency.current;
  const reqPct = competency.required;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="gov-card p-4 hover:shadow-gov-card-hover transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gov-navy truncate pr-2">{competency.name}</h4>
          <p className="text-[10px] text-gov-gray-400 mt-0.5">Last assessed: {competency.lastUpdated}</p>
        </div>
        <span className={cfg.badge}>
          <Icon size={10} />
          {cfg.label}
        </span>
      </div>

      {/* Progress visualization */}
      <div className="space-y-2.5">
        {/* Current level bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gov-gray-400 font-medium">Your Level</span>
            <span className={`font-bold ${cfg.color}`}>{pct}%</span>
          </div>
          <div className="progress-track h-2.5 bg-gov-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${cfg.bar}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Required level indicator */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gov-gray-400 font-medium">Required</span>
            <span className="font-medium text-gov-gray-600">{reqPct}%</span>
          </div>
          <div className="progress-track h-1.5 bg-gov-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gov-gray-300 rounded-full" style={{ width: `${reqPct}%` }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gov-gray-100">
        <div className="flex items-center gap-1.5 text-[11px] text-gov-gray-400">
          {competency.trend > 0
            ? <TrendingUp size={12} className="text-gov-green" />
            : competency.trend < 0
            ? <TrendingDown size={12} className="text-gov-red" />
            : <Minus size={12} className="text-gov-gray-400" />
          }
          <span className={competency.trend > 0 ? 'text-gov-green font-medium' : 'text-gov-gray-400'}>
            {competency.trend > 0 ? `+${competency.trend}%` : `${competency.trend}%`} since last assessment
          </span>
        </div>
        {competency.status !== 'achieved' && (
          <div className="text-[10px] text-gov-red font-medium">
            Gap: {reqPct - pct}%
          </div>
        )}
      </div>
    </motion.div>
  );
}
