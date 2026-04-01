import React from 'react';
import { useApp } from "../AppContext";
import { 
  CalendarCheck, 
  Calendar, 
  CalendarDays, 
  RotateCcw,
  Edit3
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export default function Retention() {
  const { activeBrand } = useApp();

  const cohorts = [
    { month: 'Jan 2024', size: '3,210', data: [100, 28, 19, 14, 11, 8] },
    { month: 'Feb 2024', size: '4,080', data: [100, 31, 22, 16, 13, 10] },
    { month: 'Mar 2024', size: '5,140', data: [100, 26, 17, 12, 9, 7] },
    { month: 'Apr 2024', size: '4,420', data: [100, 33, 24, 18, 14, 11] },
    { month: 'May 2024', size: '6,800', data: [100, 29, 20, 15, 12, null] },
    { month: 'Jun 2024', size: '7,200', data: [100, 34, 23, 17, null, null] },
  ];

  const curveData = [
    { name: 'Day 1', current: 100, industry: 100 },
    { name: 'Day 7', current: 52, industry: 48 },
    { name: 'Day 14', current: 32, industry: 28 },
    { name: 'Day 30', current: 18.4, industry: 16 },
    { name: 'Day 60', current: 12.1, industry: 10 },
    { name: 'Day 90', current: 8.9, industry: 7.2 },
  ];

  const freqDistData = [
    { name: '1x', value: 4200 },
    { name: '2x', value: 8100 },
    { name: '3x', value: 6800 },
    { name: '4x', value: 3400 },
    { name: '5x', value: 1800 },
    { name: '6x+', value: 900 },
  ];

  const getCohortColor = (val: number | null) => {
    if (val === null || val === 100) return '';
    if (val >= 25) return 'bg-green/20 text-green';
    if (val >= 15) return 'bg-accent/20 text-accent';
    if (val >= 10) return 'bg-orange/15 text-orange';
    return 'bg-red/10 text-red';
  };

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Retention & Cohort Analysis</h2>
          <p className="text-xs text-text3">Customer lifecycle, repeat purchase behavior, and cohort-level trends</p>
        </div>
        <select className="bg-surface2 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium outline-none cursor-pointer">
          <option>Monthly Cohorts</option>
          <option>Weekly Cohorts</option>
          <option>Acquisition Source</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard label="30-Day Retention" value="18.4%" delta="↑ +1.2% vs last quarter" icon={CalendarCheck} color="blue" />
        <KPICard label="60-Day Retention" value="12.1%" delta="Industry avg: 10.8%" icon={Calendar} color="purple" />
        <KPICard label="90-Day Retention" value="8.9%" delta="↑ +0.7% QoQ" icon={CalendarDays} color="green" />
        <KPICard label="Repeat Purchase %" value="32.1%" delta="Model avg: 28% ↑" icon={RotateCcw} color="orange" />
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-bold font-syne">Customer Lifecycle Distribution</h3>
            <p className="text-[11px] text-text3">Click a segment to filter cohort data below</p>
          </div>
          <button className="btn btn-ghost btn-sm">
            <Edit3 className="w-3 h-3" />
            Edit %
          </button>
        </div>
        
        <div className="h-14 flex gap-0.5 rounded-xl overflow-hidden">
          <LifecycleSeg label="ACTIVE" value={activeBrand.lifecycleDistribution.active} color="from-[#22d3a5] to-[#0fa374]" />
          <LifecycleSeg label="AT RISK" value={activeBrand.lifecycleDistribution.atRisk} color="from-[#fcd34d] to-[#f59e0b]" />
          <LifecycleSeg label="SNOOZED" value={activeBrand.lifecycleDistribution.snoozed} color="from-[#f9a03f] to-[#d97706]" />
          <LifecycleSeg label="LOST" value={activeBrand.lifecycleDistribution.lost} color="from-[#f4506b] to-[#c2001e]" />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-bold font-syne">Monthly Cohort Retention Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface2/30">
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Cohort</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Size</th>
                {[1, 2, 3, 4, 5, 6].map(m => (
                  <th key={m} className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider text-center">Month {m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cohorts.map((c, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-text">{c.month}</td>
                  <td className="px-4 py-3 text-[11px] text-text2">{c.size}</td>
                  {c.data.map((v, i) => (
                    <td key={i} className="px-1 py-1.5">
                      <div className={cn(
                        "h-8 flex items-center justify-center rounded-lg text-[11px] font-bold",
                        getCohortColor(v)
                      )}>
                        {v === null ? '—' : i === 0 ? 'Base' : `${v}%`}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Retention Curve (30/60/90)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line name="This Period" type="monotone" dataKey="current" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line name="Industry Avg" type="monotone" dataKey="industry" stroke="rgba(255,255,255,0.2)" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Repeat Purchase Frequency Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={freqDistData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="var(--color-accent)" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, delta, icon: Icon, color }: { label: string, value: string, delta: string, icon: any, color: string }) {
  const colors: Record<string, string> = {
    blue: 'from-accent',
    green: 'from-green',
    orange: 'from-orange',
    purple: 'from-accent2'
  };

  return (
    <div className={cn(
      "card relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer",
      "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:to-transparent",
      `before:${colors[color]}`
    )}>
      <Icon className="absolute right-4 top-4 w-6 h-6 opacity-10 group-hover:opacity-20 transition-opacity" />
      <div className="text-[10px] font-bold tracking-wider text-text3 uppercase">{label}</div>
      <div className="text-2xl font-extrabold font-syne my-1.5">{value}</div>
      <div className={cn(
        "text-[11px]",
        delta.includes('↑') || delta.includes('↓') ? "text-green" : "text-text3"
      )}>{delta}</div>
    </div>
  );
}

function LifecycleSeg({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div 
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:opacity-90 transition-opacity bg-gradient-to-br",
        color
      )}
      style={{ flex: value / 25 }}
    >
      <span className="text-sm font-extrabold font-syne text-white">{value}%</span>
      <span className="text-[9px] font-bold text-white/80">{label}</span>
    </div>
  );
}
