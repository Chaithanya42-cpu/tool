import { useApp } from "../AppContext";
import { 
  FlaskConical, 
  Plus, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ABTests() {
  const { abTests } = useApp();

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">A/B Test History & Results</h2>
          <p className="text-xs text-text3">Complete record of split tests with statistical significance</p>
        </div>
        <button className="btn btn-primary">
          <FlaskConical className="w-4 h-4" />
          Log New Test
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KPICard label="Tests Run (All Time)" value="24" icon={FlaskConical} color="green" />
        <KPICard label="Win Rate (A wins)" value="54%" icon={CheckCircle2} color="blue" />
        <KPICard label="Avg Uplift (Winner)" value="+18.4%" icon={TrendingUp} color="orange" />
      </div>

      <div className="card space-y-6">
        <h3 className="text-sm font-bold font-syne">A/B Test Log</h3>
        
        <ABTestCard 
          title="Subject Line Test — Flash Sale"
          meta="Oct 2024 · Email · Conversion Intent · n=8,400"
          status="Significant (p < 0.05)"
          statusType="success"
          variantA={{ label: 'VARIANT A', value: 24.2, text: '"Last chance: 25% off ends tonight"' }}
          variantB={{ label: 'VARIANT B 🏆', value: 31.8, text: '"Your cart is about to disappear 👀"', winner: true }}
          result="Result: +31.4% open rate uplift. Apply winner subject line template going forward."
        />

        <ABTestCard 
          title="Send Time Test — Win-Back Flow"
          meta="Sep 2024 · Email · Winback Intent · n=5,200"
          status="Borderline (p = 0.08)"
          statusType="warning"
          variantA={{ label: 'VARIANT A', value: 2.4, text: 'Send: 10am Tuesday' }}
          variantB={{ label: 'VARIANT B', value: 2.9, text: 'Send: 7pm Thursday' }}
          result="Not statistically significant. Run larger test (n=10,000+) to confirm."
        />

        <button className="btn btn-ghost w-full justify-center py-3 border-dashed">
          <Plus className="w-4 h-4" />
          Log New A/B Test
        </button>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="card flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center",
        color === 'green' ? "bg-green/10 text-green" : color === 'blue' ? "bg-accent/10 text-accent" : "bg-orange/10 text-orange"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-text3 uppercase tracking-wider">{label}</div>
        <div className="text-xl font-extrabold font-syne">{value}</div>
      </div>
    </div>
  );
}

function ABTestCard({ title, meta, status, statusType, variantA, variantB, result }: any) {
  return (
    <div className="bg-surface2 border border-white/5 rounded-xl p-5 space-y-5">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-text">{title}</div>
          <div className="text-[11px] text-text3 mt-0.5">{meta}</div>
        </div>
        <span className={cn(
          "tag",
          statusType === 'success' ? "tag-green" : "tag-orange"
        )}>
          {statusType === 'success' ? '✓ ' : '⏳ '}{status}
        </span>
      </div>

      <div className="space-y-4">
        <VariantRow label={variantA.label} value={variantA.value} text={variantA.text} color="accent" />
        <VariantRow label={variantB.label} value={variantB.value} text={variantB.text} color={variantB.winner ? "green" : "orange"} winner={variantB.winner} />
      </div>

      <div className={cn(
        "text-[11px] font-medium p-3 rounded-lg",
        statusType === 'success' ? "bg-green/5 text-green" : "bg-orange/5 text-orange"
      )}>
        {result}
      </div>
    </div>
  );
}

function VariantRow({ label, value, text, color, winner }: any) {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr] gap-4 items-center">
      <div className={cn("text-[10px] font-bold tracking-wider", winner ? "text-green" : "text-text3")}>{label}</div>
      <div className="h-6 bg-surface3 rounded overflow-hidden relative">
        <div 
          className={cn("h-full transition-all duration-1000 flex items-center px-2 text-[10px] font-bold text-white", `bg-${color}`)}
          style={{ width: `${value * 2}%` }}
        >
          {label.includes('OR') ? 'OR' : 'CTR'}: {value}%
        </div>
      </div>
      <div className="text-[11px] text-text2 text-right italic">{text}</div>
    </div>
  );
}
