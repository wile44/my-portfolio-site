#!/usr/bin/env node

/**
 * Simple Directus Setup Script
 * Uses login authentication to ensure full admin privileges
 */

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'directus123';

let accessToken = '';

// API helper
async function directusRequest(endpoint, method = 'GET', data = null) {
  const url = `${DIRECTUS_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    return response.status !== 204 ? await response.json() : { success: true };
  } catch (error) {
    console.error(`❌ Request failed: ${method} ${endpoint}`);
    throw error;
  }
}

async function login() {
  console.log('🔐 Logging in as admin...');
  try {
    const response = await directusRequest('/auth/login', 'POST', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    accessToken = response.data.access_token;
    console.log('✅ Admin login successful\n');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    return false;
  }
}

async function createCollection(name, fields, options = {}) {
  console.log(`🔄 Creating collection: ${name}`);
  
  // Create collection
  try {
    await directusRequest('/collections', 'POST', {
      collection: name,
      meta: {
        singleton: options.singleton || false,
        icon: options.icon || 'folder',
        color: options.color || '#6366F1',
        display_template: options.display_template,
        hidden: false
      }
    });
    console.log(`✅ Collection '${name}' created`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`⚠️  Collection '${name}' already exists`);
    } else {
      throw error;
    }
  }
  
  // Create fields
  for (const field of fields) {
    try {
      await directusRequest(`/fields/${name}`, 'POST', field);
      console.log(`  ✅ Field '${field.field}' added`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`  ⚠️  Field '${field.field}' already exists`);
      } else {
        console.log(`  ❌ Failed to create field '${field.field}':`, error.message);
      }
    }
  }
  console.log('');
}

async function setPermissions() {
  console.log('🔄 Setting up public permissions...');
  
  // Get public role
  try {
    const roles = await directusRequest('/roles?filter[name][_eq]=Public');
    if (!roles.data || roles.data.length === 0) {
      console.log('⚠️  Public role not found, skipping permissions');
      return;
    }
    
    const publicRoleId = roles.data[0].id;
    
    const permissions = [
      { collection: 'about', action: 'read' },
      { collection: 'projects', action: 'read' },
      { collection: 'skills', action: 'read' },
      { collection: 'experience', action: 'read' },
      { collection: 'contact_messages', action: 'create' }
    ];
    
    for (const perm of permissions) {
      try {
        await directusRequest('/permissions', 'POST', {
          role: publicRoleId,
          collection: perm.collection,
          action: perm.action,
          permissions: perm.collection === 'projects' ? { status: { _eq: 'published' } } : {},
          validation: {}
        });
        console.log(`✅ Permission set: ${perm.collection} (${perm.action})`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Permission already exists: ${perm.collection} (${perm.action})`);
        } else {
          console.log(`❌ Failed to set permission: ${perm.collection} (${perm.action})`);
        }
      }
    }
  } catch (error) {
    console.log('❌ Error setting permissions:', error.message);
  }
}

