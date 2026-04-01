import { useApp } from "../AppContext";
import { cn } from "../lib/utils";
import { 
  LineChart, 
  Megaphone, 
  GitBranch, 
  RotateCcw, 
  Bell, 
  Crosshair, 
  MousePointer2, 
  FlaskConical, 
  Paintbrush, 
  Building2, 
  Upload,
  ChevronDown
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  openBrandModal: () => void;
}

export default function Sidebar({ activePage, setActivePage, openBrandModal }: SidebarProps) {
  const { activeBrand } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LineChart, section: 'Core Analytics' },
    { id: 'campaigns', label: 'Campaign Deep Dive', icon: Megaphone, section: 'Core Analytics', badge: '3 alerts', badgeType: 'alert' },
    { id: 'flows', label: 'Journey & Flows', icon: GitBranch, section: 'Core Analytics' },
    { id: 'retention', label: 'Retention & Cohorts', icon: RotateCcw, section: 'Core Analytics' },
    { id: 'frequency', label: 'Frequency & Fatigue', icon: Bell, section: 'Core Analytics' },
    
    { id: 'intent', label: 'Intent Analysis', icon: Crosshair, section: 'Intelligence', badge: 'NEW', badgeType: 'new' },
    { id: 'postclick', label: 'Post-Click Signals', icon: MousePointer2, section: 'Intelligence', badge: 'NEW', badgeType: 'new' },
    { id: 'abtests', label: 'A/B Test History', icon: FlaskConical, section: 'Intelligence' },
    { id: 'creative', label: 'Creative Library', icon: Paintbrush, section: 'Intelligence' },
    
    { id: 'brandsetup', label: 'Brand Profile', icon: Building2, section: 'Setup' },
    { id: 'datainput', label: 'Data Upload', icon: Upload, section: 'Setup' },
  ];

  const sections = ['Core Analytics', 'Intelligence', 'Setup'];

  return (
    <aside className="w-60 bg-surface border-r border-white/5 flex flex-col flex-shrink-0 relative z-50 h-screen overflow-hidden">
      <div className="p-5 pb-3.5 border-b border-white/5">
        <div className="font-syne text-base font-extrabold tracking-tight bg-gradient-to-br from-accent to-accent2 bg-clip-text text-transparent">
          BRAND INTELLIGENCE
        </div>
        <div className="text-[10px] text-text3 tracking-[1.5px] uppercase mt-0.5 font-medium">
          PRO SUITE v2.0
        </div>
      </div>

      <div 
        className="p-2.5 mx-3.5 mt-2.5 mb-1 bg-surface2 border border-white/10 rounded-xl cursor-pointer flex items-center justify-between hover:border-white/20 transition-colors"
        onClick={openBrandModal}
      >
        <div>
          <div className="text-xs font-semibold text-text">{activeBrand.name}</div>
          <div className="text-[10px] text-text2 truncate max-w-[140px]">{activeBrand.type}</div>
        </div>
        <ChevronDown className="w-3 h-3 text-text3" />
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 py-1.5 space-y-4">
        {sections.map(section => (
          <div key={section}>
            <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-text3 px-2.5 py-2.5 pb-1">
              {section}
            </div>
            <div className="space-y-0.5">
              {navItems.filter(item => item.section === section).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                    activePage === item.id 
                      ? "bg-accent/10 text-accent border border-accent/20" 
                      : "text-text2 hover:bg-surface2 hover:text-text border border-transparent"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded-full font-bold",
                      item.badgeType === 'alert' ? "bg-red/20 text-red" : "bg-accent/20 text-accent"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5 space-y-2">
        <HealthBar label="CRM Health" value={72} color="var(--color-green)" />
        <HealthBar label="Deliverability" value={89} color="var(--color-accent)" />
        <HealthBar label="Fatigue Risk" value={58} color="var(--color-orange)" labelValue="MED" />
      </div>
    </aside>
  );
}

function HealthBar({ label, value, color, labelValue }: { label: string, value: number, color: string, labelValue?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[9px] uppercase tracking-wider text-text3 font-bold">{label}</span>
        <span className="text-[10px] font-bold" style={{ color }}>{labelValue || `${value}%`}</span>
      </div>
      <div className="h-1 bg-surface3 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500" 
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
