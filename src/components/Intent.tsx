import React from 'react';
import { useApp } from "../AppContext";
import { 
  Crosshair, 
  Mail, 
  MessageSquare, 
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Intent() {
  const intentMixData = [
    { name: 'Conversion', value: 40, color: '#f4506b' },
    { name: 'Retention', value: 15, color: '#f9a03f' },
    { name: 'Consideration', value: 20, color: '#22d3a5' },
    { name: 'Awareness', value: 12, color: '#4f8ef7' },
    { name: 'Winback', value: 8, color: '#fcd34d' },
    { name: 'Education', value: 5, color: '#7b5ea7' },
  ];

  const intentPerformData = [
    { name: 'Awareness', revenue: 8.4, ctr: 1.4 },
    { name: 'Education', revenue: 5.2, ctr: 2.1 },
    { name: 'Consideration', revenue: 14.8, ctr: 3.8 },
    { name: 'Conversion', revenue: 48.2, ctr: 4.8 },
    { name: 'Retention', revenue: 18.6, ctr: 3.2 },
    { name: 'Winback', revenue: 6.8, ctr: 2.8 },
  ];

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Intent Classification & Analysis</h2>
          <p className="text-xs text-text3">Campaign performance segmented by strategic intent</p>
        </div>
        <span className="tag tag-blue text-xs px-3 py-1">NEW MODULE</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Intent Mix Distribution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={intentMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {intentMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 card">
          <h3 className="text-sm font-bold font-syne mb-4">Revenue & CTR by Intent Category</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intentPerformData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#4f8ef7" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#22d3a5" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar yAxisId="left" name="Revenue ($K)" dataKey="revenue" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" name="Avg CTR %" dataKey="ctr" fill="#22d3a5" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-bold font-syne">Intent Performance Benchmarks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface2/30">
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Intent Type</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider"># Campaigns</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Avg Open Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Avg CTR</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Avg ATC Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Total Revenue</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Avg Unsub Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Top Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <IntentRow type="awareness" count={6} open="32.1%" ctr="1.4%" atc="6.2%" rev="$8,400" unsub="0.08%" channel="Email" />
              <IntentRow type="education" count={4} open="28.4%" ctr="2.1%" atc="8.8%" rev="$5,200" unsub="0.10%" channel="WhatsApp" />
              <IntentRow type="consideration" count={5} open="24.8%" ctr="3.8%" atc="14.2%" rev="$14,800" unsub="0.14%" channel="Email" />
              <IntentRow type="conversion" count={12} open="21.2%" ctr="4.8%" atc="19.1%" rev="$48,200" unsub="0.42%" channel="WhatsApp" />
              <IntentRow type="retention" count={7} open="26.4%" ctr="3.2%" atc="11.4%" rev="$18,600" unsub="0.16%" channel="Email" />
              <IntentRow type="winback" count={3} open="18.8%" ctr="2.8%" atc="9.2%" rev="$6,800" unsub="0.28%" channel="Email" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IntentRow({ type, count, open, ctr, atc, rev, unsub, channel }: any) {
  const getIcon = (ch: string) => ch === 'Email' ? <Mail className="w-3 h-3 text-accent" /> : <MessageSquare className="w-3 h-3 text-green" />;
  
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-4 py-3">
        <span className={cn("tag capitalize", `intent-${type}`)}>{type}</span>
      </td>
      <td className="px-4 py-3 text-[11px] text-text2">{count}</td>
      <td className="px-4 py-3 text-[11px] text-text2">{open}</td>
      <td className="px-4 py-3 text-[11px] text-text2">{ctr}</td>
      <td className="px-4 py-3 text-[11px] text-text2">{atc}</td>
      <td className="px-4 py-3 text-[11px] font-bold text-text">{rev}</td>
      <td className={cn("px-4 py-3 text-[11px] font-medium", unsub.includes('0.4') ? "text-red" : "text-green")}>
        {unsub}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] text-text2">
          {getIcon(channel)}
          {channel}
        </div>
      </td>
    </tr>
  );
}
