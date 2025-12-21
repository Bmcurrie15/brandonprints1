import React from 'react';
import { FilterState, SortOption } from '../types';
import { CONFIG } from '../config';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableMaterials: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, availableMaterials }) => {
  return (
    <div className="space-y-6 md:sticky md:top-20 z-40">
      {/* 1. Category Tabs - Clean & Horizontal */}
      <div className="flex items-center justify-center border-b border-white/5 pb-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-8 px-4">
          {CONFIG.CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
              className={`relative pb-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                filters.category === cat
                  ? 'text-accent-500'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
              {filters.category === cat && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-500 shadow-[0_-2px_8px_rgba(249,115,22,0.5)] animate-in fade-in slide-in-from-bottom-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Utility Row - Minimalist Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-maker-900/40 backdrop-blur-md p-2 rounded-2xl border border-white/5 shadow-2xl">
        
        {/* Search - Expanding Style */}
        <div className="relative w-full md:flex-grow">
          <input 
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none focus:ring-0 text-sm text-slate-200 placeholder-slate-600 font-medium"
          />
          <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto px-2 pb-2 md:pb-0">
          {/* Material Select */}
          <div className="relative flex-1 md:flex-none">
            <select
              value={filters.material}
              onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
              className="w-full md:w-40 pl-8 pr-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 uppercase tracking-tighter appearance-none cursor-pointer transition-colors focus:outline-none focus:border-accent-500/50"
            >
              {availableMaterials.map(m => (
                <option key={m} value={m} className="bg-maker-900 text-slate-200">{m === 'All' ? 'Materials' : m}</option>
              ))}
            </select>
            <svg className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-accent-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>

          {/* Sort Select */}
          <div className="relative flex-1 md:flex-none">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
              className="w-full md:w-40 pl-8 pr-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 uppercase tracking-tighter appearance-none cursor-pointer transition-colors focus:outline-none focus:border-accent-500/50"
            >
              <option value="newest" className="bg-maker-900 text-slate-200">Recent First</option>
              <option value="oldest" className="bg-maker-900 text-slate-200">Oldest First</option>
              <option value="alphabetical" className="bg-maker-900 text-slate-200">A - Z</option>
            </select>
            <svg className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-accent-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;