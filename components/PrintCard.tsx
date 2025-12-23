import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Print } from '../types';
import { getOptimizedImageUrl } from '../services/dataService';

interface PrintCardProps {
  print: Print;
}

const PrintCard: React.FC<PrintCardProps> = ({ print }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Request a 600px wide optimized version for the gallery grid
  const imageUrl = getOptimizedImageUrl(print.images[0], 600);

  return (
    <Link 
      to={`/prints/${print.slug}`} 
      className="group block bg-white/[0.03] backdrop-blur-[2px] hover:bg-maker-900 hover:backdrop-blur-none rounded-xl overflow-hidden shadow-lg hover:shadow-accent-500/25 transition-all duration-500 border border-white/10 hover:border-accent-500/50 hover:-translate-y-1.5"
    >
      <div ref={cardRef} className="relative aspect-square overflow-hidden bg-slate-800">
        {!isLoaded && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] skew-x-12" />
            <div className="absolute inset-0 flex items-center justify-center text-slate-700">
              <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}

        {isInView && (
          <img
            src={imageUrl}
            alt={print.imageAlts[0] || `3D print: ${print.title}`}
            className={`w-full h-full object-cover transition-all duration-700 ease-out 
              ${isLoaded ? 'opacity-90 grayscale-0 scale-100' : 'opacity-0 scale-110'} 
              group-hover:opacity-100 group-hover:scale-105`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        )}
        
        {/* Subtitle overlay on hover for a premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
           <span className="text-white font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Project Details</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-accent-500 transition-colors line-clamp-1">
            {print.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 text-[9px]">
          <span className="px-2.5 py-1 bg-white/5 text-slate-300 rounded-md font-black border border-white/5 group-hover:bg-white/10 transition-colors uppercase tracking-[0.1em]">
            {print.category}
          </span>
          {print.materials.slice(0, 2).map(mat => (
            <span key={mat} className="px-2.5 py-1 bg-accent-500/10 text-accent-400 rounded-md font-black border border-accent-500/20 group-hover:bg-accent-500/20 transition-colors uppercase tracking-[0.1em]">
              {mat}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Link>
  );
};

export default PrintCard;