import { useState } from 'react';
import { useApp } from "./AppContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./components/Overview";
import Campaigns from "./components/Campaigns";
import Flows from "./components/Flows";
import Retention from "./components/Retention";
import Frequency from "./components/Frequency";
import Intent from "./components/Intent";
import PostClick from "./components/PostClick";
import ABTests from "./components/ABTests";
import CreativeLibrary from "./components/CreativeLibrary";
import BrandSetup from "./components/BrandSetup";
import DataUpload from "./components/DataUpload";
import { X, CheckCircle2 } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { activeBrand, brands, setActiveBrandId } = useApp();
  const [activePage, setActivePage] = useState('overview');
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'overview': return <Overview />;
      case 'campaigns': return <Campaigns />;
      case 'flows': return <Flows />;
      case 'retention': return <Retention />;
      case 'frequency': return <Frequency />;
      case 'intent': return <Intent />;
      case 'postclick': return <PostClick />;
      case 'abtests': return <ABTests />;
      case 'creative': return <CreativeLibrary />;
      case 'brandsetup': return <BrandSetup />;
      case 'datainput': return <DataUpload />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-bg text-text overflow-hidden">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        openBrandModal={() => setIsBrandModalOpen(true)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar activePage={activePage} />
        
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Brand Switcher Modal */}
      <AnimatePresence>
        {isBrandModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsBrandModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold font-syne">Switch Brand</h3>
                <button 
                  onClick={() => setIsBrandModalOpen(false)}
                  className="p-1.5 hover:bg-surface2 rounded-lg text-text3 hover:text-text transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {brands.map(brand => (
                  <div 
                    key={brand.id}
                    onClick={() => {
                      setActiveBrandId(brand.id);
                      setIsBrandModalOpen(false);
                    }}
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group",
                      brand.id === activeBrand.id 
                        ? "bg-accent/10 border-accent/40" 
                        : "bg-surface2 border-white/5 hover:border-white/20"
                    )}
                  >
                    <div>
                      <div className="text-sm font-bold text-text group-hover:text-accent transition-colors">{brand.name}</div>
                      <div className="text-[11px] text-text3 mt-0.5">{brand.type}</div>
                    </div>
                    {brand.id === activeBrand.id && (
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    )}
                  </div>
                ))}
              </div>

              <button className="btn btn-ghost w-full justify-center mt-6 py-2.5 border-dashed">
                + Add New Brand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
