
import { useState, useEffect, useMemo } from 'react';
import { Print } from '../types';
import { fetchPrints } from '../services/dataService';

export const usePrints = () => {
  const [prints, setPrints] = useState<Print[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const load = async () => {
      try {
        const data = await fetchPrints();
        if (isMounted) {
          setPrints(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load prints.');
          setLoading(false);
        }
      }
    };

    load();
    return () => { isMounted = false; };
  }, []);

  const featuredPrints = useMemo(() => 
    prints.filter(p => p.featured), 
  [prints]);

  const materials = useMemo(() => {
    // Flatten all material arrays and get unique tags
    const allTags = prints.flatMap(p => p.materials);
    const set = new Set(allTags);
    return ['All', ...Array.from(set).sort()];
  }, [prints]);

  return { prints, featuredPrints, materials, loading, error };
};
