import { BusinessInfo } from '../types';

export function injectStructuredSchema(business: BusinessInfo, appUrl: string): void {
  // Remove existing schema if any
  const existingScript = document.getElementById('sm-tours-schema');
  if (existingScript) {
    existingScript.remove();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${appUrl || window.location.origin}/#agency`,
    "name": business.name,
    "description": "Luxurious domestic and international tailor-made tours, flights, and expedited visa processing boutique in Hyderabad.",
    "url": appUrl || window.location.origin,
    "telephone": business.phone,
    "email": business.email,
    "priceRange": "₹₹",
    "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Moosarambagh, Malakpet",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3712",
      "longitude": "78.5137"
    },
    "founder": {
      "@type": "Person",
      "name": business.contactPerson
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": business.phone,
      "contactType": "customer service",
      "email": business.email,
      "availableLanguage": ["English", "Hindi", "Telugu"]
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com"
    ]
  };

  const script = document.createElement('script');
  script.id = 'sm-tours-schema';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

export function updatePageMeta(title: string, description: string, url: string = ''): void {
  document.title = title;
  
  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Update OpenGraph Titles & Descriptions
  const ogProps = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80' },
    { property: 'og:url', content: url || window.location.href },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80' }
  ];

  ogProps.forEach(prop => {
    const selector = prop.property 
      ? `meta[property="${prop.property}"]` 
      : `meta[name="${prop.name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      if (prop.property) element.setAttribute('property', prop.property);
      if (prop.name) element.setAttribute('name', prop.name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', prop.content);
  });
}

// Generate Static Sitemap and Robots.txt files contents (for developer's export/use)
export function getStaticSitemapText(appUrl: string): string {
  const base = appUrl || 'https://sm-travels.com';
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${base}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${base}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${base}/packages</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${base}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
}

export function getStaticRobotsText(appUrl: string): string {
  const base = appUrl || 'https://sm-travels.com';
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml`;
}
