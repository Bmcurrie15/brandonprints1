import React from 'react';
import SEO from '../components/SEO';

interface MaterialSpec {
  name: string;
  bestFor: string[]; // Changed to string array for multiple badges
  description: string;
  cost: 1 | 2 | 3;
  strengths: string[];
  limitations: string[];
  specs: {
    impact: number; // 1-5
    heat: number;   // 1-5
    flex: number;   // 1-5
  };
  useCase: string;
}

const materials: MaterialSpec[] = [
  {
    name: 'PLA / PLA+',
    bestFor: ['Rapid Prototyping', 'Most Common'],
    description: 'The industry standard for cosmetic prints and non-stressed parts. It offers the highest detail resolution and ease of use for all skill levels.',
    cost: 1,
    strengths: ['High detail resolution', 'Wide color variety', 'Easy to print'],
    limitations: ['Low heat resistance (~55°C)', 'Brittle under snap-loads', 'Not UV stable'],
    specs: { impact: 2, heat: 1, flex: 2 },
    useCase: 'Visual prototypes, desk organizers, and decorative figurines.',
  },
  {
    name: 'PETG',
    bestFor: ['Functional Utility'],
    description: 'The balanced workhorse. Combines the ease of PLA with the durability and chemical resistance needed for functional real-world applications.',
    cost: 1,
    strengths: ['Water/Chemical resistant', 'Ductile & Tough', 'Food-safe potential'],
    limitations: ['Prone to stringing', 'Scratches easily', 'Hard to glue'],
    specs: { impact: 3, heat: 2, flex: 3 },
    useCase: 'Water bottles, planters, snap-fit enclosures, and mechanical brackets.',
  },
  {
    name: 'ASA / ABS',
    bestFor: ['Outdoor', 'Automotive'],
    description: 'Engineering-grade plastics built for harsh environments. ASA specifically offers superior UV resistance for long-term outdoor exposure.',
    cost: 2,
    strengths: ['High UV stability (ASA)', 'Can be vapor smoothed', 'Machinable'],
    limitations: ['Prone to warping', 'Requires enclosure', 'Odor during printing'],
    specs: { impact: 4, heat: 4, flex: 3 },
    useCase: 'Automotive dashboard clips, outdoor signage, and tool handles.',
  },
  {
    name: 'TPU (95A)',
    bestFor: ['Flexible Parts'],
    description: 'A rubber-like elastomer that withstands repeated compression and abrasion. Its layer adhesion is virtually indestructible.',
    cost: 2,
    strengths: ['Extremely tough', 'Vibration dampening', 'Abrasion resistant'],
    limitations: ['Slow print speeds', 'Difficult to bridge', 'Hard to remove supports'],
    specs: { impact: 5, heat: 2, flex: 5 },
    useCase: 'Phone cases, drone bumpers, gaskets, and vibration isolators.',
  },
  {
    name: 'PA6-CF (Nylon)',
    bestFor: ['End-Use Engineering'],
    description: 'Nylon reinforced with chopped carbon fibers. Provides extreme rigidity, high heat resistance, and a professional matte finish.',
    cost: 3,
    strengths: ['Extreme stiffness', 'Matte surface finish', 'Heat resistance (~150°C)'],
    limitations: ['Highly hygroscopic', 'Abrasive to hardware', 'Expensive'],
    specs: { impact: 5, heat: 5, flex: 3 },
    useCase: 'Functional gears, structural brackets, and drone frames.',
  },
  {
    name: 'Wood / Marble PLA',
    bestFor: ['Aesthetic Display'],
    description: 'Composite filaments designed strictly for visual texture. Contains real particles for a natural look that can be post-processed.',
    cost: 2,
    strengths: ['Unique matte texture', 'Hides layer lines', 'Sands/Stains easily'],
    limitations: ['Weaker than PLA', 'Abrasive nozzles', 'Brittle'],
    specs: { impact: 1, heat: 1, flex: 1 },
    useCase: 'Architectural models, busts, and rustic home decor.',
  }
];

const RatingBar: React.FC<{ label: string; value: number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
      {icon}
      <span>{label}</span>
    </div>
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
            i <= value ? 'bg-accent-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]' : 'bg-white/5'
          }`}
        />
      ))}
    </div>
  </div>
);

const Materials: React.FC = () => {
  return (
    <div className="space-y-16">
      <SEO 
        title="Material Guide | Brandon Prints" 
        description="A technical comparison of 3D printing materials offered, including PLA, PETG, ABS, ASA, TPU, and Carbon Fiber Nylon."
      />

      {/* Header */}
      <section className="max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Material Reference</h1>
        <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-accent-500 pl-6">
            Performance varies wildly between plastics. Use this guide to select the optimal filament based on mechanical requirements and environment.
        </p>
      </section>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((mat) => (
            <div 
                key={mat.name}
                className="group flex flex-col bg-maker-900/30 backdrop-blur-sm hover:bg-maker-900/50 rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition-all duration-500 hover:border-accent-500/40 hover:-translate-y-1"
            >
                {/* Header Section - Tags as separate rectangles */}
                <div className="p-8 pb-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                        {mat.bestFor.map(tag => (
                          <span key={tag} className="inline-block text-[9px] font-black text-accent-500 bg-accent-500/10 border border-accent-500/20 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] shadow-sm">
                              {tag}
                          </span>
                        ))}
                    </div>
                    <h2 className="text-2xl font-black text-white group-hover:text-accent-500 transition-colors leading-tight">
                      {mat.name}
                    </h2>
                </div>

                <div className="px-8 pb-8 flex flex-col flex-grow space-y-8">
                    {/* Description Section */}
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {mat.description}
                    </p>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 gap-5 bg-black/40 p-5 rounded-2xl border border-white/5">
                        <RatingBar 
                            label="Impact Resistance" 
                            value={mat.specs.impact} 
                            icon={<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        />
                        <RatingBar 
                            label="Heat Deflection" 
                            value={mat.specs.heat} 
                            icon={<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>}
                        />
                        <RatingBar 
                            label="Flexibility" 
                            value={mat.specs.flex} 
                            icon={<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                        />
                    </div>

                    {/* Pros & Cons Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[12px] font-sans">
                        <div className="space-y-3">
                            <span className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Pros
                            </span>
                            <ul className="space-y-2 text-slate-300">
                                {mat.strengths.map(s => <li key={s} className="flex gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    {s}
                                </li>)}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <span className="flex items-center gap-2 text-rose-400 font-black uppercase tracking-widest text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                Cons
                            </span>
                            <ul className="space-y-2 text-slate-400">
                                {mat.limitations.map(l => <li key={l} className="flex gap-2">
                                    <span className="text-rose-500 font-bold">✕</span>
                                    {l}
                                </li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Real World Application + Cost */}
                    <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                             <span className="text-slate-500 uppercase tracking-widest font-black">Price Tier</span>
                             <div className="flex gap-1 text-lg">
                                <span className={mat.cost >= 1 ? 'text-accent-500' : 'text-slate-800'}>$</span>
                                <span className={mat.cost >= 2 ? 'text-accent-500' : 'text-slate-800'}>$</span>
                                <span className={mat.cost >= 3 ? 'text-accent-500' : 'text-slate-800'}>$</span>
                             </div>
                        </div>
                        <p className="text-[13px] text-slate-400 leading-relaxed italic border-l-2 border-accent-500/30 pl-4 py-1">
                            {mat.useCase}
                        </p>
                    </div>

                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;