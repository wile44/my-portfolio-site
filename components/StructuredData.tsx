import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: 'Software Engineer',
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.author.email,
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.twitter,
    ],
    knowsAbout: [
      'Software Engineering',
      'Full-Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Cloud Technologies',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
