#!/usr/bin/env node

/**
 * Directus Portfolio Setup Script
 * Automatically creates all required collections, fields, and permissions
 */

// Load environment variables
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  // dotenv not available, try to load manually
  const fs = require('fs');
  const path = require('path');
  try {
    const envPath = path.resolve('.env.local');
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } catch (envError) {
    console.log('⚠️  Could not load .env.local file');
  }
}

const DIRECTUS_URL = 'http://localhost:8055';
// Hardcoded token for proof of concept
const ADMIN_TOKEN = '';

if (!ADMIN_TOKEN) {
  console.error('❌ Error: Admin token not found');
  process.exit(1);
}

// API helper function
async function directusRequest(endpoint, method = 'GET', data = null) {
  const url = `${DIRECTUS_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    return response.status !== 204 ? await response.json() : { success: true };
  } catch (error) {
    console.error(`❌ Request failed: ${method} ${endpoint}`);
    console.error(`   Error: ${error.message}`);
    throw error;
  }
}

// Collection definitions
const collections = [
  {
    collection: 'about',
    meta: {
      singleton: true,
      icon: 'account_box',
      color: '#6366F1',
      display_template: '{{name}} - {{title}}',
      hidden: false,
      translations: [
        {
          language: 'en-US',
          translation: 'About',
          singular: 'About',
          plural: 'About'
        }
      ]
    },
    fields: [
      { field: 'name', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'title', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'description', type: 'text', meta: { required: true, interface: 'input-multiline', display: 'formatted-value', width: 'full' }},
      { field: 'bio', type: 'text', meta: { required: true, interface: 'input-rich-text-html', display: 'formatted-value', width: 'full' }},
      { field: 'email', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'phone', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'location', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'github_url', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'linkedin_url', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'twitter_url', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'resume_url', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'profile_image', type: 'uuid', meta: { interface: 'file-image', display: 'image', width: 'half', special: ['file'] }},
      { field: 'working_hours', type: 'text', meta: { interface: 'input-multiline', display: 'formatted-value', width: 'full' }},
      { field: 'availability_status', type: 'string', meta: { interface: 'select-dropdown', display: 'labels', options: { choices: [{ text: 'Available', value: 'available' }, { text: 'Busy', value: 'busy' }, { text: 'Not Available', value: 'not_available' }] }, width: 'half' }}
    ]
  },
  {
    collection: 'projects',
    meta: {
      icon: 'work',
      color: '#10B981',
      display_template: '{{title}} - {{status}}',
      hidden: false,
      translations: [
        {
          language: 'en-US',
          translation: 'Projects',
          singular: 'Project',
          plural: 'Projects'
        }
      ]
    },
    fields: [
      { field: 'title', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'description', type: 'text', meta: { required: true, interface: 'input-rich-text-html', display: 'formatted-value', width: 'full' }},
      { field: 'short_description', type: 'text', meta: { interface: 'input-multiline', display: 'formatted-value', width: 'full' }},
      { field: 'image', type: 'uuid', meta: { interface: 'file-image', display: 'image', width: 'half', special: ['file'] }},
      { field: 'gallery', type: 'json', meta: { interface: 'files', display: 'related-values', width: 'full', special: ['file'] }},
      { field: 'technologies', type: 'json', meta: { required: true, interface: 'tags', display: 'labels', width: 'full' }},
      { field: 'github_url', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'live_url', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'featured', type: 'boolean', meta: { interface: 'boolean', display: 'boolean', width: 'half', default_value: false }},
      { field: 'status', type: 'string', meta: { required: true, interface: 'select-dropdown', display: 'labels', options: { choices: [{ text: 'Draft', value: 'draft' }, { text: 'Published', value: 'published' }] }, width: 'half', default_value: 'draft' }},
      { field: 'sort', type: 'integer', meta: { interface: 'input', display: 'raw', width: 'half', default_value: 1 }}
    ]
  },
  {
    collection: 'skills',
    meta: {
      icon: 'psychology',
      color: '#F59E0B',
      display_template: '{{name}} ({{category}})',
      hidden: false,
      translations: [
        {
          language: 'en-US',
          translation: 'Skills',
          singular: 'Skill',
          plural: 'Skills'
        }
      ]
    },
    fields: [
      { field: 'name', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'category', type: 'string', meta: { required: true, interface: 'select-dropdown', display: 'labels', options: { choices: [{ text: 'Frontend', value: 'frontend' }, { text: 'Backend', value: 'backend' }, { text: 'Database', value: 'database' }, { text: 'DevOps', value: 'devops' }, { text: 'Tools', value: 'tools' }] }, width: 'half' }},
      { field: 'proficiency', type: 'integer', meta: { required: true, interface: 'slider', display: 'raw', width: 'half', options: { min: 1, max: 100, step: 1 } }},
      { field: 'icon', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'description', type: 'text', meta: { interface: 'input-multiline', display: 'formatted-value', width: 'full' }},
      { field: 'sort', type: 'integer', meta: { interface: 'input', display: 'raw', width: 'half', default_value: 1 }}
    ]
  },
  {
    collection: 'experience',
    meta: {
      icon: 'business_center',
      color: '#8B5CF6',
      display_template: '{{position}} at {{company}}',
      hidden: false,
      translations: [
        {
          language: 'en-US',
          translation: 'Experience',
          singular: 'Experience',
          plural: 'Experience'
        }
      ]
    },
    fields: [
      { field: 'company', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'position', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half' }},
      { field: 'description', type: 'text', meta: { required: true, interface: 'input-rich-text-html', display: 'formatted-value', width: 'full' }},
      { field: 'start_date', type: 'date', meta: { required: true, interface: 'datetime', display: 'datetime', width: 'half' }},
      { field: 'end_date', type: 'date', meta: { interface: 'datetime', display: 'datetime', width: 'half' }},
      { field: 'current', type: 'boolean', meta: { interface: 'boolean', display: 'boolean', width: 'half', default_value: false }},
      { field: 'location', type: 'string', meta: { interface: 'input', display: 'raw', width: 'half' }},
      { field: 'technologies', type: 'json', meta: { interface: 'tags', display: 'labels', width: 'full' }},
      { field: 'sort', type: 'integer', meta: { interface: 'input', display: 'raw', width: 'half', default_value: 1 }}
    ]
  },
  {
    collection: 'contact_messages',
    meta: {
      icon: 'contact_mail',
      color: '#EF4444',
      display_template: '{{subject}} - {{name}}',
      hidden: false,
      translations: [
        {
          language: 'en-US',
          translation: 'Contact Messages',
          singular: 'Contact Message',
          plural: 'Contact Messages'
        }
      ]
    },
    fields: [
      { field: 'name', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half', readonly: true }},
      { field: 'email', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'half', readonly: true }},
      { field: 'subject', type: 'string', meta: { required: true, interface: 'input', display: 'raw', width: 'full', readonly: true }},
      { field: 'message', type: 'text', meta: { required: true, interface: 'input-multiline', display: 'formatted-value', width: 'full', readonly: true }},
      { field: 'status', type: 'string', meta: { required: true, interface: 'select-dropdown', display: 'labels', options: { choices: [{ text: 'New', value: 'new' }, { text: 'Read', value: 'read' }, { text: 'Replied', value: 'replied' }] }, width: 'half', default_value: 'new' }}
    ]
  }
];

// Permission settings for public role
const publicPermissions = [
  { collection: 'about', action: 'read', permissions: {}, validation: {} },
  { collection: 'projects', action: 'read', permissions: { status: { _eq: 'published' } }, validation: {} },
  { collection: 'skills', action: 'read', permissions: {}, validation: {} },
  { collection: 'experience', action: 'read', permissions: {}, validation: {} },
  { collection: 'contact_messages', action: 'create', permissions: {}, validation: {} }
];

async function setupDirectus() {
  console.log('🚀 Setting up Directus collections...\n');

  try {
    // Test connection
    console.log('🔄 Testing connection...');
    await directusRequest('/server/info');
    console.log('✅ Connected to Directus successfully\n');

    // Create collections and fields
    for (const collectionDef of collections) {
      console.log(`🔄 Creating collection: ${collectionDef.collection}`);
      
      try {
        // Create collection
        await directusRequest('/collections', 'POST', {
          collection: collectionDef.collection,
          meta: collectionDef.meta
        });
        console.log(`✅ Collection '${collectionDef.collection}' created`);

        // Create fields
        for (const field of collectionDef.fields) {
          try {
            await directusRequest(`/fields/${collectionDef.collection}`, 'POST', field);
            console.log(`  ✅ Field '${field.field}' added`);
          } catch (error) {
            if (error.message.includes('already exists')) {
              console.log(`  ⚠️  Field '${field.field}' already exists, skipping`);
            } else {
              throw error;
            }
          }
        }
        
        console.log('');
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`  ⚠️  Collection '${collectionDef.collection}' already exists, skipping\n`);
        } else {
          throw error;
        }
      }
    }

    // Get public role ID
    console.log('🔄 Setting up permissions...');
    const roles = await directusRequest('/roles?filter[name][_eq]=Public');
    
    if (roles.data && roles.data.length > 0) {
      const publicRoleId = roles.data[0].id;
      
      // Set permissions
      for (const permission of publicPermissions) {
        try {
          await directusRequest('/permissions', 'POST', {
            role: publicRoleId,
            collection: permission.collection,
            action: permission.action,
            permissions: permission.permissions,
            validation: permission.validation
          });
          console.log(`✅ Permission set: ${permission.collection} (${permission.action})`);
        } catch (error) {
          if (error.message.includes('already exists')) {
            console.log(`⚠️  Permission already exists: ${permission.collection} (${permission.action})`);
          } else {
            console.log(`❌ Failed to set permission: ${permission.collection} (${permission.action})`);
          }
        }
      }
    } else {
      console.log('⚠️  Public role not found, skipping permission setup');
    }

    console.log('\n🎉 Directus setup complete!');
    console.log('\n📋 Next steps:');
    console.log('  1. Go to http://localhost:8055');
    console.log('  2. Navigate to Content → About');
    console.log('  3. Add your personal information');
    console.log('  4. Add some projects and skills');
    console.log('  5. Visit http://localhost:3001 to see your dynamic portfolio!');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   • Make sure Directus is running (docker compose up -d)');
    console.error('   • Check your DIRECTUS_TOKEN in .env.local');
    console.error('   • Verify you can access http://localhost:8055');
    process.exit(1);
  }
}

// Check if we have fetch available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('🔄 Installing node-fetch for compatibility...');
  try {
    const fetch = require('node-fetch');
    global.fetch = fetch;
  } catch (error) {
    console.error('❌ Error: This script requires Node.js 18+ or node-fetch');
    console.error('   Install node-fetch: npm install node-fetch');
    process.exit(1);
  }
}

setupDirectus();
