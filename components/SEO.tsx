import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: 'WebSite' | 'Person' | 'Article' | 'Product' | 'LocalBusiness';
  image?: string;
  path?: string;
  schemaOverride?: object; // New prop for custom JSON-LD
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  name = "Brandon",
  type = 'WebSite',
  image,
  path = '',
  schemaOverride
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Open Graph (Social) Tags
    const setMeta = (property: string, content: string) => {
        let element = document.querySelector(`meta[property='${property}']`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    if (image) setMeta('og:image', image);
    
    let ogType = 'website';
    if (type === 'Person') ogType = 'profile';
    if (type === 'Article') ogType = 'article';
    setMeta('og:type', ogType);

    // 4. Inject JSON-LD Structured Data (The "Secret Weapon" for SEO)
    let schema: object;

    if (schemaOverride) {
      // Use the custom schema provided by the page
      schema = schemaOverride;
    } else {
      // Default fallback generation
      schema = {
        "@context": "https://schema.org",
        "@type": type,
        "name": name,
        "url": window.location.href,
        "description": description,
        ...(type === 'Person' && {
          "jobTitle": "3D Modeler & Maker",
          "email": "bmcurrie15@gmail.com",
          "knowsAbout": ["3D Printing", "CAD Design", "Prototyping", "Additive Manufacturing"]
        }),
        ...(image && { "image": image })
      };
    }

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

  }, [title, description, name, type, image, path, schemaOverride]);

  return null;
};

export default SEO;