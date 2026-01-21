import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/directus';
import { ExternalLink, Video, FileText } from 'lucide-react';
import { formatDate, getAssetUrl } from '@/lib/directus-utils';

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const isExternal = !!article.external_url;
  const isVideo = article.type === 'video';
  // Use slug if available, otherwise use ID
  const slug = article.slug || article.id;
  const href = isExternal ? article.external_url! : `/blog/${slug}`;
  const Component = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  // Get type icon
  const getTypeIcon = () => {
    if (isExternal) return <ExternalLink className="w-5 h-5" />;
    if (isVideo) return <Video className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <Component
      href={href}
      {...linkProps}
      className="group block bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      {article.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={getAssetUrl(article.image)}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Type badge */}
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
            {getTypeIcon()}
            <span className="capitalize">{isExternal ? 'External' : article.type || 'Article'}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
        )}

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-foreground/60">
          {article.published_at && (
            <time dateTime={article.published_at}>
              {formatDate(article.published_at)}
            </time>
          )}
          {article.author && <span>By {article.author.name}</span>}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Component>
  );
}
