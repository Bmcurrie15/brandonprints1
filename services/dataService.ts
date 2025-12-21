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
  }
];

/**
 * Generates a URL-safe slug from a string.
 */
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start
    .replace(/-+$/, '');      // Trim - from end
};

export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  if (!url) return '';
  if (!CONFIG.CLOUDINARY_CLOUD_NAME) return url;
  const transformations = `f_auto,q_auto,w_${width},c_limit`;
  return `https://res.cloudinary.com/${CONFIG.CLOUDINARY_CLOUD_NAME}/image/fetch/${transformations}/${encodeURIComponent(url)}`;
};

export const parseGoogleDriveLink = (url: string): string => {
  if (!url) return '';
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
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
    if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else current += char;
  }
  result.push(current.trim());
  return result;
};

export const fetchPrints = async (): Promise<Print[]> => {
  const SHEET_URL = CONFIG.GOOGLE_SHEET_URL;
  if (!SHEET_URL) return FALLBACK_DATA;

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error(`Failed to fetch sheet`);
    
    const text = await response.text();
    // Use regex to split by newline while handling potential \r\n from Windows
    const rows = text.split(/\r?\n/).filter(row => row.trim().length > 0).slice(1);

    const parsedPrints = rows.map(row => {
        const cols = parseCSVLine(row);
        // Column mapping: 0:slug, 1:title, 2:desc, 3:cat, 4:mat, 5:purp, 6:notes, 7:feat, 8:imgs, 9:alts
        const title = cols[1]?.trim();
        if (!title) return null;

        // Force slugify even if slug is provided to ensure URL safety
        const rawSlug = cols[0]?.trim();
        const slug = (rawSlug && rawSlug.length > 0) ? slugify(rawSlug) : slugify(title);

        return {
            slug,
            title,
            description: cols[2] || '',
            category: cols[3] || 'General',
            materials: cols[4]?.split('|').map(m => m.trim()).filter(Boolean) || [],
            purpose: cols[5] || '',
            notes: cols[6] || '',
            featured: cols[7]?.trim().toUpperCase() === 'TRUE',
            images: cols[8]?.split('|').map(url => parseGoogleDriveLink(url.trim())).filter(Boolean) || [],
            imageAlts: cols[9]?.split('|').map(alt => alt.trim()).filter(Boolean) || []
        } as Print;
    }).filter((p): p is Print => p !== null && p.slug.length > 0);

    return parsedPrints.length > 0 ? parsedPrints : FALLBACK_DATA;
  } catch (error) {
    console.warn("Spreadsheet error, using fallback.", error);
    return FALLBACK_DATA;
  }
};