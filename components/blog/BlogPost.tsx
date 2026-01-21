import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/directus';
import { formatDate, getAssetUrl } from '@/lib/directus-utils';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import VideoEmbed from './VideoEmbed';

interface BlogPostProps {
  article: Article;
}

export default function BlogPost({ article }: BlogPostProps) {
  const isVideo = article.type === 'video' && article.video_url;
  const isExternal = !!article.external_url;

  return (
    <article className="min-h-screen bg-background">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      {article.image && (
        <div className="relative w-full h-[400px] mb-12">
          <Image
            src={getAssetUrl(article.image)}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>

          {article.excerpt && (
            <p className="text-xl text-foreground/70 mb-6">{article.excerpt}</p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-foreground/60 text-sm">
            {article.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.published_at}>
                  {formatDate(article.published_at)}
                </time>
              </div>
            )}
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* External Link */}
        {isExternal && (
          <a
            href={article.external_url!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mb-8 font-medium"
          >
            Read Full Article
            <ExternalLink className="w-5 h-5" />
          </a>
        )}

        {/* Video Embed */}
        {isVideo && <VideoEmbed url={article.video_url!} />}

        {/* Article Content */}
        {article.content && (
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </div>
    </article>
  );
}
