import { Brand, Campaign, Flow, ABTest, Creative } from "./types";

export const initialBrands: Brand[] = [
  {
    id: 'brand1',
    name: 'Luxe Fashion Co.',
    type: 'DTC · Fashion · Medium AOV',
    model: 'DTC Fashion',
    vertical: 'Fashion',
    aovMin: 75,
    aovMax: 150,
    purchaseCycle: 24,
    crmTarget: 40,
    discountSensitivity: 'Medium',
    categories: ['Dresses', 'Tops & Blouses', 'Accessories'],
    channelMix: { email: 55, wa: 30, sms: 15, push: 0 },
    lifecycleDistribution: { active: 40, atRisk: 25, snoozed: 15, lost: 20 }
  },
  {
    id: 'brand2',
    name: 'HealthSupps DTC',
    type: 'Consumable · High Frequency · Low AOV',
    model: 'Consumable DTC',
    vertical: 'Health',
    aovMin: 30,
    aovMax: 60,
    purchaseCycle: 30,
    crmTarget: 35,
    discountSensitivity: 'High',
    categories: ['Vitamins', 'Protein', 'Sleep Aids'],
    channelMix: { email: 60, wa: 20, sms: 10, push: 10 },
    lifecycleDistribution: { active: 30, atRisk: 30, snoozed: 20, lost: 20 }
  }
];

export const initialCampaigns: Campaign[] = [
  { id: '1', date: '2024-10-14', name: 'Flash Sale — End of Season', seg: 'Churn Risk 90d', segx: 'Recent Buyers 30d', channel: 'email', intent: 'conversion', offer: '25% Off Code', lifecycle: 'Churn Risk', sent: 18400, delivered: 17296, openRate: 21.4, ctr: 3.2, atcRate: 18, revenue: 12400, unsub: 0.44, clickSessionRate: 74, bounceRate: 38 },
  { id: '2', date: '2024-10-08', name: 'New Arrivals Drop', seg: 'Active Buyers', segx: 'VIP (sep flow)', channel: 'email', intent: 'awareness', offer: 'No Offer', lifecycle: 'Active', sent: 24100, delivered: 23136, openRate: 34.2, ctr: 2.8, atcRate: 14, revenue: 9800, unsub: 0.10, clickSessionRate: 68, bounceRate: 32 },
  { id: '3', date: '2024-10-22', name: 'Last Chance Flash', seg: 'Churn Risk', segx: 'None', channel: 'wa', intent: 'conversion', offer: '25% Off Code', lifecycle: 'Churn Risk', sent: 12400, delivered: 11408, openRate: 0, ctr: 2.8, atcRate: 18, revenue: 8900, unsub: 0.5, clickSessionRate: 72, bounceRate: 35 },
  { id: '4', date: '2024-10-18', name: 'Welcome to the Family', seg: 'New Subscribers', segx: 'None', channel: 'email', intent: 'awareness', offer: '10% Welcome', lifecycle: 'New Sub', sent: 8200, delivered: 8036, openRate: 52.1, ctr: 5.4, atcRate: 28, revenue: 6800, unsub: 0.08, clickSessionRate: 82, bounceRate: 24 },
  { id: '5', date: '2024-10-10', name: 'VIP Early Access', seg: 'VIP Buyers', segx: 'None', channel: 'wa', intent: 'retention', offer: 'Early Access', lifecycle: 'VIP', sent: 2840, delivered: 2811, openRate: 0, ctr: 8.2, atcRate: 34, revenue: 18200, unsub: 0.04, clickSessionRate: 88, bounceRate: 18 },
  { id: '6', date: '2024-10-05', name: 'Product Education — Hero SKU', seg: 'Browse Only', segx: 'Buyers 60d', channel: 'email', intent: 'education', offer: 'None', lifecycle: 'Browse Only', sent: 14500, delivered: 13485, openRate: 28.4, ctr: 2.1, atcRate: 8, revenue: 3400, unsub: 0.12, clickSessionRate: 58, bounceRate: 48 },
  { id: '7', date: '2024-09-28', name: 'Win-Back 180d Lapsed', seg: 'Lapsed 180d', segx: 'None', channel: 'email', intent: 'winback', offer: '20% + Free Ship', lifecycle: 'Lapsed', sent: 6100, delivered: 5368, openRate: 18.8, ctr: 2.8, atcRate: 9, revenue: 4100, unsub: 0.28, clickSessionRate: 52, bounceRate: 58 }
];

export const initialFlows: Flow[] = [
  { id: 'cart', name: 'Abandoned Cart Recovery', type: 'Cart Recovery', status: 'Active', revenue: 24800, convRate: 8.4, openRate: 38, atcRate: 22, ctr: 11.2, meta: '3 emails · 2 SMS · Trigger: Cart abandoned 1hr', tags: ['Conversion', 'High Priority'] },
  { id: 'browse', name: 'Browse Abandonment', type: 'Browse Abandonment', status: 'Active', revenue: 11400, convRate: 4.1, openRate: 28, atcRate: 14, ctr: 6.8, meta: '2 emails · Trigger: Viewed 3+ products, no cart', tags: ['Consideration'] },
  { id: 'welcome', name: 'Welcome Series', type: 'Welcome', status: 'Active', revenue: 18200, convRate: 12.3, openRate: 52, atcRate: 31, ctr: 14.1, meta: '5 emails · 2 WA · Trigger: New subscriber', tags: ['Awareness', 'Education'] },
  { id: 'winback', name: 'Win-Back (180d Lapsed)', type: 'Win-Back', status: 'Under Review', revenue: 6100, convRate: 3.8, openRate: 21, atcRate: 9, ctr: 4.2, meta: '4 emails · Trigger: No purchase in 180 days', tags: ['Winback'] }
];

export const initialCreatives: Creative[] = [
  {
    id: 'c1',
    channel: 'email',
    hookType: 'Urgency',
    offerType: '25% Off',
    intent: 'conversion',
    subject: 'Your cart is about to disappear 👀',
    body: "Hi [Name], those pieces you loved are almost gone. We're holding them for just 2 more hours.\n\nDon't let someone else snag your style →",
    performance: { openRate: 31.8, ctr: 5.4, atcRate: 22 },
    tags: ['Urgency', 'Conversion', 'Cart Recovery'],
    score: 'A+'
  },
  {
    id: 'c2',
    channel: 'wa',
    hookType: 'Product Feature',
    offerType: 'None',
    intent: 'consideration',
    subject: 'Hey [Name]! 🌟',
    body: "Just spotted you checking out our new arrivals. Great taste! 😍\n\nYour exclusive early access link: [LINK]\n\nReply STOP to opt out.",
    performance: { openRate: 68.4, ctr: 4.1, atcRate: 18 },
    tags: ['Browse Abandonment', 'Consideration'],
    score: 'B'
  }
];
