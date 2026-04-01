import { useState } from 'react';
import { useApp } from "../AppContext";
import { 
  Plus, 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Trash2,
  Copy,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Creative, Channel, Intent } from '../types';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";

export default function CreativeLibrary() {
  const { creatives, addCreative } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Email', 'WhatsApp', 'SMS', 'Best Performers', 'Urgency Hook', 'Social Proof'];

  const generateAICopy = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate a high-converting marketing email for a fashion brand. 
      Subject: Urgency-based, catchy.
      Body: Engaging, short, with a clear CTA.
      Tone: Professional yet exciting.
      Include placeholders like [Name] and [LINK].
      Return as JSON with fields: subject, body, intent (one of: conversion, awareness, consideration), hookType.`;

      const genAI = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      const text = response.text;
      const data = JSON.parse(text || '{}');

      const newCreative: Creative = {
        id: `ai-${Date.now()}`,
        channel: 'email',
        hookType: data.hookType || 'Urgency',
        offerType: 'Seasonal Sale',
        intent: data.intent || 'conversion',
        subject: data.subject,
        body: data.body,
        performance: { openRate: 0, ctr: 0, atcRate: 0 },
        tags: [data.hookType, 'AI Generated'],
        score: 'B'
      };

      addCreative(newCreative);
      alert("AI Copy Generated and added to library!");
    } catch (error) {
      console.error("Error generating copy:", error);
      alert("Failed to generate AI copy. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredCreatives = creatives.filter(c => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Email') return c.channel === 'email';
    if (activeFilter === 'WhatsApp') return c.channel === 'wa';
    if (activeFilter === 'SMS') return c.channel === 'sms';
    if (activeFilter === 'Best Performers') return c.score === 'A+';
    if (activeFilter === 'Urgency Hook') return c.hookType === 'Urgency';
    if (activeFilter === 'Social Proof') return c.hookType === 'Social Proof';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Creative Library</h2>
          <p className="text-xs text-text3">Email, WhatsApp, and SMS creative examples with performance data</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="btn btn-ghost border-accent/20 text-accent hover:bg-accent/5"
            onClick={generateAICopy}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate AI Copy
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Creative
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold transition-all border",
              activeFilter === f 
                ? "bg-accent/15 border-accent/30 text-accent" 
                : "bg-surface2 border-white/5 text-text2 hover:text-text hover:border-white/10"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredCreatives.map(creative => (
          <CreativeCard key={creative.id} creative={creative} />
        ))}
        
        <div className="card border-dashed border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent/50 hover:bg-white/5 transition-all group p-8">
          <div className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-text3 group-hover:text-accent" />
          </div>
          <div className="text-center">
            <div className="text-sm font-bold">Add Creative</div>
            <p className="text-[10px] text-text3 mt-1">Paste email copy, WA template, or SMS text</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativeCard({ creative }: { creative: Creative }) {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-3.5 h-3.5" />;
      case 'wa': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'sms': return <Smartphone className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="card p-4 space-y-4 group relative">
      <div className="flex justify-between items-center">
        <span className={cn(
          "tag gap-1.5 px-2.5 py-1",
          creative.channel === 'email' ? "tag-blue" : creative.channel === 'wa' ? "tag-green" : "tag-orange"
        )}>
          {getChannelIcon(creative.channel)}
          <span className="capitalize">{creative.channel === 'wa' ? 'WhatsApp' : creative.channel}</span>
        </span>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full",
          creative.score === 'A+' ? "bg-green/15 text-green" : "bg-orange/15 text-orange"
        )}>
          {creative.score} Performer
        </span>
      </div>

      <div className="bg-surface2 border border-white/5 rounded-lg p-3.5 space-y-2">
        <div className="text-xs font-bold text-yellow line-clamp-1">"{creative.subject}"</div>
        <div className="text-[11px] text-text2 leading-relaxed line-clamp-4 whitespace-pre-wrap">
          {creative.body}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-[9px] font-bold text-text3 uppercase tracking-wider">Open Rate</div>
          <div className="text-sm font-bold text-green">{creative.performance.openRate > 0 ? `${creative.performance.openRate}%` : '—'}</div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-text3 uppercase tracking-wider">CTR</div>
          <div className="text-sm font-bold text-accent">{creative.performance.ctr > 0 ? `${creative.performance.ctr}%` : '—'}</div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-text3 uppercase tracking-wider">ATC</div>
          <div className="text-sm font-bold text-orange">{creative.performance.atcRate > 0 ? `${creative.performance.atcRate}%` : '—'}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {creative.tags.map(tag => (
          <span key={tag} className="tag tag-gray">{tag}</span>
        ))}
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 bg-surface rounded-lg border border-white/10 hover:border-white/20 text-text3 hover:text-text">
          <Copy className="w-3 h-3" />
        </button>
        <button className="p-1.5 bg-surface rounded-lg border border-white/10 hover:border-red/50 text-text3 hover:text-red">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
