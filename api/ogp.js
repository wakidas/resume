// Vercel Edge Function for OGP image fetching
export const config = {
  runtime: 'edge',
};

// Simple in-memory cache (for Edge runtime)
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return new Response(
      JSON.stringify({ error: 'URL parameter is required' }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return new Response(
      JSON.stringify({ ogImage: cached.ogImage }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400'
        }
      }
    );
  }

  try {
    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGPBot/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract OGP image using regex (simpler than parsing HTML in Edge runtime)
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
    
    const twitterImageMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
                             html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);
    
    // For hatena blog, also check JSON-LD
    const jsonLdMatch = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    let jsonLdImage = null;
    
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1]);
        if (jsonLd.image) {
          jsonLdImage = Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image;
        }
      } catch (e) {
        // JSON parse error, ignore
      }
    }

    const ogImage = ogImageMatch?.[1] || twitterImageMatch?.[1] || jsonLdImage;
    
    if (ogImage) {
      // Convert relative URL to absolute if needed
      const absoluteUrl = ogImage.startsWith('http') 
        ? ogImage 
        : new URL(ogImage, url).href;
      
      // Cache the result
      cache.set(url, {
        ogImage: absoluteUrl,
        timestamp: Date.now()
      });
      
      return new Response(
        JSON.stringify({ ogImage: absoluteUrl }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
    
    // No OGP image found
    return new Response(
      JSON.stringify({ ogImage: null }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    
  } catch (error) {
    console.error('Error fetching OGP:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch OGP image',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}