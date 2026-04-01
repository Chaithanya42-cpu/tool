import React, { useState, useCallback } from 'react';
import { useApp } from "../AppContext";
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  Keyboard, 
  Plus, 
  Plug, 
  BarChart3, 
  Download,
  Info
} from 'lucide-react';
import { Campaign, Channel, Intent } from '../types';
import { cn } from '../lib/utils';

export default function DataUpload() {
  const { addCampaign } = useApp();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadType, setUploadType] = useState('Campaign Performance');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    } as any,
    multiple: false
  });

  const processFile = async () => {
    if (!uploadedFile) return;
    setIsProcessing(true);

    try {
      const data = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      // Map JSON to Campaign type (simplified mapping for demo)
      jsonData.forEach((row, index) => {
        const campaign: Campaign = {
          id: `up-${Date.now()}-${index}`,
          date: row.date || new Date().toISOString().split('T')[0],
          name: row.campaign_name || row.name || 'Unnamed Campaign',
          seg: row.segment_used || 'General',
          segx: row.segment_excluded || 'None',
          channel: (row.channel?.toLowerCase() as Channel) || 'email',
          intent: (row.intent?.toLowerCase() as Intent) || 'conversion',
          offer: row.offer_type || row.offer || 'None',
          lifecycle: row.lifecycle_stage || 'Active',
          sent: Number(row.sent) || 0,
          delivered: Number(row.delivered) || 0,
          openRate: Number(row.open_rate) || 0,
          ctr: Number(row.ctr) || 0,
          atcRate: Number(row.atc_rate) || 0,
          revenue: Number(row.revenue) || 0,
          unsub: Number(row.unsub_rate) || 0,
          clickSessionRate: Number(row.click_session_rate) || 0,
          bounceRate: Number(row.bounce_rate) || 0,
        };
        addCampaign(campaign);
      });

      setUploadedFile(null);
      alert(`Successfully processed ${jsonData.length} rows!`);
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process file. Please check the format.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSample = (type: string) => {
    const samples: Record<string, any[]> = {
      'Campaign Performance': [
        { date: '2024-10-14', campaign_name: 'Flash Sale Oct', segment_used: 'Churn-Risk 90d', segment_excluded: 'Recent Buyers', channel: 'email', intent: 'conversion', offer_type: '25% Off Code', lifecycle_stage: 'Churn Risk', sent: 12400, delivered: 11800, open_rate: 24.3, ctr: 3.8, atc_rate: 18.4, revenue: 8900, unsub_rate: 0.32, click_session_rate: 68.4, bounce_rate: 41.2 }
      ],
      'Flow Report': [
        { flow_name: 'Abandoned Cart', type: 'Cart Recovery', revenue: 25000, conv_rate: 8.5, open_rate: 40, ctr: 12 }
      ],
      'Cohort Retention': [
        { cohort_month: '2024-01', size: 3000, m1: 25, m2: 18, m3: 12 }
      ]
    };

    const ws = XLSX.utils.json_to_sheet(samples[type] || samples['Campaign Performance']);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sample");
    XLSX.writeFile(wb, `${type.toLowerCase().replace(/ /g, '_')}_sample.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Upload Data</h3>
            
            <div className="form-group mb-4">
              <label className="form-label">Data Type</label>
              <div className="flex gap-2 flex-wrap">
                {['Campaign Performance', 'Flow Report', 'Cohort Retention', 'A/B Test Results', 'Customer List'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setUploadType(type)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border",
                      uploadType === type 
                        ? "bg-accent/10 border-accent/30 text-accent" 
                        : "bg-surface2 border-white/5 text-text3 hover:text-text2"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div 
              {...getRootProps()} 
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all",
                isDragActive ? "border-accent bg-accent/5" : "border-white/10 hover:border-accent/50 hover:bg-white/5"
              )}
            >
              <input {...getInputProps()} />
              <FileSpreadsheet className="w-10 h-10 text-text3 mx-auto mb-3" />
              <div className="text-sm font-bold mb-1">
                {uploadedFile ? uploadedFile.name : "Drop CSV/Excel file or click to browse"}
              </div>
              <p className="text-xs text-text3">
                Supports exports from Klaviyo, Mailchimp, Sendlane, Interakt, etc.
              </p>
            </div>

            {uploadedFile && (
              <div className="mt-4 bg-green/10 border border-green/20 rounded-lg p-3 flex items-center gap-3 text-xs text-green">
                <CheckCircle2 className="w-4 h-4" />
                <strong>File ready:</strong> {uploadedFile.name}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="form-group">
                <label className="form-label">Platform Source</label>
                <select className="form-control">
                  <option>Klaviyo</option>
                  <option>Mailchimp</option>
                  <option>Sendlane</option>
                  <option>Interakt</option>
                  <option>AiSensy</option>
                  <option>Custom CSV</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  className="btn btn-primary w-full h-[38px] justify-center"
                  onClick={processFile}
                  disabled={!uploadedFile || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Process & Refresh"}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <button 
                className="btn btn-ghost w-full justify-center gap-2"
                onClick={() => downloadSample(uploadType)}
              >
                <Download className="w-3.5 h-3.5" />
                Download Sample {uploadType} Template
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Manual Data Entry</h3>
            <p className="text-xs text-text3 mb-4">Don't have a CSV? Enter key metrics manually to populate the dashboard.</p>
            <div className="space-y-2">
              <button className="btn btn-ghost w-full justify-start gap-3">
                <Keyboard className="w-4 h-4" />
                Enter Campaign Data Manually
              </button>
              <button className="btn btn-ghost w-full justify-start gap-3">
                <Plus className="w-4 h-4" />
                Add Single Campaign Row
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Column Mapping Guide</h3>
            <p className="text-xs text-text3 mb-3">Ensure your CSV includes these columns for full analysis:</p>
            <div className="overflow-hidden rounded-lg border border-white/5">
              <table className="w-full text-[11px]">
                <thead className="bg-surface2">
                  <tr>
                    <th className="px-3 py-2 text-left text-text3 font-bold uppercase tracking-wider">Required Column</th>
                    <th className="px-3 py-2 text-left text-text3 font-bold uppercase tracking-wider">Format</th>
                    <th className="px-3 py-2 text-left text-text3 font-bold uppercase tracking-wider">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { col: 'date', fmt: 'YYYY-MM-DD', ex: '2024-10-14' },
                    { col: 'campaign_name', fmt: 'Text', ex: 'Flash Sale Oct' },
                    { col: 'segment_used', fmt: 'Text', ex: 'Churn-Risk 90d' },
                    { col: 'channel', fmt: 'email/sms/wa/push', ex: 'email' },
                    { col: 'intent', fmt: '6 options below', ex: 'conversion' },
                    { col: 'sent', fmt: 'Number', ex: '12400' },
                    { col: 'revenue', fmt: 'Number ($)', ex: '8900' },
                  ].map(row => (
                    <tr key={row.col}>
                      <td className="px-3 py-2 font-bold text-text">{row.col}</td>
                      <td className="px-3 py-2 text-text2">{row.fmt}</td>
                      <td className="px-3 py-2 text-text3">{row.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex gap-2 items-start bg-surface2/50 p-2 rounded-lg">
              <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <p className="text-[10px] text-text3 leading-relaxed">
                <strong>Intent options:</strong> awareness · education · consideration · conversion · retention · winback
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Integrations</h3>
            <div className="space-y-2">
              <IntegrationRow name="Klaviyo" icon={<Plug className="w-4 h-4 text-accent" />} active />
              <IntegrationRow name="Interakt / AiSensy" icon={<Plug className="w-4 h-4 text-green" />} />
              <IntegrationRow name="Google Analytics 4" icon={<BarChart3 className="w-4 h-4 text-orange" />} />
              <IntegrationRow name="Shopify" icon={<Plug className="w-4 h-4 text-[#95bf47]" />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationRow({ name, icon, active = false }: { name: string, icon: React.ReactNode, active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface2 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs font-bold text-text">{name}</span>
      </div>
      <div className={cn(
        "w-8 h-4 rounded-full relative cursor-pointer transition-colors",
        active ? "bg-accent" : "bg-surface3"
      )}>
        <div className={cn(
          "w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all",
          active ? "right-0.5" : "left-0.5"
        )} />
      </div>
    </div>
  );
}
