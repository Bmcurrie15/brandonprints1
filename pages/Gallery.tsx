import React, { useState, useMemo } from 'react';
import { usePrints } from '../hooks/usePrints';
import { FilterState } from '../types';
import PrintCard from '../components/PrintCard';
import FilterBar from '../components/FilterBar';
import { LoadingSpinner } from '../components/LoadingState';
import SEO from '../components/SEO';

const Gallery: React.FC = () => {
  const { prints, materials, loading } = usePrints();
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    material: 'All',
    search: '',
    sortBy: 'newest'
  });

  const filteredAndSortedPrints = useMemo(() => {
    // 1. Filter the prints first
    let result = prints.filter(print => {
      const matchCat = filters.category === 'All' || print.category === filters.category;
      const matchMat = filters.material === 'All' || print.materials.includes(filters.material);
      const matchSearch = print.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          print.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchCat && matchMat && matchSearch;
    });

    // 2. Sort the filtered result
    const sorted = [...result];

    switch (filters.sortBy) {
      case 'newest':
        return sorted.reverse();
      case 'oldest':
        return sorted;
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [prints, filters]);

  return (
    <div className="space-y-12 min-h-[60vh]">
      <SEO 
        title="Project Gallery | Brandon Prints"
        description="Browse a complete gallery of 3D printed projects by Brandon Currie, filtered by category and material."
      />

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">Project Archive</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Browse through functional builds, gifts, and experimental models.</p>
      </div>

      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        availableMaterials={materials} 
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPrints.map(print => (
                <PrintCard key={print.slug} print={print} />
                ))}
            </div>
            {!loading && filteredAndSortedPrints.length === 0 && (
                <div className="text-center py-20 text-slate-500 bg-maker-900/20 rounded-2xl border border-dashed border-white/10 animate-in fade-in zoom-in duration-300">
                    <p className="text-lg font-medium">No results found for these filters.</p>
                    <button 
                      onClick={() => setFilters({ category: 'All', material: 'All', search: '', sortBy: 'newest' })}
                      className="mt-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-accent-500 hover:bg-accent-500 hover:text-white transition-all text-sm font-bold"
                    >
                      Reset All Filters
                    </button>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default Gallery;