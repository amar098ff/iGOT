import { motion } from 'framer-motion';
import { CheckCircle, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { employee } from '../data/mockData';
import { useStream } from '../context/StreamContext';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export default function WelcomeHero({ overallScore: propScore }) {
  let streamCtx = null;
  try {
    streamCtx = useStream();
  } catch {
    // fallback
  }

  const roleInfo = streamCtx?.currentRole || {
    role: employee.role,
    department: employee.department,
    ministry: employee.ministry,
  };

  const selectedStream = streamCtx?.selectedStream;
  const overallScore = propScore !== undefined ? propScore : (streamCtx?.gapAnalysis?.overallScore || employee.overallCompetency);
  const criticalCount = streamCtx?.gapAnalysis?.criticalGaps?.length || 2;
  const developingCount = streamCtx?.gapAnalysis?.developingGaps?.length || 1;
  const totalGaps = criticalCount + developingCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-gov-lg border border-gov-gray-200 shadow-gov-card"
      style={{ minHeight: 220 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Government office"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gov-navy/90 via-gov-navy/75 to-gov-navy/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8">
        <div>
          <p className="text-white/70 text-sm font-medium mb-1">
            {getGreeting()},
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {employee.name}
          </h2>
          <p className="text-white/70 text-sm mb-4 max-w-md">
            Stream: <strong className="text-gov-saffron">{selectedStream?.name || 'Statistics & Data Analytics'}</strong>. Continue building the competencies required for your role. You have <strong className="text-white">{totalGaps} skill gaps</strong> that need attention.
          </p>

          {/* Role info pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded px-3 py-1.5 text-white">
              <Shield size={12} className="text-gov-saffron" />
              <span className="text-xs font-medium">{roleInfo.role}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded px-3 py-1.5 text-white">
              <span className="text-xs font-medium truncate max-w-[200px]">{roleInfo.department}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gov-green/80 border border-gov-green rounded px-3 py-1.5">
              <CheckCircle size={12} className="text-white" />
              <span className="text-xs font-medium text-white">iGOT Connected</span>
            </div>
          </div>
        </div>

        {/* Competency score ring */}
        <div className="shrink-0">
          <div className="bg-white/10 backdrop-blur-sm border border-white/25 rounded-gov-lg p-5 text-center min-w-[130px]">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="#E07B39"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - overallScore / 100) }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{overallScore}%</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-white/90">Overall Competency</p>
            <Link to="/competencies" className="inline-flex items-center gap-1 text-[10px] text-white/60 hover:text-white mt-1 transition-colors">
              View Details <ChevronRight size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Employee ID strip */}
      <div className="relative z-10 flex items-center gap-4 px-6 sm:px-8 py-2 bg-black/20 border-t border-white/10">
        <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Employee ID:</span>
        <span className="text-[10px] text-white/70 font-mono">{employee.id}</span>
        <span className="text-[10px] text-white/40 mx-2">·</span>
        <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">iGOT ID:</span>
        <span className="text-[10px] text-white/70 font-mono">{employee.igotId}</span>
      </div>
    </motion.div>
  );
}
