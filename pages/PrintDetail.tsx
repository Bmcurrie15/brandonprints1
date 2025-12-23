import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPrints, getOptimizedImageUrl } from '../services/dataService';
import { Print, EMAIL_LINK } from '../types';
import SEO from '../components/SEO';

const PrintDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [print, setPrint] = useState<Print | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchPrints().then(allPrints => {
      const found = allPrints.find(p => p.slug === slug);
      setPrint(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-400 space-y-4">
        <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading project details...</span>
    </div>
  );
  
  if (!print) return (
    <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Print not found</h2>
        <Link to="/gallery" className="text-accent-500 hover:underline">Back to Gallery</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-in fade-in duration-500">
      <SEO 
        title={`${print.title} | Brandon Prints`}
        description={`Check out the ${print.title}, a ${print.category} 3D print by Brandon. ${print.description}`}
        image={print.images[0]}
        type="Article"
      />

      <nav className="text-sm">
        <Link to="/gallery" className="text-slate-500 hover:text-accent-500 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square bg-maker-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative group">
             <img 
               src={getOptimizedImageUrl(print.images[activeImageIndex], 1200)} 
               alt={print.imageAlts[activeImageIndex] || print.title}
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
          
          {print.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {print.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    idx === activeImageIndex 
                        ? 'border-accent-500 shadow-lg shadow-accent-500/20 opacity-100 scale-105' 
                        : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img 
                    src={getOptimizedImageUrl(img, 200)} 
                    alt="" 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                 {/* Category - Unified Cyan Style */}
                 <span className="px-3 py-1 rounded-lg border font-bold tracking-widest uppercase text-[10px] bg-black/40 text-sky-400 border-sky-500/40">
                    {print.category}
                 </span>
                 {print.featured && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-[10px] font-bold tracking-widest uppercase border border-amber-500/20">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        Featured Build
                    </span>
                 )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">{print.title}</h1>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">{print.description}</p>
          </div>

          <div className="bg-maker-900/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-slate-200 font-bold uppercase tracking-wider text-xs pb-4 border-b border-white/5">
                <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Technical Specifications
            </div>
            
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="col-span-2">
                    <dt className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Material / Tags</dt>
                    <dd className="flex flex-wrap gap-2">
                        {print.materials.map(mat => (
                            <span 
                              key={mat} 
                              className="px-3 py-1.5 bg-black/40 text-accent-500 text-[11px] rounded-lg border border-accent-600/40 font-bold uppercase tracking-widest"
                            >
                                {mat}
                            </span>
                        ))}
                    </dd>
                </div>
                <div className="col-span-2">
                    <dt className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Purpose</dt>
                    <dd className="text-slate-200 font-semibold capitalize">{print.purpose}</dd>
                </div>
            </dl>
          </div>

          <div className="pt-6 border-t border-white/10">
             <div className="bg-gradient-to-br from-accent-600 to-amber-600 p-6 rounded-2xl shadow-lg space-y-4">
                <h3 className="text-white font-bold text-lg">Interested in this build?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                    I can replicate this print in custom colors or modify the design to fit your specific needs.
                </p>
                <a 
                href={EMAIL_LINK} 
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-accent-600 font-bold rounded-xl hover:bg-slate-100 transition-all active:scale-95 shadow-md"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Brandon
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintDetail;