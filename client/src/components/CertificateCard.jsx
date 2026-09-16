import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Shield, Hash } from 'lucide-react';

export default function CertificateCard({ cert, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -2 }}
      className="gov-card hover:shadow-gov-card-hover transition-shadow duration-200 overflow-hidden"
    >
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-gov-navy via-gov-blue to-gov-saffron" />

      <div className="p-5">
        {/* Icon and provider */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-gov bg-gov-blue-light border border-blue-200 flex items-center justify-center">
            <Award size={20} className="text-gov-blue" />
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wide
            ${cert.provider === 'iGOT Karmayogi' ? 'badge-gov-info' : 'badge-gov-neutral'}`}>
            {cert.provider}
          </span>
        </div>

        {/* Course name */}
        <h4 className="text-sm font-semibold text-gov-navy mb-3 leading-snug line-clamp-2">
          {cert.course}
        </h4>

        {/* Meta */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-[11px] text-gov-gray-400">
            <Calendar size={11} />
            <span>Completed: <strong className="text-gov-gray-600">{new Date(cert.completedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gov-gray-400">
            <Hash size={11} />
            <span className="font-mono text-[10px] text-gov-gray-600">{cert.certificateId}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gov-gray-400">
            <Shield size={11} />
            <span>Competency: <strong className="text-gov-gray-600">{cert.competency}</strong></span>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-gov-off-white border border-gov-gray-200 rounded-gov px-3 py-1.5 mb-4 flex items-center justify-between">
          <span className="text-[10px] text-gov-gray-400 uppercase tracking-wide">Learning Credits</span>
          <span className="text-sm font-bold text-gov-blue">{cert.credits} Credits</span>
        </div>

        <a href={cert.verifyUrl} className="btn-gov-secondary w-full justify-center text-xs py-2">
          <ExternalLink size={12} />
          View Certificate
        </a>
      </div>
    </motion.div>
  );
}
