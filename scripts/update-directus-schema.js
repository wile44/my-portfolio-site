// Script to add articles collection to Directus
// Run this in your Directus admin panel or with directus CLI

const newCollections = [
  {
    collection: 'articles',
    meta: {
      accountability: 'all',
      archive_app_filter: true,
      archive_field: 'status',
      archive_value: 'draft',
      collapse: 'open',
      collection: 'articles',
      color: '#06B6D4',
      display_template: '{{title}} - {{type}}',
      group: null,
      hidden: false,
      icon: 'article',
      singleton: false,
      sort: null,
      sort_field: 'published_at',
      translations: null,
      unarchive_value: 'published',
      versioning: false
    },
    schema: {
      name: 'articles'
    }
  }
];

const articleFields = [
  {
    collection: 'articles',
    field: 'title',
    type: 'string',
    meta: {
      interface: 'input',
      required: true,
      sort: 1,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'slug',
    type: 'string',
    meta: {
      interface: 'input',
      required: true,
      sort: 2,
      width: 'half'
    }
  },
  {
    collection: 'articles',
    field: 'type',
    type: 'string',
    meta: {
      interface: 'select-dropdown',
      required: true,
      sort: 3,
      width: 'half',
      options: {
        choices: [
          { text: 'Article', value: 'article' },
          { text: 'Video', value: 'video' }
        ]
      }
    }
  },
  {
    collection: 'articles',
    field: 'excerpt',
    type: 'text',
    meta: {
      interface: 'input-multiline',
      required: true,
      sort: 4,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'content',
    type: 'text',
    meta: {
      interface: 'input-rich-text-html',
      required: true,
      sort: 5,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'image',
    type: 'uuid',
    meta: {
      interface: 'file-image',
      required: false,
      sort: 6,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'video_url',
    type: 'string',
    meta: {
      interface: 'input',
      required: false,
      sort: 7,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'external_url',
    type: 'string',
    meta: {
      interface: 'input',
      required: false,
      sort: 8,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'tags',
    type: 'json',
    meta: {
      interface: 'tags',
      required: false,
      sort: 9,
      width: 'full'
    }
  },
  {
    collection: 'articles',
    field: 'published_at',
    type: 'timestamp',
    meta: {
      interface: 'datetime',
      required: true,
      sort: 10,
      width: 'half'
    }
  },
  {
    collection: 'articles',
    field: 'read_time',
    type: 'string',
    meta: {
      interface: 'input',
      required: false,
      sort: 11,
      width: 'half'
    }
  },
  {
    collection: 'articles',
    field: 'featured',
    type: 'boolean',
    meta: {
      interface: 'boolean',
      required: false,
      sort: 12,
      width: 'half'
    }
  },
  {
    collection: 'articles',
    field: 'status',
    type: 'string',
    meta: {
      interface: 'select-dropdown',
      required: true,
      sort: 13,
      width: 'half',
      options: {
        choices: [
          { text: 'Draft', value: 'draft' },
          { text: 'Published', value: 'published' }
        ]
      }
    }
  }
];

console.log('Directus Schema Update Required:');
console.log('1. Create articles collection');
console.log('2. Add fields: title, slug, type, excerpt, content, image, video_url, external_url, tags, published_at, read_time, featured, status');
console.log('3. Update skills collection categories to include: Creative & Media, Design & UX, Content Creation');

// SQL for manual creation if needed
const sqlCommands = `
-- Create articles collection
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('article', 'video')),
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image UUID REFERENCES directus_files(id),
  video_url VARCHAR(500),
  external_url VARCHAR(500),
  tags JSON,
  published_at TIMESTAMP NOT NULL,
  read_time VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update skills collection categories
UPDATE skills SET category = 'Creative & Media' WHERE name IN ('Video Editing', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva');
UPDATE skills SET category = 'Design & UX' WHERE name IN ('Figma', 'UI/UX Design', 'Prototyping', 'Wireframing', 'User Research', 'Responsive Design', 'Design Systems', 'Adobe XD');
UPDATE skills SET category = 'Content Creation' WHERE name IN ('YouTube Channel Management', 'Content Strategy', 'SEO for YouTube', 'Thumbnail Design', 'Script Writing', 'Voice Recording', 'Live Streaming', 'Community Management');
`;

console.log('\nSQL Commands for manual update:');
console.log(sqlCommands);