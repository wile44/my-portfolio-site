'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

const articles: Article[] = [
  {
    slug: 'the-future-of-ai-in-software-development',
    title: 'The Future of AI in Software Development',
    excerpt: 'Exploring how artificial intelligence is transforming the way we write, test, and deploy software.',
    content: `
      <h2>The AI Revolution in Development</h2>
      <p>Artificial intelligence is revolutionizing software development in ways we could only imagine a few years ago. From code completion to automated testing, AI is becoming an indispensable tool for developers worldwide.</p>
      
      <h3>Current Applications</h3>
      <p>Today, AI is being used in several key areas of software development:</p>
      <ul>
        <li><strong>Code Completion:</strong> Tools like GitHub Copilot and Tabnine are making developers more efficient by suggesting entire code blocks based on context.</li>
        <li><strong>Bug Detection:</strong> AI-powered static analysis tools can identify potential bugs and security vulnerabilities before code reaches production.</li>
        <li><strong>Automated Testing:</strong> AI can generate test cases, predict where bugs might occur, and even write test scripts automatically.</li>
        <li><strong>Code Review:</strong> AI assistants can review code for style, security, and performance issues, reducing the burden on human reviewers.</li>
      </ul>
      
      <h3>The Impact on Developer Productivity</h3>
      <p>Studies show that developers using AI-powered tools can be up to 55% more productive. This isn&apos;t just about writing code faster—it&apos;s about writing better code with fewer bugs and security issues.</p>
      
      <h3>Future Developments</h3>
      <p>Looking ahead, we can expect AI to handle even more complex tasks:</p>
      <ul>
        <li>Full-stack application generation from natural language descriptions</li>
        <li>Automated refactoring of legacy codebases</li>
        <li>Real-time code optimization during development</li>
        <li>Intelligent debugging that can identify and fix issues automatically</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>The integration of AI into software development isn&apos;t about replacing developers—it&apos;s about augmenting human capabilities. The future belongs to developers who can effectively collaborate with AI tools to build better software faster.</p>
    `,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    publishedAt: '2024-08-10',
    readTime: '8 min read',
    tags: ['AI', 'Software Development', 'Future Tech', 'Productivity'],
    author: {
      name: 'Goodluck Wile',
      avatar: '/avatar.jpg'
    },
    category: 'Technology'
  },
  {
    slug: 'mastering-typescript-for-large-scale-applications',
    title: 'Mastering TypeScript for Large Scale Applications',
    excerpt: 'Learn advanced TypeScript patterns and best practices for building maintainable large-scale applications.',
    content: `
      <h2>Why TypeScript Matters at Scale</h2>
      <p>As applications grow in complexity, TypeScript becomes not just beneficial, but essential for maintaining code quality and developer productivity. This article explores advanced patterns and best practices for using TypeScript in large-scale applications.</p>
      
      <h3>Advanced Type Patterns</h3>
      <p>When building large applications, these TypeScript patterns become invaluable:</p>
      <ul>
        <li><strong>Generic Constraints:</strong> Create flexible yet type-safe utilities</li>
        <li><strong>Conditional Types:</strong> Build type systems that adapt based on input</li>
        <li><strong>Template Literal Types:</strong> Create precise string type definitions</li>
        <li><strong>Discriminated Unions:</strong> Handle complex state management elegantly</li>
      </ul>
      
      <h3>Architecture Patterns</h3>
      <p>Large applications benefit from these architectural approaches:</p>
      <ul>
        <li>Monorepo structures with shared types</li>
        <li>Layered architecture with clear boundaries</li>
        <li>API-first development with type generation</li>
        <li>Domain-driven design with TypeScript</li>
      </ul>
      
      <h3>Performance Considerations</h3>
      <p>As your codebase grows, performance becomes crucial:</p>
      <ul>
        <li>Using project references for faster compilation</li>
        <li>Implementing incremental builds</li>
        <li>Optimizing type checking performance</li>
        <li>Managing declaration file complexity</li>
      </ul>
      
      <h3>Testing Strategies</h3>
      <p>Effective testing in TypeScript applications:</p>
      <ul>
        <li>Using utility types for test fixtures</li>
        <li>Creating type-safe test doubles</li>
        <li>Implementing contract testing</li>
        <li>Type-driven testing approaches</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Mastering TypeScript for large-scale applications requires understanding not just the language features, but how to apply them effectively in architectural patterns. The investment in proper TypeScript usage pays dividends in maintainability and developer experience.</p>
    `,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80',
    publishedAt: '2024-08-05',
    readTime: '12 min read',
    tags: ['TypeScript', 'Best Practices', 'Architecture', 'JavaScript'],
    author: {
      name: 'Goodluck Wile',
      avatar: '/avatar.jpg'
    },
    category: 'Development'
  }
];

export default function ArticleDetails() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === params.slug);
    setArticle(foundArticle || null);
  }, [params.slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-accent/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {article.title}
            </h1>
            
            <p className="text-xl text-foreground/70 mb-8">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{article.author.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="mb-12">
            <Image
              src={article.image}
              alt={article.title}
              width={1200}
              height={600}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <button
              onClick={shareArticle}
              className="flex items-center gap-2 px-4 py-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </main>

      {/* Related Articles */}
      <section className="bg-accent/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles
              .filter(a => a.slug !== article.slug && a.category === article.category)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/articles/${relatedArticle.slug}`}
                  className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-foreground/70">
                    <span>{relatedArticle.readTime}</span>
                    <span>{relatedArticle.publishedAt}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}