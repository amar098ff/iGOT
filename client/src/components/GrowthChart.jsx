import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts';
import { TrendingUp, Info } from 'lucide-react';
import { growthHistory } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="gov-card px-3 py-2 text-xs">
      <p className="font-semibold text-gov-navy">{label}</p>
      <p className="text-gov-blue mt-0.5">Score: <strong>{payload[0].value}%</strong></p>
    </div>
  );
};

export default function GrowthChart() {
  const latest = growthHistory[growthHistory.length - 1]?.score;
  const first = growthHistory[0]?.score;
  const growth = latest - first;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="gov-card p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="section-title">Competency Growth</h3>
          <p className="text-xs text-gov-gray-400 mt-0.5">Your competency score over time</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end text-gov-green">
            <TrendingUp size={14} />
            <span className="text-sm font-bold">+{growth}%</span>
          </div>
          <p className="text-[10px] text-gov-gray-400">since January 2026</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={growthHistory} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="govGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1D5F9E" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#1D5F9E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#8B94A3' }}
            tickLine={false}
            axisLine={{ stroke: '#D8DCE2' }}
          />
          <YAxis
            domain={[40, 100]}
            tick={{ fontSize: 10, fill: '#8B94A3' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={80} stroke="#8B94A3" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: '#8B94A3', position: 'right' }} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#1D5F9E"
            strokeWidth={2.5}
            fill="url(#govGradient)"
            dot={{ fill: '#1D5F9E', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 5, fill: '#1D5F9E' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Info note */}
      <div className="flex items-start gap-1.5 mt-3 text-[10px] text-gov-gray-400">
        <Info size={10} className="shrink-0 mt-0.5" />
        Your competency profile is updated after assessments and learning activities.
      </div>
    </motion.div>
  );
}
