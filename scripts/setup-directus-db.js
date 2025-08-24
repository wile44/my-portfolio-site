const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Database configuration
const dbConfig = {
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'localhost',
    port: 5432,
    database: 'directus',
};

async function setupDirectusDatabase() {
    const client = new Client(dbConfig);
    
    try {
        console.log('🔗 Connecting to PostgreSQL...');
        await client.connect();
        console.log('✅ Connected to database');

        // Read the SQL setup file
        const sqlFilePath = path.join(__dirname, 'setup-database.sql');
        const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

        console.log('📝 Executing database setup script...');
        await client.query(sqlContent);
        console.log('✅ Database setup completed successfully!');

        // Verify the setup
        console.log('\n🔍 Verifying setup...');
        
        // Check collections
        const collectionsResult = await client.query(`
            SELECT collection, icon, color, singleton 
            FROM directus_collections 
            WHERE collection IN ('about', 'projects', 'skills', 'experience', 'contact_messages')
            ORDER BY collection;
        `);
        
        console.log('\n📋 Collections created:');
        collectionsResult.rows.forEach(row => {
            console.log(`  - ${row.collection} (${row.singleton ? 'singleton' : 'collection'}) - ${row.icon} ${row.color}`);
        });

        // Check sample data
        const aboutCount = await client.query('SELECT COUNT(*) FROM about');
        const projectsCount = await client.query('SELECT COUNT(*) FROM projects');
        const skillsCount = await client.query('SELECT COUNT(*) FROM skills');
        const experienceCount = await client.query('SELECT COUNT(*) FROM experience');

        console.log('\n📊 Sample data inserted:');
        console.log(`  - About: ${aboutCount.rows[0].count} record(s)`);
        console.log(`  - Projects: ${projectsCount.rows[0].count} record(s)`);
        console.log(`  - Skills: ${skillsCount.rows[0].count} record(s)`);
        console.log(`  - Experience: ${experienceCount.rows[0].count} record(s)`);

        // Check permissions
        const permissionsResult = await client.query(`
            SELECT DISTINCT p.collection, p.action, r.name as role_name
            FROM directus_permissions p
            JOIN directus_roles r ON p.role = r.id
            WHERE p.collection IN ('about', 'projects', 'skills', 'experience', 'contact_messages')
            ORDER BY p.collection, p.action;
        `);

        console.log('\n🔐 Permissions configured:');
        permissionsResult.rows.forEach(row => {
            console.log(`  - ${row.collection}: ${row.action} (${row.role_name})`);
        });

        console.log('\n🎉 Setup complete! Your Directus CMS is ready.');
        console.log('');
        console.log('Next steps:');
        console.log('1. Visit http://localhost:8055 in your browser');
        console.log('2. Log in with your admin credentials');
        console.log('3. You should see all collections in the sidebar');
        console.log('4. Test the API endpoints:');
        console.log('   - GET http://localhost:8055/items/about');
        console.log('   - GET http://localhost:8055/items/projects');
        console.log('   - GET http://localhost:8055/items/skills');
        console.log('   - GET http://localhost:8055/items/experience');

    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    } finally {
        await client.end();
        console.log('🔌 Database connection closed');
    }
}

// Check if pg module is installed
try {
    require('pg');
} catch (error) {
    console.error('❌ The "pg" module is not installed.');
    console.log('Please install it by running: npm install pg');
    process.exit(1);
}

// Run the setup
if (require.main === module) {
    setupDirectusDatabase();
}

module.exports = { setupDirectusDatabase };
