import { Print } from '../types';
import { CONFIG } from '../config';

const FALLBACK_DATA: Print[] = [
  {
    slug: 'geometric-planter',
    title: 'Low-Poly Planter',
    description: 'A modern geometric planter designed for succulents. Features internal drainage mesh.',
    category: 'Decorative',
    materials: ['Matte PLA'],
    purpose: 'gift',
    notes: '0.2mm layer height, 15% infill',
    featured: true,
    images: ['https://picsum.photos/id/106/800/600', 'https://picsum.photos/id/106/800/800'],
    imageAlts: ['Front view of planter', 'Top detail view']
  },
  {
    slug: 'headphone-stand',
    title: 'Desk Clamp Headphone Stand',
    description: 'Rugged screw-clamp headphone holder to save desk space.',
    category: 'Functional',
    materials: ['PETG'],
    purpose: 'personal',
    notes: 'Printed with 4 perimeters for strength',
    featured: true,
    images: ['https://picsum.photos/id/250/800/600'],
    imageAlts: ['Mounted on desk']
  },
  {
    slug: 'golf-ball-marker',
    title: 'Custom Golf Marker',
    description: 'Personalized monogram ball marker for the green.',
    category: 'Sports',
    materials: ['PLA Silk', 'Multi-Color'],
    purpose: 'custom',
    notes: 'Multi-color print swap at layer 15',
    featured: true,
    images: ['https://picsum.photos/id/433/800/600'],
    imageAlts: ['Marker on grass']
  },
  {
    slug: 'lithophane-box',
    title: 'Lithophane Light Box',
    description: 'A personalized photo box that reveals a detailed image when lit from within. Perfect for weddings or memorials.',
    category: 'Gifts',
    materials: ['White PLA'],
    purpose: 'gift',
    notes: 'Printed vertically at 0.12mm layer height for high resolution.',
    featured: true,
    images: ['https://picsum.photos/id/30/800/800'],
    imageAlts: ['Lit lithophane showing a family portrait']
  }
];

/**
 * Optimizes an image URL using Cloudinary Fetch API if configured.
 * Otherwise returns the original URL.
 */
export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  if (!url) return '';
  if (!CONFIG.CLOUDINARY_CLOUD_NAME) return url;
  
  // Cloudinary Fetch URL format: 
  // https://res.cloudinary.com/[cloud_name]/image/fetch/[transformations]/[remote_url]
  const transformations = `f_auto,q_auto,w_${width},c_limit`;
  return `https://res.cloudinary.com/${CONFIG.CLOUDINARY_CLOUD_NAME}/image/fetch/${transformations}/${encodeURIComponent(url)}`;
};

export const parseGoogleDriveLink = (url: string): string => {
  if (!url) return '';
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    // Return the high-res thumbnail link which we can then proxy through Cloudinary
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`; 
  }
  return url;
};

const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

const toCSVCell = (val: string | boolean | undefined) => {
    const stringVal = String(val ?? '');
    if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
    }
    return stringVal;
}

export const getCSVTemplate = (): string => {
  const headers = ['slug', 'title', 'description', 'category', 'material', 'purpose', 'notes', 'featured', 'images', 'imageAlts'];
  
  const rows = FALLBACK_DATA.map(print => {
    return [
      toCSVCell(print.slug),
      toCSVCell(print.title),
      toCSVCell(print.description),
      toCSVCell(print.category),
      toCSVCell(print.materials.join('|')),
      toCSVCell(print.purpose),
      toCSVCell(print.notes),
      toCSVCell(print.featured ? 'TRUE' : 'FALSE'),
      toCSVCell(print.images.join('|')),
      toCSVCell(print.imageAlts.join('|'))
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

export const fetchPrints = async (): Promise<Print[]> => {
  const SHEET_URL = CONFIG.GOOGLE_SHEET_URL;

  if (!SHEET_URL) {
    return FALLBACK_DATA;
  }

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    
    const text = await response.text();
    const rows = text.split('\n').filter(row => row.trim().length > 0).slice(1);

    const parsedPrints = rows.map(row => {
        const cols = parseCSVLine(row);
        if (cols.length < 5) return null;

        return {
            slug: cols[0],
            title: cols[1],
            description: cols[2],
            category: cols[3],
            materials: cols[4]?.split('|').map(m => m.trim()).filter(m => m.length > 0) || [],
            purpose: cols[5],
            notes: cols[6],
            featured: cols[7]?.trim().toUpperCase() === 'TRUE',
            images: cols[8]?.split('|').map(url => parseGoogleDriveLink(url.trim())) || [],
            imageAlts: cols[9]?.split('|').map(alt => alt.trim()) || []
        } as Print;
    }).filter((p): p is Print => p !== null);

    return parsedPrints.length > 0 ? parsedPrints : FALLBACK_DATA;

  } catch (error) {
    console.warn("Failed to load Google Sheet data.", error);
    return FALLBACK_DATA;
  }
};