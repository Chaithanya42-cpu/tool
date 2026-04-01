import React from 'react';
import { useApp } from "../AppContext";
import { 
  MousePointer2, 
  DoorOpen, 
  ShoppingBasket, 
  CheckCircle2,
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
  Cell
} from 'recharts';

export default function PostClick() {
  const funnelData = [
    { name: 'Sent', value: 100, color: 'rgba(79,142,247,0.8)' },
    { name: 'Delivered', value: 94, color: 'rgba(79,142,247,0.7)' },
    { name: 'Opened', value: 24, color: 'rgba(79,142,247,0.6)' },
    { name: 'Clicked', value: 3.8, color: 'rgba(34,211,165,0.7)' },
    { name: 'Session', value: 2.6, color: 'rgba(34,211,165,0.6)' },
    { name: 'ATC', value: 1.68, color: 'rgba(249,160,63,0.7)' },
    { name: 'Purchase', value: 0.42, color: 'rgba(34,211,165,0.9)' },
  ];

  const hookData = [
    { label: 'Urgency/Scarcity', value: 22.4, color: 'var(--color-green)' },
    { label: 'Social Proof / UGC', value: 19.1, color: 'var(--color-accent)' },
    { label: 'Product Feature', value: 16.8, color: 'var(--color-accent)' },
    { label: 'Discount / Offer', value: 14.2, color: 'var(--color-orange)' },
    { label: 'Storytelling / Brand', value: 11.8, color: 'var(--color-orange)' },
    { label: 'Educational', value: 8.4, color: 'var(--color-red)' },
  ];

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Post-Click & Landing Page Signals</h2>
          <p className="text-xs text-text3">What happens after the click — session quality, bounce, ATC, and conversion</p>
        </div>
        <span className="tag tag-blue text-xs px-3 py-1">NEW MODULE</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Click → Session Rate" value="68.4%" delta="↓ -3.1% vs last period" icon={MousePointer2} color="green" />
        <KPICard label="Avg Bounce Rate" value="41.2%" delta="↑ +4.8% — Landing pages need review" icon={DoorOpen} color="red" />
        <KPICard label="ATC Rate (from CRM)" value="16.8%" delta="↑ +2.1% vs last period" icon={ShoppingBasket} color="orange" />
        <KPICard label="Purchase Rate (post-click)" value="4.2%" delta="Industry avg: 3.8%" icon={CheckCircle2} color="blue" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Funnel: Click → Purchase</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#8b91a8" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">ATC Rate by Creative Hook Type</h3>
          <div className="space-y-4">
            {hookData.map(hook => (
              <div key={hook.label} className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text2 font-medium">{hook.label}</span>
                  <span className="font-bold" style={{ color: hook.color }}>{hook.value}%</span>
                </div>
                <div className="h-1.5 bg-surface3 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${(hook.value / 25) * 100}%`, backgroundColor: hook.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-bold font-syne">Post-Click Performance by Campaign</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface2/30">
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Campaign</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Creative Hook</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Offer Type</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Lifecycle</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Click→Session</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Bounce Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">ATC Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Purchase Rate</th>
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider text-right">Rev/Click</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <PostClickRow name="Flash Sale Oct 14" hook="Urgency" offer="25% Off" life="Churn Risk" session="74%" bounce="38%" atc="21%" purchase="6.2%" rev="$4.80" />
              <PostClickRow name="New Arrivals Drop" hook="Product Feature" offer="No Offer" life="Active" session="68%" bounce="32%" atc="18%" purchase="4.8%" rev="$3.20" />
              <PostClickRow name="Review Request Flow" hook="Social Proof" offer="Loyalty Points" life="Active Buyer" session="61%" bounce="44%" atc="12%" purchase="3.1%" rev="$2.10" />
              <PostClickRow name="Win-Back Last Chance" hook="Urgency" offer="20% + Free Ship" life="Lapsed 180d" session="52%" bounce="58%" atc="9%" purchase="2.8%" rev="$1.90" />
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
    red: 'from-red'
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
        delta.includes('↑') && color === 'red' ? "text-red" : delta.includes('↓') && color === 'green' ? "text-red" : "text-green"
      )}>{delta}</div>
    </div>
  );
}

function PostClickRow({ name, hook, offer, life, session, bounce, atc, purchase, rev }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors text-[11px]">
      <td className="px-4 py-3 font-bold text-text">{name}</td>
      <td className="px-4 py-3">
        <span className={cn(
          "tag",
          hook === 'Urgency' ? "tag-red" : hook === 'Product Feature' ? "tag-blue" : "tag-purple"
        )}>{hook}</span>
      </td>
      <td className="px-4 py-3 text-text2">{offer}</td>
      <td className="px-4 py-3">
        <span className="tag tag-gray">{life}</span>
      </td>
      <td className="px-4 py-3 text-green font-medium">{session}</td>
      <td className={cn("px-4 py-3 font-medium", parseInt(bounce) > 50 ? "text-red" : "text-orange")}>{bounce}</td>
      <td className="px-4 py-3 text-accent font-medium">{atc}</td>
      <td className="px-4 py-3 text-green font-bold">{purchase}</td>
      <td className="px-4 py-3 text-right font-bold text-green">{rev}</td>
    </tr>
  );
}
