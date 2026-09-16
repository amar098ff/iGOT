import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { radarData as defaultRadarData } from '../data/mockData';
import { useStream } from '../context/StreamContext';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="gov-card px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-gov-navy mb-1">{d.fullName || d.subject}</p>
      <p className="text-gov-blue">Current: <strong>{d.current}%</strong></p>
      <p className="text-gov-gray-400">Required: <strong>{d.required}%</strong></p>
    </div>
  );
};

const CustomAxisTick = ({ x, y, payload }) => (
  <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
    fill="#1A2D42" fontSize={10} fontWeight="500" fontFamily="Noto Sans, sans-serif">
    {payload.value}
  </text>
);

export default function CompetencyRadar({ data }) {
  let streamCtx = null;
  try {
    streamCtx = useStream();
  } catch {
    // outside provider fallback
  }

  const dynamicData = data || (streamCtx?.gapAnalysis?.competencyBreakdown ? streamCtx.gapAnalysis.competencyBreakdown.map(c => ({
    subject: c.name.split(' ').slice(0, 2).join(' '),
    current: c.current,
    required: c.required,
    fullName: c.name,
  })) : defaultRadarData);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="gov-card p-5"
    >
      <div className="mb-4">
        <h3 className="section-title">Competency Radar</h3>
        <p className="text-xs text-gov-gray-400">Current level vs. role requirements across all competency domains</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={dynamicData} outerRadius="75%">
          <PolarGrid stroke="#D8DCE2" strokeDasharray="4 4" />
          <PolarAngleAxis dataKey="subject" tick={<CustomAxisTick />} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#8B94A3' }} tickCount={4} />
          <Radar
            name="Required Level"
            dataKey="required"
            stroke="#8B94A3"
            fill="#8B94A3"
            fillOpacity={0.08}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <Radar
            name="Your Level"
            dataKey="current"
            stroke="#1D5F9E"
            fill="#1D5F9E"
            fillOpacity={0.18}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span style={{ fontSize: 11, color: '#4A5568' }}>{value}</span>}
            wrapperStyle={{ paddingTop: 8 }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 text-xs text-gov-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5 bg-gov-blue" />
          <span>Your Level</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-px border-t-2 border-gov-gray-400 border-dashed" />
          <span>Required</span>
        </div>
      </div>
    </motion.div>
  );
}
