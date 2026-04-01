import React from 'react';
import { useApp } from "../AppContext";
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Legend
} from 'recharts';
import { ShoppingCart, Percent, Clock, Tag, AlertTriangle, Zap } from 'lucide-react';

export default function Overview() {
  const { activeBrand } = useApp();

  const revenueData = [
    { name: 'Email', value: 45000 },
    { name: 'WhatsApp', value: 18000 },
    { name: 'SMS', value: 8000 },
    { name: 'Push', value: 2000 },
  ];

  const intentData = [
    { subject: 'Awareness', A: 15, fullMark: 100 },
    { subject: 'Education', A: 10, fullMark: 100 },
    { subject: 'Consideration', A: 20, fullMark: 100 },
    { subject: 'Conversion', A: 40, fullMark: 100 },
    { subject: 'Retention', A: 10, fullMark: 100 },
    { subject: 'Winback', A: 5, fullMark: 100 },
  ];

  const trendData = [
    { name: 'W1', email: 8200, wa: 3200 },
    { name: 'W2', email: 9100, wa: 4100 },
    { name: 'W3', email: 7800, wa: 3600 },
    { name: 'W4', email: 11200, wa: 5200 },
    { name: 'W5', email: 10400, wa: 4800 },
    { name: 'W6', email: 12800, wa: 6100 },
    { name: 'W7', email: 11600, wa: 5800 },
    { name: 'W8', email: 14200, wa: 7200 },
  ];

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="bg-orange/10 border border-orange/20 rounded-lg p-3 flex items-center gap-3 text-xs text-orange">
        <AlertTriangle className="w-4 h-4" />
        <div>
          <strong>Frequency Alert:</strong> Email avg 4.1/week — approaching fatigue threshold. Consider suppressing low-engagers.
        </div>
        <button className="btn btn-ghost btn-sm ml-auto">View Fatigue Report →</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard 
          label="Avg Order Value" 
          value={`$${activeBrand.aovMin}-${activeBrand.aovMax}`} 
          delta="↑ +$8.20 vs last month" 
          icon={ShoppingCart} 
          color="blue" 
        />
        <KPICard 
          label="CRM Revenue %" 
          value="38.4%" 
          delta="Target: 40% · Gap: 1.6pts" 
          icon={Percent} 
          color="green" 
        />
        <KPICard 
          label="Purchase Cycle" 
          value={`${activeBrand.purchaseCycle} Days`} 
          delta="↓ -2 days vs last month" 
          icon={Clock} 
          color="orange" 
        />
        <KPICard 
          label="Discount Sensitivity" 
          value={activeBrand.discountSensitivity.toUpperCase()} 
          delta="42% of revenue driven by discounts" 
          icon={Tag} 
          color="purple" 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold font-syne">Revenue by Channel</h3>
              <p className="text-[11px] text-text3">CRM revenue split across channels this period</p>
            </div>
            <select className="bg-surface2 border border-white/10 rounded px-2 py-1 text-[10px] outline-none">
              <option>Revenue</option>
              <option>Orders</option>
              <option>Customers</option>
            </select>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#e8eaf0', fontSize: '12px' }}
                />
                <Bar dataKey="value" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="mb-4">
            <h3 className="text-sm font-bold font-syne">Campaign Intent Mix</h3>
            <p className="text-[11px] text-text3">Distribution of campaign goals this period</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={intentData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" stroke="#8b91a8" fontSize={10} />
                <Radar name="Mix" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Revenue Trend (Weekly)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="email" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="wa" stroke="var(--color-green)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold font-syne">Business Model Profile</h3>
              <p className="text-[11px] text-text3">Key brand DNA signals</p>
            </div>
            <button className="btn btn-ghost btn-sm">Edit Profile</button>
          </div>
          
          <div className="space-y-4 flex-1">
            <ProgressBar label="Email" value={activeBrand.channelMix.email} color="var(--color-accent)" />
            <ProgressBar label="WhatsApp" value={activeBrand.channelMix.wa} color="var(--color-green)" />
            <ProgressBar label="SMS" value={activeBrand.channelMix.sms} color="var(--color-orange)" />
            
            <div className="pt-4 border-t border-white/5 grid grid-cols-3 text-center gap-2">
              <div>
                <div className="text-[10px] text-text3 uppercase font-bold tracking-wider">Model</div>
                <div className="text-sm font-bold text-accent mt-1">{activeBrand.model}</div>
              </div>
              <div>
                <div className="text-[10px] text-text3 uppercase font-bold tracking-wider">Top Category</div>
                <div className="text-sm font-bold mt-1">{activeBrand.categories[0]}</div>
              </div>
              <div>
                <div className="text-[10px] text-text3 uppercase font-bold tracking-wider">AOV Band</div>
                <div className="text-sm font-bold text-green mt-1">${activeBrand.aovMin}-${activeBrand.aovMax}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-bold font-syne">🤖 AI-Generated Insights</h3>
            <p className="text-[11px] text-text3">Automated analysis of your CRM performance</p>
          </div>
          <button className="btn btn-primary btn-sm">
            <Zap className="w-3 h-3" />
            Refresh Insights
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <InsightChip 
            type="warning" 
            text="<strong>Unsub spike detected</strong> on 25% discount campaigns. Churn-risk segment showing 0.8% unsub rate — 2.5x brand average. Consider value-led messaging instead of blanket discounts." 
          />
          <InsightChip 
            type="success" 
            text="<strong>Win-back flow outperforming</strong> — 180-day lapsed segment CTR at 4.2% vs 2.1% campaign average. Increase cadence from 3 to 5 emails over 30 days." 
          />
          <InsightChip 
            type="info" 
            text="<strong>WhatsApp shows highest ATC rate</strong> at 21% vs Email 14%. Opportunity to shift more conversion campaigns to WA channel for top products." 
          />
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

function ProgressBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-medium">
        <span className="text-text2">{label}</span>
        <span className="text-text">{value}%</span>
      </div>
      <div className="h-1.5 bg-surface3 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000" 
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function InsightChip({ type, text }: { type: 'warning' | 'success' | 'info', text: string }) {
  const icons = {
    warning: '⚠️',
    success: '✅',
    info: '💡'
  };
  return (
    <div className="bg-surface2 border border-white/5 rounded-xl p-4 flex gap-3 items-start hover:border-white/10 transition-colors">
      <span className="text-lg mt-0.5">{icons[type]}</span>
      <p className="text-[12.5px] leading-relaxed text-text2" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
