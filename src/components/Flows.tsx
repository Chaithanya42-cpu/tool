import React from 'react';
import { useApp } from "../AppContext";
import { 
  Plus, 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

export default function Flows() {
  const { flows } = useApp();

  const flowShareData = flows.map(f => ({ name: f.name, value: f.revenue }));
  const COLORS = ['#4f8ef7', '#22d3a5', '#7b5ea7', '#f9a03f', '#f4506b'];

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Journey & Flows Analytics</h2>
          <p className="text-xs text-text3">Automated flow performance — revenue, conversion rates, and health signals</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Flow
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-3">
          {flows.map(flow => (
            <div 
              key={flow.id} 
              className="card bg-surface2/50 border-white/5 hover:border-white/10 hover:bg-surface2 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <GitBranch className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-text group-hover:text-accent transition-colors">{flow.name}</div>
                      <div className="text-[11px] text-text3">{flow.meta}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className={cn(
                      "tag",
                      flow.status === 'Active' ? "tag-green" : "tag-orange"
                    )}>{flow.status}</span>
                    {flow.tags.map(tag => (
                      <span key={tag} className="tag tag-blue">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-extrabold font-syne text-green">${flow.revenue.toLocaleString()}</div>
                  <div className="text-[11px] text-text2 font-medium">
                    Conv: <span className="text-text">{flow.convRate}%</span> · Open: <span className="text-text">{flow.openRate}%</span>
                  </div>
                  <div className="text-[10px] text-text3">
                    ATC: {flow.atcRate}% · CTR: {flow.ctr}%
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full py-4 rounded-xl border-2 border-dashed border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all text-text3 hover:text-accent flex flex-col items-center gap-2">
            <Plus className="w-6 h-6" />
            <div className="text-sm font-bold">Add New Flow</div>
            <p className="text-[10px]">Post-purchase, replenishment, loyalty, etc.</p>
          </button>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Flow Revenue Share</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={flowShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {flowShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Flow Health Scores</h3>
            <div className="space-y-4">
              <HealthScore label="Abandoned Cart" score={92} color="var(--color-green)" />
              <HealthScore label="Welcome Series" score={88} color="var(--color-green)" />
              <HealthScore label="Browse Abandonment" score={74} color="var(--color-accent)" />
              <HealthScore label="Win-Back" score={58} color="var(--color-orange)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthScore({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-text2 font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-1.5 bg-surface3 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000" 
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
