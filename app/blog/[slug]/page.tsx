import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/directus-server';
import BlogPost from '@/components/blog/BlogPost';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt || undefined,
    openGraph: article.image
      ? {
          images: [
            {
              url: article.image,
              alt: article.title,
            },
          ],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogPost article={article} />;
}
