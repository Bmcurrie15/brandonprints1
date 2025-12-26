import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CONFIG, getEmailLink } from '../config';

const MakerMessage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 cursor-default" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-14 left-0 w-64 bg-maker-900/95 backdrop-blur-md border border-accent-500/30 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
         <div className="absolute -top-2 left-3 w-4 h-4 bg-maker-900/95 border-t border-l border-accent-500/30 transform rotate-45"></div>
         <p className="text-sm text-slate-200 relative z-10 leading-relaxed">
           Looking to bring your idea to life? <br />
           Click <span className="text-accent-500 font-bold">"Email Me"</span> right over there! 👉
         </p>
      </div>
    </>
  );
};

const FilamentScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      const scrollable = documentHeight - windowHeight;
      const percent = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map scroll percentage to "Slicer Status"
  const getSlicerStatus = (p: number) => {
    if (p <= 2) return "G28: Homing...";
    if (p <= 8) return "Bed Leveling";
    if (p <= 15) return "Printing Brim";
    if (p <= 25) return "Walls: 1/3";
    if (p <= 45) return "Infill: 15%";
    if (p <= 65) return "Infill: 40%";
    if (p <= 85) return "Walls: 3/3";
    if (p <= 95) return "Top Surface";
    if (p < 100) return "Ironing...";
    return "Print Finished";
  };

  return (
    // Restricted to large screens to ensure no overcrowding on mobile
    <div className="hidden lg:flex fixed right-8 bottom-10 z-[60] flex-col items-center pointer-events-none select-none">
      
      {/* Scroll Status Terminal */}
      <div className="mb-4 flex flex-col items-end">
        <div className="text-[10px] font-mono text-accent-500 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-accent-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
          {getSlicerStatus(scrollPercent)}
        </div>
        <div className="text-[9px] font-mono text-slate-500 mt-1.5 tracking-tighter">
          Z: {(scrollPercent * 0.2).toFixed(2)}mm
        </div>
      </div>

      {/* The Filament Line - builds UP from the spool */}
      <div className="h-32 w-1.5 bg-white/5 rounded-full overflow-hidden relative mb-2 flex flex-col justify-end border border-white/5 shadow-inner">
        <div 
          className="w-full bg-accent-500 shadow-[0_0_15px_rgba(249,115,22,0.7)] rounded-full transition-all duration-300 ease-out"
          style={{ 
            height: `${scrollPercent}%`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

      {/* Reverted to the cleaner, simpler spool design (Iteration 2 style) */}
      <div className="relative w-14 h-14">
        <div 
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ transform: `rotate(${scrollPercent * 7.2}deg)` }}
        >
          {/* Spool Base (The Plastic Rim) */}
          <div className="absolute inset-0 border-[4px] border-slate-800 rounded-full bg-maker-950 shadow-2xl"></div>
          
          {/* Spool Filament (The "Coiled" Texture using dotted borders) */}
          <div className="absolute inset-[4px] rounded-full border-[6px] border-accent-500 border-dotted opacity-90 scale-95"></div>
          <div className="absolute inset-[8px] rounded-full border-[4px] border-accent-600 border-dotted opacity-50 scale-75"></div>
          
          {/* Center Hub / Spindle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center shadow-lg">
             <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
          </div>
          
          {/* Visual Rotation Markers */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[2px] h-2.5 bg-slate-700 rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[2px] h-2.5 bg-slate-700 rounded-full"></div>
        </div>

        {/* Static Filament Guide (Static exit point) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-slate-800 rounded-b-lg border-b border-x border-slate-700"></div>
      </div>
      
      {/* Tech Label */}
      <div className="mt-3 text-[8px] font-mono font-bold text-slate-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
        PLA PRO / 1.75mm
      </div>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const location = useLocation();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-accent-500' : 'text-slate-400 hover:text-white'
    }`;

  return (
    <div className="flex flex-col min-h-screen relative font-sans text-slate-200">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-maker-950/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex-shrink-0 flex items-center gap-3 relative">
              <div className="relative">
                <button 
                  onClick={() => setShowAvatarPopup(!showAvatarPopup)}
                  className="block focus:outline-none group"
                >
                  <img 
                     src={CONFIG.AVATAR_URL}
                     alt="Brandon Avatar"
                     className="h-10 w-10 rounded-full bg-slate-800 border-2 border-accent-500/50 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
                <MakerMessage isOpen={showAvatarPopup} onClose={() => setShowAvatarPopup(false)} />
              </div>

              <div className="relative group flex flex-col pt-1">
                <Link to="/" className="relative z-10 text-xl font-bold tracking-tight text-white hover:text-accent-500 transition-colors">
                  Brandon<span className="text-accent-500">Prints</span>
                </Link>
                
                <div 
                  key={location.pathname}
                  className="absolute -bottom-1.5 -left-1 w-[calc(100%+12px)] flex items-center z-0 pointer-events-none select-none -rotate-2 origin-left opacity-90"
                >
                  <div className="w-3.5 h-2 bg-accent-500 rounded-[60%_40%_50%_50%/60%_50%_50%_40%] shadow-[0_1px_2px_rgba(0,0,0,0.4)] animate-[pop_0.4s_ease-out_forwards] flex-shrink-0 z-10"></div>
                  <div className="relative h-[2.5px] flex-grow -ml-1.5 bg-accent-500 rounded-r-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] animate-[extrude_1s_cubic-bezier(0.45,0,0.55,1)_forwards] origin-left">
                     <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent rounded-r-full opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8 items-center">
              {CONFIG.NAV_LINKS.map(link => (
                <NavLink key={link.path} to={link.path} className={navClass}>{link.label}</NavLink>
              ))}
              <a 
                href={getEmailLink()} 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  showAvatarPopup 
                    ? 'text-white bg-accent-600 shadow-[0_0_25px_rgba(249,115,22,0.5)] scale-105 ring-2 ring-accent-400 ring-offset-2 ring-offset-maker-950' 
                    : 'text-white bg-white/10 border border-white/10 hover:bg-white/20'
                }`}
              >
                Email Me
              </a>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-maker-900 border-b border-white/10 absolute w-full px-4 pt-2 pb-6 space-y-4 flex flex-col items-center shadow-2xl">
            {CONFIG.NAV_LINKS.map(link => (
              <NavLink key={link.path} to={link.path} className={navClass} onClick={() => setIsMenuOpen(false)}>{link.label}</NavLink>
            ))}
            <a href={getEmailLink()} className="px-6 py-2 text-sm font-medium rounded-full w-full text-center bg-accent-600 text-white">
              Email Me
            </a>
          </div>
        )}

        <style>{`
          @keyframes extrude {
            0% { transform: scaleX(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: scaleX(1); opacity: 1; }
          }
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.4); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </header>

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {children}
      </main>

      {/* The Tactile Scroll Progress Spool - Simplified visual style, Desktop Only */}
      <FilamentScrollProgress />

      <footer className="w-full bg-maker-950/50 border-t border-white/5 py-8 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Brandon Prints. Built for the love of making.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs font-medium uppercase tracking-wider">
            <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Located in Leonardtown, Maryland
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;