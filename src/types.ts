export type Channel = 'email' | 'wa' | 'sms' | 'push';
export type Intent = 'awareness' | 'education' | 'consideration' | 'conversion' | 'retention' | 'winback';

export interface Campaign {
  id: string;
  date: string;
  name: string;
  seg: string;
  segx: string;
  channel: Channel;
  intent: Intent;
  offer: string;
  lifecycle: string;
  sent: number;
  delivered: number;
  openRate: number;
  ctr: number;
  atcRate: number;
  revenue: number;
  unsub: number;
  clickSessionRate: number;
  bounceRate: number;
}

export interface Brand {
  id: string;
  name: string;
  type: string;
  model: string;
  vertical: string;
  aovMin: number;
  aovMax: number;
  purchaseCycle: number;
  crmTarget: number;
  discountSensitivity: 'High' | 'Medium' | 'Low';
  categories: string[];
  channelMix: {
    email: number;
    wa: number;
    sms: number;
    push: number;
  };
  lifecycleDistribution: {
    active: number;
    atRisk: number;
    snoozed: number;
    lost: number;
  };
}

export interface Flow {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Paused' | 'Under Review' | 'Draft';
  revenue: number;
  convRate: number;
  openRate: number;
  atcRate: number;
  ctr: number;
  meta: string;
  tags: string[];
}

export interface ABTest {
  id: string;
  name: string;
  date: string;
  channel: Channel;
  sampleSize: number;
  intent: Intent;
  variantA: {
    description: string;
    metric: string;
    value: number;
  };
  variantB: {
    description: string;
    metric: string;
    value: number;
  };
  winner: 'Variant A' | 'Variant B' | 'Inconclusive';
  significance: 'Significant (p < 0.05)' | 'Borderline' | 'Not Significant';
  resultNote: string;
}

export interface Creative {
  id: string;
  channel: Channel;
  hookType: string;
  offerType: string;
  intent: Intent;
  subject: string;
  body: string;
  performance: {
    openRate: number;
    ctr: number;
    atcRate: number;
  };
  tags: string[];
  score: 'A+' | 'A' | 'B' | 'C';
}
