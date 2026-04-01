import { useApp } from "../AppContext";
import { 
  Building2, 
  Save, 
  Plus, 
  Trash2,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function BrandSetup() {
  const { activeBrand, updateBrand } = useApp();

  const handleSave = () => {
    alert("Brand profile saved!");
  };

  return (
    <div className="space-y-6">
      <div className="w-9 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full" />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold font-syne">Brand Profile Setup</h2>
          <p className="text-xs text-text3">Define your brand's model, channels, and benchmarks for accurate analysis</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save className="w-4 h-4" />
          Save Profile
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Business Model</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Brand Name</label>
                <input type="text" className="form-control" defaultValue={activeBrand.name} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Business Model</label>
                  <select className="form-control" defaultValue={activeBrand.model}>
                    <option>DTC</option>
                    <option>Consumable</option>
                    <option>Fashion</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Vertical</label>
                  <select className="form-control" defaultValue={activeBrand.vertical}>
                    <option>Fashion / Apparel</option>
                    <option>Health & Wellness</option>
                    <option>Beauty</option>
                    <option>Food & Bev</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">AOV Range (min)</label>
                  <input type="number" className="form-control" defaultValue={activeBrand.aovMin} />
                </div>
                <div className="form-group">
                  <label className="form-label">AOV Range (max)</label>
                  <input type="number" className="form-control" defaultValue={activeBrand.aovMax} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Purchase Cycle (days)</label>
                  <input type="number" className="form-control" defaultValue={activeBrand.purchaseCycle} />
                </div>
                <div className="form-group">
                  <label className="form-label">CRM Revenue Target %</label>
                  <input type="number" className="form-control" defaultValue={activeBrand.crmTarget} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Discount Sensitivity</label>
                <select className="form-control" defaultValue={activeBrand.discountSensitivity}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold font-syne">Top 3 Categories / Products</h3>
              <button className="btn btn-ghost btn-sm p-1.5"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-2">
              {activeBrand.categories.map((cat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" className="form-control" defaultValue={cat} />
                  <button className="p-2 hover:bg-red/10 text-text3 hover:text-red rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Channel Mix Setup</h3>
            <div className="space-y-4">
              <ChannelInput label="Email %" value={activeBrand.channelMix.email} color="accent" />
              <ChannelInput label="WhatsApp %" value={activeBrand.channelMix.wa} color="green" />
              <ChannelInput label="SMS %" value={activeBrand.channelMix.sms} color="orange" />
              <ChannelInput label="Push %" value={activeBrand.channelMix.push} color="purple" />
              
              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] font-bold text-green">Total: 100% ✓</div>
                <div className="text-[10px] text-text3 italic">Must equal 100% for accurate modeling</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-syne mb-4">Lifecycle % Configuration</h3>
            <div className="space-y-4">
              <ChannelInput label="Active %" value={activeBrand.lifecycleDistribution.active} color="green" />
              <ChannelInput label="At Risk %" value={activeBrand.lifecycleDistribution.atRisk} color="yellow" />
              <ChannelInput label="Snoozed %" value={activeBrand.lifecycleDistribution.snoozed} color="orange" />
              <ChannelInput label="Lost %" value={activeBrand.lifecycleDistribution.lost} color="red" />
            </div>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-accent shrink-0" />
            <p className="text-[11px] text-text2 leading-relaxed">
              These benchmarks are used to calculate your <strong>CRM Health Score</strong> and identify performance gaps vs industry standards for your specific business model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelInput({ label, value, color }: any) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="flex items-center gap-3">
        <input type="number" className="form-control w-24" defaultValue={value} />
        <div className="flex-1 h-1.5 bg-surface3 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full", `bg-${color}`)}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
