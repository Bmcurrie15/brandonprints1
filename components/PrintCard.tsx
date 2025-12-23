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

  const imageUrl = getOptimizedImageUrl(print.images[0], 600);

  // All Category tags now use the Cyan style
  const categoryStyles = "bg-black/40 text-sky-400 border-sky-500/40 group-hover:border-sky-400/60 group-hover:text-sky-300";
  
  // All Material tags use the Orange style from the screenshot
  const materialStyles = "bg-black/40 text-accent-500 border-accent-600/40 group-hover:border-accent-500/60 group-hover:text-accent-400";

  return (
    <Link 
      to={`/prints/${print.slug}`} 
      className="group block bg-white/[0.03] backdrop-blur-[2px] hover:bg-maker-900 hover:backdrop-blur-none rounded-xl overflow-hidden shadow-lg hover:shadow-accent-500/10 transition-all duration-500 border border-white/10 hover:border-accent-500/30 hover:-translate-y-1.5"
    >
      <div ref={cardRef} className="relative aspect-square overflow-hidden bg-slate-800">
        {!isLoaded && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] skew-x-12" />
          </div>
        )}

        {isInView && (
          <img
            src={imageUrl}
            alt={print.imageAlts[0] || `3D print: ${print.title}`}
            className={`w-full h-full object-cover transition-all duration-700 ease-out 
              ${isLoaded ? 'opacity-100 grayscale-0 scale-100' : 'opacity-0 scale-110'} 
              group-hover:scale-105`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
           <span className="text-white font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Project Details</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-accent-500 transition-colors line-clamp-1">
            {print.title}
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {/* Category Tag - Cyan Style */}
          <span className={`px-2.5 py-1 rounded-lg border font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${categoryStyles}`}>
            {print.category}
          </span>
          
          {/* Material Tags - Orange Style */}
          {print.materials.slice(0, 2).map(mat => (
            <span 
              key={mat} 
              className={`px-2.5 py-1 rounded-lg border font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${materialStyles}`}
            >
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