async function setupDirectus() {
  console.log('🚀 Setting up Directus collections...\n');

  // Check if we have fetch
  if (typeof fetch === 'undefined') {
    try {
      const fetch = require('node-fetch');
      global.fetch = fetch;
    } catch (error) {
      console.error('❌ This script requires Node.js 18+ or node-fetch');
      process.exit(1);
    }
  }

  // Login first
  const loginSuccess = await login();
  if (!loginSuccess) {
    console.error('❌ Cannot proceed without admin access');
    process.exit(1);
  }

  try {
    // Create About collection (singleton)
    await createCollection('about', [
      { field: 'name', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'title', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'description', type: 'text', meta: { required: true, interface: 'input-multiline', width: 'full' }},
      { field: 'bio', type: 'text', meta: { required: true, interface: 'input-rich-text-html', width: 'full' }},
      { field: 'email', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'location', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'github_url', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'linkedin_url', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'twitter_url', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'resume_url', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'working_hours', type: 'text', meta: { interface: 'input-multiline', width: 'full' }}
    ], {
      singleton: true,
      icon: 'account_box',
      color: '#6366F1',
      display_template: '{{name}} - {{title}}'
    });

    // Create Projects collection
    await createCollection('projects', [
      { field: 'title', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'description', type: 'text', meta: { required: true, interface: 'input-rich-text-html', width: 'full' }},
      { field: 'short_description', type: 'text', meta: { interface: 'input-multiline', width: 'full' }},
      { field: 'technologies', type: 'json', meta: { required: true, interface: 'tags', width: 'full' }},
      { field: 'github_url', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'live_url', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'featured', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: false }},
      { field: 'status', type: 'string', meta: { required: true, interface: 'select-dropdown', options: { choices: [{ text: 'Draft', value: 'draft' }, { text: 'Published', value: 'published' }] }, width: 'half', default_value: 'draft' }},
      { field: 'sort', type: 'integer', meta: { interface: 'input', width: 'half', default_value: 1 }}
    ], {
      icon: 'work',
      color: '#10B981',
      display_template: '{{title}} - {{status}}'
    });

    // Create Skills collection
    await createCollection('skills', [
      { field: 'name', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'category', type: 'string', meta: { required: true, interface: 'select-dropdown', options: { choices: [{ text: 'Frontend', value: 'frontend' }, { text: 'Backend', value: 'backend' }, { text: 'Database', value: 'database' }, { text: 'DevOps', value: 'devops' }, { text: 'Tools', value: 'tools' }] }, width: 'half' }},
      { field: 'proficiency', type: 'integer', meta: { required: true, interface: 'slider', options: { min: 1, max: 100, step: 1 }, width: 'half' }},
      { field: 'sort', type: 'integer', meta: { interface: 'input', width: 'half', default_value: 1 }}
    ], {
      icon: 'psychology',
      color: '#F59E0B',
      display_template: '{{name}} ({{category}})'
    });

    // Create Experience collection
    await createCollection('experience', [
      { field: 'company', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'position', type: 'string', meta: { required: true, interface: 'input', width: 'half' }},
      { field: 'description', type: 'text', meta: { required: true, interface: 'input-rich-text-html', width: 'full' }},
      { field: 'start_date', type: 'date', meta: { required: true, interface: 'datetime', width: 'half' }},
      { field: 'end_date', type: 'date', meta: { interface: 'datetime', width: 'half' }},
      { field: 'current', type: 'boolean', meta: { interface: 'boolean', width: 'half', default_value: false }},
      { field: 'location', type: 'string', meta: { interface: 'input', width: 'half' }},
      { field: 'technologies', type: 'json', meta: { interface: 'tags', width: 'full' }},
      { field: 'sort', type: 'integer', meta: { interface: 'input', width: 'half', default_value: 1 }}
    ], {
      icon: 'business_center',
      color: '#8B5CF6',
      display_template: '{{position}} at {{company}}'
    });

    // Create Contact Messages collection
    await createCollection('contact_messages', [
      { field: 'name', type: 'string', meta: { required: true, interface: 'input', width: 'half', readonly: true }},
      { field: 'email', type: 'string', meta: { required: true, interface: 'input', width: 'half', readonly: true }},
      { field: 'subject', type: 'string', meta: { required: true, interface: 'input', width: 'full', readonly: true }},
      { field: 'message', type: 'text', meta: { required: true, interface: 'input-multiline', width: 'full', readonly: true }},
      { field: 'status', type: 'string', meta: { required: true, interface: 'select-dropdown', options: { choices: [{ text: 'New', value: 'new' }, { text: 'Read', value: 'read' }, { text: 'Replied', value: 'replied' }] }, width: 'half', default_value: 'new' }}
    ], {
      icon: 'contact_mail',
      color: '#EF4444',
      display_template: '{{subject}} - {{name}}'
    });

    // Set permissions
    await setPermissions();

    console.log('\n🎉 Directus setup complete!');
    console.log('\n📋 Next steps:');
    console.log('  1. Go to http://localhost:8055');
    console.log('  2. Navigate to Content → About');
    console.log('  3. Add your personal information');
    console.log('  4. Add some projects and skills');
    console.log('  5. Visit http://localhost:3001 to see your dynamic portfolio!');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupDirectus();
