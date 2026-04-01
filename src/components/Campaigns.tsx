import React, { useState, useMemo } from 'react';
import { useApp } from "../AppContext";
import { 
  Search, 
  Plus, 
  Eye, 
  Copy, 
  ArrowUpDown, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Bell,
  Filter
} from 'lucide-react';
import { Campaign, Intent } from '../types';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

export default function Campaigns() {
  const { campaigns } = useApp();
  const [activeIntent, setActiveIntent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Campaign, direction: 'asc' | 'desc' } | null>(null);

  const intents: { id: string, label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'awareness', label: 'Awareness' },
    { id: 'education', label: 'Education' },
    { id: 'consideration', label: 'Consideration' },
    { id: 'conversion', label: 'Conversion' },
    { id: 'retention', label: 'Retention' },
    { id: 'winback', label: 'Winback' },
  ];

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      const matchesIntent = activeIntent === 'all' || c.intent === activeIntent;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.seg.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesIntent && matchesSearch;
    }).sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [campaigns, activeIntent, searchQuery, sortConfig]);

  const intentRevData = useMemo(() => {
    const data: Record<string, number> = {};
    campaigns.forEach(c => {
      data[c.intent] = (data[c.intent] || 0) + c.revenue;
    });
    return Object.entries(data).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  }, [campaigns]);

  const ctrChannelData = [
    { name: 'Email', avg: 3.2, top: 5.4 },
    { name: 'WhatsApp', avg: 5.8, top: 8.2 },
    { name: 'SMS', avg: 2.4, top: 4.1 },
    { name: 'Push', avg: 1.8, top: 3.2 },
  ];

  const handleSort = (key: keyof Campaign) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-3.5 h-3.5 text-accent" />;
      case 'wa': return <MessageSquare className="w-3.5 h-3.5 text-green" />;
      case 'sms': return <Smartphone className="w-3.5 h-3.5 text-orange" />;
      case 'push': return <Bell className="w-3.5 h-3.5 text-purple" />;
      default: return null;
    }
  };

  const [draggedSegment, setDraggedSegment] = useState<string | null>(null);

  const segments = useMemo(() => {
    const s = new Set<string>();
    campaigns.forEach(c => s.add(c.seg));
    return Array.from(s);
  }, [campaigns]);

  const onDragStart = (seg: string) => {
    setDraggedSegment(seg);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedSegment) {
      setSearchQuery(draggedSegment);
      setDraggedSegment(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Campaign Deep Dive</h2>
          <p className="text-xs text-text3">Full performance breakdown with intent, post-click, and revenue attribution</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Campaign
        </button>
      </div>

      <div className="grid grid-cols-[200px_1fr] gap-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-[10px] font-bold text-text3 uppercase tracking-wider mb-3">Filter by Segment</h3>
            <div className="space-y-1.5">
              {segments.map(seg => (
                <div
                  key={seg}
                  draggable
                  onDragStart={() => onDragStart(seg)}
                  className="px-3 py-2 bg-surface2 border border-white/5 rounded-lg text-[11px] font-medium cursor-grab active:cursor-grabbing hover:border-accent/30 hover:text-accent transition-all"
                >
                  {seg}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-text3 mt-3 italic">Drag a segment onto the table to filter</p>
          </div>
        </div>

        <div className="space-y-6" onDrop={onDrop} onDragOver={onDragOver}>
          <div className="bg-red/10 border border-red/20 rounded-lg p-3 flex items-center gap-3 text-xs text-red">
            <div className="w-2 h-2 rounded-full bg-red animate-pulse" />
            <strong>3 campaigns</strong> flagged for high unsubscribe rate (&gt;0.5%). Review urgently.
            <button className="btn btn-ghost btn-sm ml-auto text-red border-red/20 hover:bg-red/10">View Flagged →</button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-text3 uppercase tracking-wider mr-2">Intent:</span>
            {intents.map(intent => (
              <button
                key={intent.id}
                onClick={() => setActiveIntent(intent.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-bold transition-all border",
                  activeIntent === intent.id 
                    ? "bg-accent/15 border-accent/30 text-accent" 
                    : "bg-surface2 border-white/5 text-text2 hover:text-text hover:border-white/10"
                )}
              >
                {intent.label}
              </button>
            ))}
            
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text3" />
                <input 
                  type="text" 
                  placeholder="Search campaigns..." 
                  className="bg-surface2 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:border-accent w-48"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn btn-ghost p-2">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={cn(
            "card p-0 overflow-hidden transition-all",
            draggedSegment && "ring-2 ring-accent ring-offset-4 ring-offset-bg"
          )}>
            <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface2/30">
                <Th label="Date / Campaign" onSort={() => handleSort('date')} />
                <Th label="Segment Used" onSort={() => handleSort('seg')} />
                <Th label="Seg. Excluded" onSort={() => handleSort('segx')} />
                <Th label="Channel" onSort={() => handleSort('channel')} />
                <Th label="Intent" onSort={() => handleSort('intent')} />
                <Th label="Offer Type" onSort={() => handleSort('offer')} />
                <Th label="Lifecycle" onSort={() => handleSort('lifecycle')} />
                <Th label="Sent" onSort={() => handleSort('sent')} />
                <Th label="Open Rate" onSort={() => handleSort('openRate')} />
                <Th label="CTR" onSort={() => handleSort('ctr')} />
                <Th label="ATC Rate" onSort={() => handleSort('atcRate')} />
                <Th label="Revenue" onSort={() => handleSort('revenue')} />
                <Th label="Unsub" onSort={() => handleSort('unsub')} />
                <th className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCampaigns.map(c => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="text-xs font-bold text-text">{c.name}</div>
                    <div className="text-[10px] text-text3">{c.date}</div>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-text2">{c.seg}</td>
                  <td className="px-4 py-3 text-[11px] text-text3">{c.segx}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-text2">
                      {getChannelIcon(c.channel)}
                      <span className="capitalize">{c.channel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("tag", `intent-${c.intent}`)}>
                      {c.intent}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-text2">{c.offer}</td>
                  <td className="px-4 py-3">
                    <span className="tag tag-gray">{c.lifecycle}</span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-text2">
                    {c.sent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[11px] text-text2">{c.openRate > 0 ? `${c.openRate}%` : '—'}</td>
                  <td className="px-4 py-3 text-[11px] font-bold text-accent">{c.ctr}%</td>
                  <td className="px-4 py-3 text-[11px] text-text2">{c.atcRate}%</td>
                  <td className="px-4 py-3 text-[11px] font-bold text-green">${c.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-[11px] font-medium",
                      c.unsub > 0.4 ? "text-red" : c.unsub > 0.2 ? "text-orange" : "text-green"
                    )}>
                      {c.unsub}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-surface2 rounded-lg text-text3 hover:text-text transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-surface2 rounded-lg text-text3 hover:text-text transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">Revenue by Intent Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intentRevData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {intentRevData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getIntentColor(entry.name.toLowerCase())} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-bold font-syne mb-4">CTR by Channel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ctrChannelData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555c72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141720', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar name="Avg CTR" dataKey="avg" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                <Bar name="Top CTR" dataKey="top" fill="var(--color-green)" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ label, onSort }: { label: string, onSort: () => void }) {
  return (
    <th 
      className="px-4 py-3 text-[10px] font-bold text-text3 uppercase tracking-wider cursor-pointer hover:text-text2 transition-colors"
      onClick={onSort}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-2.5 h-2.5" />
      </div>
    </th>
  );
}

function getIntentColor(intent: string) {
  switch (intent) {
    case 'awareness': return '#4f8ef7';
    case 'education': return '#7b5ea7';
    case 'consideration': return '#22d3a5';
    case 'conversion': return '#f4506b';
    case 'retention': return '#f9a03f';
    case 'winback': return '#fcd34d';
    default: return '#8b91a8';
  }
}
