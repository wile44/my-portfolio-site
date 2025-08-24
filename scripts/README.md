# Directus Portfolio Setup Scripts

This directory contains scripts to automatically set up your Directus CMS with all the necessary collections, fields, permissions, and sample data for your portfolio.

## Overview

The API-based setup approach encountered permission restrictions, so we've created a direct database injection approach that bypasses these limitations and provides a more reliable setup process.

## Files

- `setup-database.sql` - Raw SQL script that creates all tables, collections metadata, and sample data
- `setup-directus-db.js` - Node.js script that executes the SQL and verifies the setup
- `package.json` - Dependencies for the Node.js script

## Prerequisites

1. **Docker with Directus running** - Make sure your Directus container is running
2. **PostgreSQL accessible** - The database should be accessible on `localhost:5432`
3. **Node.js** - Required to run the setup script

## Quick Setup

1. **Navigate to the scripts directory:**
   ```bash
   cd scripts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Test database connection (optional):**
   ```bash
   npm run test-connection
   ```

4. **Run the setup:**
   ```bash
   npm run setup
   ```

## Alternative: Direct SQL Execution

If you prefer to run the SQL directly:

```bash
# Using psql
psql -h localhost -p 5432 -U postgres -d directus -f setup-database.sql

# You'll be prompted for the password: mysecretpassword
```

## What Gets Created

### Collections
- **about** (singleton) - Personal information, bio, contact details
- **projects** - Portfolio projects with descriptions, technologies, links
- **skills** - Technical skills with categories and proficiency levels  
- **experience** - Work experience with details and technologies
- **contact_messages** - Messages from portfolio contact form

### Sample Data
- Complete "About" profile with realistic information
- 3 sample projects with descriptions and technologies
- 14 skills across different categories
- 2 work experience entries

### Permissions
- Public role permissions for read access to published content
- Contact form submission permissions for anonymous users

## Verification

After running the setup, you can verify it worked by:

1. **Visit Directus Admin:** http://localhost:8055
2. **Check the sidebar** - You should see all 5 collections
3. **Test API endpoints:**
   - GET http://localhost:8055/items/about
   - GET http://localhost:8055/items/projects
   - GET http://localhost:8055/items/skills
   - GET http://localhost:8055/items/experience

## Configuration

The default database configuration is:
- Host: `localhost`
- Port: `5432` 
- Database: `directus`
- User: `postgres`
- Password: `mysecretpassword`

To change these settings, edit the `dbConfig` object in `setup-directus-db.js`.

## Troubleshooting

**Connection errors:** Make sure Directus is running and the PostgreSQL port is accessible:
```bash
docker ps  # Check if directus container is running
```

**Permission errors:** The script should handle all permissions automatically, but you might need to restart Directus after setup:
```bash
docker-compose restart
```

**Already exists errors:** The script uses `ON CONFLICT DO NOTHING` clauses, so it's safe to run multiple times.

## Next Steps

Once setup is complete:
1. Log into Directus admin panel
2. Customize the sample data with your real information
3. Add your own projects, skills, and experience
4. Test the API endpoints from your frontend application
5. Set up proper authentication tokens for production use
