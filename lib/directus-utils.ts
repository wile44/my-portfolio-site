/**
 * Client-safe Directus utility functions
 * These functions can be used in both client and server components
 */

// Utility function to get asset URL (can be used on server or client)
export function getAssetUrl(assetId: string): string {
  if (!assetId) return '';
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
    return '';
  }
  return `${baseUrl}/assets/${assetId}`;
}

// Utility function to get optimized image URL (can be used on server or client)
export function getOptimizedImageUrl(assetId: string, width?: number, height?: number, quality = 80): string {
  if (!assetId) return '';
  
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
    return '';
  }
  
  const params = new URLSearchParams();
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('quality', quality.toString());
  params.append('format', 'webp');
  
  return `${baseUrl}/assets/${assetId}?${params.toString()}`;
}

// Utility function to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
