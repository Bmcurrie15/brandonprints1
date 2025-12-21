
import React from 'react';
import { Link } from 'react-router-dom';
import { usePrints } from '../hooks/usePrints';
import PrintCard from '../components/PrintCard';
import SEO from '../components/SEO';
import { LoadingGrid } from '../components/LoadingState';

const Home: React.FC = () => {
  const { featuredPrints, loading } = usePrints();

  return (
    <div className="space-y-16">
      <SEO 
        title="Brandon Currie | Custom 3D Printing & Design Portfolio"
        description="The personal 3D printing portfolio of Brandon Currie. Featuring custom functional prints, prototypes, and decorative 3D models."
        name="Brandon Currie"
      />

      <section className="text-center space-y-6 pt-12 pb-8 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Making things <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-amber-500">real</span>.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          I'm <strong>Brandon</strong>. I turn digital models into physical objects. 
          <br className="hidden md:inline" /> 
          This is a collection of my custom 3D printed projects, prototypes, and gifts.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-100 drop-shadow-md">Featured Builds</h2>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Hand-picked selection of recent work</p>
          </div>
          <Link to="/gallery" className="text-accent-500 hover:text-accent-400 font-bold text-sm flex items-center gap-2 group transition-all">
            Browse All
            <span className="bg-accent-500/10 px-2 py-0.5 rounded text-[10px] group-hover:bg-accent-500 group-hover:text-white transition-colors">
              {featuredPrints.length > 0 ? featuredPrints.length : ''}
            </span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {loading ? (
          <LoadingGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrints.map(print => (
              <PrintCard key={print.slug} print={print} />
            ))}
          </div>
        )}
        
        {!loading && featuredPrints.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-maker-900/10 rounded-2xl border border-dashed border-white/5">
                No featured prints marked in spreadsheet yet.
            </div>
        )}

        <div className="mt-16 text-center">
            <Link 
                to="/gallery" 
                className="inline-flex items-center gap-3 px-10 py-4 bg-accent-500 text-white font-black rounded-xl hover:bg-accent-600 hover:scale-105 transition-all shadow-xl shadow-accent-500/20 active:scale-95 uppercase tracking-widest text-sm"
            >
                Explore The Full Archive -&gt;
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
