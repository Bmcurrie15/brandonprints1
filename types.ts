
export interface Print {
  slug: string;
  title: string;
  description: string;
  category: 'Sports' | 'Gifts' | 'Functional' | 'Decorative' | string;
  materials: string[]; 
  purpose: 'gift' | 'personal' | 'custom' | string;
  notes: string;
  featured: boolean;
  images: string[];
  imageAlts: string[];
}

export type CategoryOption = 'All' | 'Sports' | 'Gifts' | 'Functional' | 'Decorative';

export type SortOption = 'newest' | 'oldest' | 'alphabetical';

export interface FilterState {
  category: CategoryOption | string;
  material: string;
  search: string;
  sortBy: SortOption;
}

export const EMAIL_LINK = "mailto:bmcurrie15@gmail.com?subject=Custom%203D%20print%20request";
