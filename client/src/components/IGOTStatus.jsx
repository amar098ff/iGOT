import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw, BookOpen, Award, Clock, ExternalLink } from 'lucide-react';
import { igotData } from '../data/mockData';

export default function IGOTStatus() {
  const lastSyncDate = new Date(igotData.lastSync).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="gov-card p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-gov bg-gov-saffron flex items-center justify-center text-white text-xs font-bold">
            iG
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gov-navy">Your iGOT Learning</h3>
            <p className="text-[10px] text-gov-gray-400">iGOT Karmayogi Platform</p>
          </div>
        </div>
        {igotData.connected
          ? <span className="badge-gov-success"><CheckCircle size={10} />Connected</span>
          : <span className="badge-gov-danger">Disconnected</span>
        }
      </div>

      {/* Account ID */}
      <div className="bg-gov-off-white border border-gov-gray-200 rounded-gov px-3 py-2 mb-4 flex items-center gap-2">
        <span className="text-[10px] text-gov-gray-400 font-medium">iGOT Account:</span>
        <span className="text-[11px] font-mono text-gov-navy font-semibold">{igotData.accountId}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {[
          { icon: BookOpen, label: 'Enrolled', value: igotData.coursesEnrolled, color: 'text-gov-blue' },
          { icon: CheckCircle, label: 'Completed', value: igotData.coursesCompleted, color: 'text-gov-green' },
          { icon: Award, label: 'Certificates', value: igotData.certificates, color: 'text-gov-saffron' },
          { icon: Clock, label: 'Hours', value: igotData.hoursLearned, color: 'text-gov-gray-600' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-gov-gray-100 rounded-gov p-2.5 text-center">
            <Icon size={14} className={`${color} mx-auto mb-1`} />
            <p className="text-lg font-bold text-gov-navy">{value}</p>
            <p className="text-[9px] text-gov-gray-400 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* Current course */}
      {igotData.currentCourse && (
        <div className="border border-gov-blue/25 bg-gov-blue-light rounded-gov p-3 mb-4">
          <p className="text-[10px] font-semibold text-gov-blue uppercase tracking-wide mb-1">Currently Learning</p>
          <p className="text-xs font-medium text-gov-navy mb-2 line-clamp-1">{igotData.currentCourse.title}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 progress-track h-2">
              <div className="h-full bg-gov-blue rounded-full" style={{ width: `${igotData.currentCourse.progress}%` }} />
            </div>
            <span className="text-[11px] font-semibold text-gov-blue shrink-0">{igotData.currentCourse.progress}%</span>
          </div>
        </div>
      )}

      {/* Sync info */}
      <div className="flex items-center gap-1.5 text-[10px] text-gov-gray-400 mb-3">
        <RefreshCw size={9} />
        Last synced: {lastSyncDate}
      </div>

      <a
        href="https://www.igot.gov.in"
        target="_blank"
        rel="noreferrer"
        className="btn-gov-secondary w-full justify-center text-xs py-2"
      >
        <ExternalLink size={12} /> View iGOT Learning
      </a>

      {/* Disclaimer */}
      <p className="text-[9px] text-gov-gray-400 text-center mt-2 leading-tight">
        This is a prototype integration. For actual iGOT services, visit iGOT.gov.in
      </p>
    </motion.div>
  );
}
