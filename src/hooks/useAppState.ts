import { useState, useEffect } from 'react';
import { Brand, Campaign, Flow, ABTest, Creative } from '../types';
import { initialBrands, initialCampaigns, initialFlows, initialCreatives } from '../initialData';

export function useAppState() {
  const [activeBrandId, setActiveBrandId] = useState<string>(() => {
    return localStorage.getItem('activeBrandId') || initialBrands[0].id;
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    const saved = localStorage.getItem('brands');
    return saved ? JSON.parse(saved) : initialBrands;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('campaigns');
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [flows, setFlows] = useState<Flow[]>(() => {
    const saved = localStorage.getItem('flows');
    return saved ? JSON.parse(saved) : initialFlows;
  });

  const [abTests, setABTests] = useState<ABTest[]>(() => {
    const saved = localStorage.getItem('abTests');
    return saved ? JSON.parse(saved) : [];
  });

  const [creatives, setCreatives] = useState<Creative[]>(() => {
    const saved = localStorage.getItem('creatives');
    return saved ? JSON.parse(saved) : initialCreatives;
  });

  useEffect(() => {
    localStorage.setItem('activeBrandId', activeBrandId);
    localStorage.setItem('brands', JSON.stringify(brands));
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    localStorage.setItem('flows', JSON.stringify(flows));
    localStorage.setItem('abTests', JSON.stringify(abTests));
    localStorage.setItem('creatives', JSON.stringify(creatives));
  }, [activeBrandId, brands, campaigns, flows, abTests, creatives]);

  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0];

  const addCampaign = (campaign: Campaign) => setCampaigns(prev => [campaign, ...prev]);
  const addBrand = (brand: Brand) => setBrands(prev => [...prev, brand]);
  const updateBrand = (brand: Brand) => setBrands(prev => prev.map(b => b.id === brand.id ? brand : b));
  const addFlow = (flow: Flow) => setFlows(prev => [flow, ...prev]);
  const addABTest = (test: ABTest) => setABTests(prev => [test, ...prev]);
  const addCreative = (creative: Creative) => setCreatives(prev => [creative, ...prev]);

  return {
    activeBrand,
    setActiveBrandId,
    brands,
    campaigns,
    setCampaigns,
    flows,
    abTests,
    creatives,
    addCampaign,
    addBrand,
    updateBrand,
    addFlow,
    addABTest,
    addCreative
  };
}
