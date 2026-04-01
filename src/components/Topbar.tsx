import { useApp } from "../AppContext";
import { Search, Download, RefreshCw, Bell } from "lucide-react";

interface TopbarProps {
  activePage: string;
}

export default function Topbar({ activePage }: TopbarProps) {
  const pageTitles: Record<string, string> = {
    overview: 'Overview',
    campaigns: 'Campaign Deep Dive',
    flows: 'Journey & Flows',
    retention: 'Retention & Cohorts',
    frequency: 'Frequency & Fatigue',
    intent: 'Intent Analysis',
    postclick: 'Post-Click Signals',
    abtests: 'A/B Test History',
    creative: 'Creative Library',
    brandsetup: 'Brand Profile',
    datainput: 'Data Upload'
  };

  return (
    <header className="h-16 bg-surface border-b border-white/5 flex items-center px-6 gap-3 flex-shrink-0">
      <div className="text-lg font-bold font-syne flex-1">{pageTitles[activePage] || activePage}</div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface2 border border-white/10 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          <select className="bg-transparent text-xs font-medium outline-none cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 60 Days</option>
            <option>Last 90 Days</option>
            <option>Custom Range</option>
          </select>
        </div>

        <select className="bg-surface2 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium outline-none cursor-pointer">
          <option>All Channels</option>
          <option>Email</option>
          <option>WhatsApp</option>
          <option>SMS</option>
          <option>Push</option>
        </select>

        <select className="bg-surface2 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium outline-none cursor-pointer">
          <option>vs Previous Period</option>
          <option>vs Industry Avg</option>
          <option>vs Target</option>
        </select>
      </div>

      <div className="flex items-center gap-2 ml-2">
        <button className="btn btn-ghost">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
        <button className="btn btn-primary">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>
    </header>
  );
}
