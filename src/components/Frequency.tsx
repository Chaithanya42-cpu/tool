import React from 'react';
import { useApp } from "../AppContext";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  SlidersHorizontal,
  Info,
  AlertCircle
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
  Legend
} from 'recharts';

export default function Frequency() {
  const freqEngageData = [
    { name: '1/wk', open: 34, unsub: 0.05 },
    { name: '2/wk', open: 31, unsub: 0.08 },
    { name: '3/wk', open: 28, unsub: 0.14 },
    { name: '4/wk', open: 24, unsub: 0.22 },
    { name: '5/wk', open: 20, unsub: 0.34 },
    { name: '6/wk', open: 16, unsub: 0.52 },
    { name: '7+/wk', open: 12, unsub: 0.82 },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const times = ['6a', '9a', '12p', '3p', '6p', '9p', '12a', '3a'];
  const heatmapData = [
    [10, 28, 22, 18, 12, 8, 4, 2],
    [12, 32, 26, 20, 14, 6, 3, 1],
    [8, 24, 30, 22, 16, 10, 5, 2],
    [14, 36, 28, 24, 18, 8, 4, 2],
    [16, 30, 24, 20, 14, 8, 6, 3],
    [6, 14, 18, 16, 22, 18, 8, 4],
    [4, 8, 12, 14, 18, 24, 10, 5],
  ];

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Frequency & Fatigue Analysis</h2>
          <p className="text-xs text-text3">Monitor send pressure, engagement decay, and optimal cadence by segment</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KPICard label="Avg Msgs / User / Week" value="3.2" delta="↑ +0.4 vs last month · Near limit" icon={Bell} color="orange" />
        <KPICard label="Email / Week" value="2.1" delta="Recommended: ≤ 2.5" icon={Mail} color="blue" />
        <KPICard label="WhatsApp / Week" value="1.1" delta="Recommended: ≤ 1.5" icon={MessageSquare} color="green" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Engagement vs Frequency (Email)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={freqEngageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#4f8ef7" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#f4506b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line yAxisId="left" name="Open Rate %" type="monotone" dataKey="open" stroke="#4f8ef7" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="right" name="Unsub Rate %" type="monotone" dataKey="unsub" stroke="#f4506b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Send Timing Heatmap</h3>
          <div className="grid grid-cols-[auto_repeat(8,1fr)] gap-1">
            <div className="h-6" />
            {times.map(t => (
              <div key={t} className="text-[9px] text-text3 text-center font-bold">{t}</div>
            ))}
            {days.map((day, di) => (
              <>
                <div key={day} className="text-[9px] text-text3 font-bold flex items-center pr-2">{day}</div>
                {heatmapData[di].map((v, ti) => {
                  const intensity = v / 36;
                  return (
                    <div 
                      key={`${di}-${ti}`}
                      className={cn(
                        "h-8 rounded-md transition-all cursor-help border border-transparent hover:border-white/20",
                        v > 28 && "border-accent/30"
                      )}
                      style={{ backgroundColor: `rgba(79,142,247,${intensity})` }}
                      title={`${v}% engagement`}
                    />
                  );
                })}
              </>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-accent/10" />
              <span className="text-[10px] text-text3 font-bold uppercase">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-accent" />
              <span className="text-[10px] text-text3 font-bold uppercase">High Engagement</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-bold font-syne">Segment-Level Frequency Report</h3>
            <p className="text-[11px] text-text3">Avg messages per user per week by segment</p>
          </div>
          <button className="btn btn-primary btn-sm">
            <SlidersHorizontal className="w-3 h-3" />
            Set Frequency Caps
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface2/30">
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Segment</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Email/Wk</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">WA/Wk</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Total/Wk</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Unsub Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Fatigue Status</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <FrequencyRow segment="VIP Buyers" size="2,840" email={2.8} wa={1.2} total={4.3} unsub={0.52} status="HIGH" cap="3/wk" />
              <FrequencyRow segment="Active Buyers" size="8,210" email={2.1} wa={1.0} total={3.3} unsub={0.28} status="MED" cap="4/wk" />
              <FrequencyRow segment="Browse-Only" size="14,500" email={1.8} wa={0.4} total={2.3} unsub={0.18} status="LOW" cap="4/wk" />
              <FrequencyRow segment="Lapsed (90d+)" size="6,100" email={1.2} wa={0.2} total={1.4} unsub={0.09} status="SAFE" cap="2/wk" />
            </tbody>
          </table>
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

function FrequencyRow({ segment, size, email, wa, total, unsub, status, cap }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-4 py-3 text-xs font-bold text-text">{segment}</td>
      <td className="px-4 py-3 text-[11px] text-text2">{size}</td>
      <td className="px-4 py-3 text-[11px] text-text2">{email}</td>
      <td className="px-4 py-3 text-[11px] text-text2">{wa}</td>
      <td className="px-4 py-3 text-[11px] font-bold text-text">{total}</td>
      <td className={cn("px-4 py-3 text-[11px] font-medium", unsub > 0.4 ? "text-red" : unsub > 0.2 ? "text-orange" : "text-green")}>
        {unsub}%
      </td>
      <td className="px-4 py-3">
        <span className={cn(
          "tag",
          status === 'HIGH' ? "tag-red" : status === 'MED' ? "tag-orange" : "tag-green"
        )}>
          {status === 'HIGH' && <AlertCircle className="w-2.5 h-2.5 mr-1" />}
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <select className="bg-surface2 border border-white/10 rounded px-2 py-1 text-[10px] outline-none">
          <option>{cap}</option>
          <option>5/wk</option>
          <option>3/wk</option>
          <option>1/wk</option>
        </select>
      </td>
    </tr>
  );
}
