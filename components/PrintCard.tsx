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
      className="group block bg-maker-900/20 backdrop-blur-[2px] hover:bg-maker-900 hover:backdrop-blur-none rounded-xl overflow-hidden shadow-lg hover:shadow-accent-500/20 transition-all duration-300 border border-white/10 hover:border-accent-500/40 hover:-translate-y-1"
    >
      <div ref={cardRef} className="relative aspect-square overflow-hidden bg-white/5">
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
              ${isLoaded ? 'opacity-60 grayscale-[30%] scale-100' : 'opacity-0 scale-110'} 
              group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-200 group-hover:text-accent-500 transition-colors line-clamp-1 shadow-black drop-shadow-md">
            {print.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px]">
          <span className="px-2 py-0.5 bg-white/5 text-slate-400 rounded-md font-medium border border-white/5 group-hover:bg-white/10 transition-colors uppercase tracking-wider">
            {print.category}
          </span>
          {print.materials.map(mat => (
            <span key={mat} className="px-2 py-0.5 bg-accent-500/10 text-accent-500 rounded-md font-medium border border-accent-500/20 group-hover:bg-accent-500/20 transition-colors uppercase tracking-wider">
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