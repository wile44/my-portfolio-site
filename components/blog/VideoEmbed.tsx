'use client';

import { useEffect, useState } from 'react';

interface VideoEmbedProps {
  url: string;
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadEmbed = async () => {
      try {
        // Check if it's a TikTok URL
        if (url.includes('tiktok.com')) {
          const response = await fetch(
            `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
          );
          const data = await response.json();
          setEmbedHtml(data.html);
        }
        // Check if it's an Instagram URL
        else if (url.includes('instagram.com')) {
          // Instagram embeds work with their embed URL structure
          const postMatch = url.match(/\/p\/([A-Za-z0-9_-]+)/);
          const reelMatch = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
          const videoId = postMatch?.[1] || reelMatch?.[1];

          if (videoId) {
            setEmbedHtml(
              `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${videoId}/" data-instgrm-version="14"></blockquote>`
            );
            // Load Instagram embed script
            const script = document.createElement('script');
            script.src = '//www.instagram.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
          }
        }
        // YouTube
        else if (url.includes('youtube.com') || url.includes('youtu.be')) {
          let videoId = '';
          if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
          } else {
            const match = url.match(/[?&]v=([^&]+)/);
            videoId = match?.[1] || '';
          }
          if (videoId) {
            setEmbedHtml(
              `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            );
          }
        }
        // Vimeo
        else if (url.includes('vimeo.com')) {
          const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
          if (videoId) {
            setEmbedHtml(
              `<iframe src="https://player.vimeo.com/video/${videoId}" width="100%" height="500" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
            );
          }
        }
        // Generic iframe fallback
        else {
          setEmbedHtml(
            `<iframe src="${url}" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`
          );
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading video embed:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadEmbed();
  }, [url]);

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-secondary/30 rounded-lg animate-pulse flex items-center justify-center mb-8">
        <p className="text-foreground/50">Loading video...</p>
      </div>
    );
  }

  if (error || !embedHtml) {
    return (
      <div className="w-full p-8 bg-secondary/30 rounded-lg mb-8 text-center">
        <p className="text-foreground/70 mb-4">Unable to load video embed</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Watch on platform →
        </a>
      </div>
    );
  }

  return (
    <div
      className="w-full mb-8 rounded-lg overflow-hidden"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
}
