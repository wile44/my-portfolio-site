-- Direct Database Setup Script for Directus Portfolio
-- This bypasses API restrictions by directly manipulating the PostgreSQL database

BEGIN;

-- Create the about table (singleton)
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    bio TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    resume_url VARCHAR(255),
    working_hours TEXT,
    date_created TIMESTAMP DEFAULT NOW(),
    date_updated TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    date_created TIMESTAMP DEFAULT NOW(),
    date_updated TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    technologies JSON NOT NULL,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    sort INTEGER DEFAULT 1,
    date_created TIMESTAMP DEFAULT NOW(),
    date_updated TIMESTAMP DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'devops', 'tools')),
    proficiency INTEGER NOT NULL CHECK (proficiency >= 1 AND proficiency <= 100),
    sort INTEGER DEFAULT 1,
    date_created TIMESTAMP DEFAULT NOW(),
    date_updated TIMESTAMP DEFAULT NOW()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    location VARCHAR(255),
    technologies JSON,
    sort INTEGER DEFAULT 1,
    date_created TIMESTAMP DEFAULT NOW(),
    date_updated TIMESTAMP DEFAULT NOW()
);

-- Insert collection metadata into directus_collections
INSERT INTO directus_collections (collection, icon, color, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, versioning) 
VALUES 
    ('about', 'account_box', '#6366F1', '{{name}} - {{title}}', FALSE, TRUE, NULL, NULL, TRUE, NULL, NULL, NULL, 'all', FALSE),
    ('contact_messages', 'contact_mail', '#EF4444', '{{subject}} - {{name}}', FALSE, FALSE, NULL, NULL, TRUE, NULL, NULL, NULL, 'all', FALSE),
    ('projects', 'work', '#10B981', '{{title}} - {{status}}', FALSE, FALSE, NULL, NULL, TRUE, NULL, NULL, NULL, 'all', FALSE),
    ('skills', 'psychology', '#F59E0B', '{{name}} ({{category}})', FALSE, FALSE, NULL, NULL, TRUE, NULL, NULL, NULL, 'all', FALSE),
    ('experience', 'business_center', '#8B5CF6', '{{position}} at {{company}}', FALSE, FALSE, NULL, NULL, TRUE, NULL, NULL, NULL, 'all', FALSE)
ON CONFLICT (collection) DO UPDATE SET
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    display_template = EXCLUDED.display_template,
    singleton = EXCLUDED.singleton;

-- Insert field metadata for about collection
INSERT INTO directus_fields (collection, field, type, interface, special, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) 
VALUES 
    ('about', 'name', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 1, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('about', 'title', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 2, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('about', 'description', 'text', 'input-multiline', NULL, NULL, 'formatted-value', NULL, FALSE, FALSE, 3, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('about', 'bio', 'text', 'input-rich-text-html', NULL, NULL, 'formatted-value', NULL, FALSE, FALSE, 4, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('about', 'email', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 5, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('about', 'phone', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 6, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('about', 'location', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 7, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('about', 'github_url', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 8, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('about', 'linkedin_url', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 9, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('about', 'twitter_url', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 10, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('about', 'resume_url', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 11, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('about', 'working_hours', 'text', 'input-multiline', NULL, NULL, 'formatted-value', NULL, FALSE, FALSE, 12, 'full', NULL, NULL, NULL, FALSE, NULL, NULL, NULL)
ON CONFLICT (collection, field) DO NOTHING;

-- Insert field metadata for contact_messages collection
INSERT INTO directus_fields (collection, field, type, interface, special, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) 
VALUES 
    ('contact_messages', 'name', 'string', 'input', NULL, NULL, 'raw', NULL, TRUE, FALSE, 1, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('contact_messages', 'email', 'string', 'input', NULL, NULL, 'raw', NULL, TRUE, FALSE, 2, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('contact_messages', 'subject', 'string', 'input', NULL, NULL, 'raw', NULL, TRUE, FALSE, 3, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('contact_messages', 'message', 'text', 'input-multiline', NULL, NULL, 'formatted-value', NULL, TRUE, FALSE, 4, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('contact_messages', 'status', 'string', 'select-dropdown', NULL, '{"choices":[{"text":"New","value":"new"},{"text":"Read","value":"read"},{"text":"Replied","value":"replied"}]}', 'labels', '{"choices":[{"text":"New","value":"new"},{"text":"Read","value":"read"},{"text":"Replied","value":"replied"}]}', FALSE, FALSE, 5, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL)
ON CONFLICT (collection, field) DO NOTHING;

-- Insert field metadata for projects collection
INSERT INTO directus_fields (collection, field, type, interface, special, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) 
VALUES 
    ('projects', 'title', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 1, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('projects', 'description', 'text', 'input-rich-text-html', NULL, NULL, 'formatted-value', NULL, FALSE, FALSE, 2, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('projects', 'short_description', 'text', 'input-multiline', NULL, NULL, 'formatted-value', NULL, FALSE, FALSE, 3, 'full', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('projects', 'technologies', 'json', 'tags', NULL, NULL, 'labels', NULL, FALSE, FALSE, 4, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('projects', 'github_url', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 5, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('projects', 'live_url', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 6, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('projects', 'featured', 'boolean', 'boolean', NULL, NULL, 'boolean', NULL, FALSE, FALSE, 7, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('projects', 'status', 'string', 'select-dropdown', NULL, '{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"}]}', 'labels', '{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"}]}', FALSE, FALSE, 8, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('projects', 'sort', 'integer', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 9, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL)
ON CONFLICT (collection, field) DO NOTHING;

-- Insert field metadata for skills collection
INSERT INTO directus_fields (collection, field, type, interface, special, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) 
VALUES 
    ('skills', 'name', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 1, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('skills', 'category', 'string', 'select-dropdown', NULL, '{"choices":[{"text":"Frontend","value":"frontend"},{"text":"Backend","value":"backend"},{"text":"Database","value":"database"},{"text":"DevOps","value":"devops"},{"text":"Tools","value":"tools"}]}', 'labels', '{"choices":[{"text":"Frontend","value":"frontend"},{"text":"Backend","value":"backend"},{"text":"Database","value":"database"},{"text":"DevOps","value":"devops"},{"text":"Tools","value":"tools"}]}', FALSE, FALSE, 2, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('skills', 'proficiency', 'integer', 'slider', NULL, '{"min":1,"max":100,"step":1}', 'raw', NULL, FALSE, FALSE, 3, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('skills', 'sort', 'integer', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 4, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL)
ON CONFLICT (collection, field) DO NOTHING;

-- Insert field metadata for experience collection
INSERT INTO directus_fields (collection, field, type, interface, special, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) 
VALUES 
    ('experience', 'company', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 1, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('experience', 'position', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 2, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('experience', 'description', 'text', 'input-rich-text-html', NULL, NULL, 'formatted-value', NULL, FALSE, FALSE, 3, 'full', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('experience', 'start_date', 'date', 'datetime', NULL, NULL, 'datetime', NULL, FALSE, FALSE, 4, 'half', NULL, NULL, NULL, TRUE, NULL, NULL, NULL),
    ('experience', 'end_date', 'date', 'datetime', NULL, NULL, 'datetime', NULL, FALSE, FALSE, 5, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('experience', 'current', 'boolean', 'boolean', NULL, NULL, 'boolean', NULL, FALSE, FALSE, 6, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('experience', 'location', 'string', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 7, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('experience', 'technologies', 'json', 'tags', NULL, NULL, 'labels', NULL, FALSE, FALSE, 8, 'full', NULL, NULL, NULL, FALSE, NULL, NULL, NULL),
    ('experience', 'sort', 'integer', 'input', NULL, NULL, 'raw', NULL, FALSE, FALSE, 9, 'half', NULL, NULL, NULL, FALSE, NULL, NULL, NULL)
ON CONFLICT (collection, field) DO NOTHING;

-- Set up permissions for public role
-- First get the public role UUID (it should be consistent)
DO $$
DECLARE
    public_role_id UUID;
BEGIN
    SELECT id INTO public_role_id FROM directus_roles WHERE name = 'Public';
    
    IF public_role_id IS NOT NULL THEN
        -- Insert permissions for public access
        INSERT INTO directus_permissions (role, collection, action, permissions, validation, presets, fields) 
        VALUES 
            (public_role_id, 'about', 'read', '{}', '{}', NULL, '["*"]'),
            (public_role_id, 'contact_messages', 'create', '{}', '{}', NULL, '["*"]'),
            (public_role_id, 'projects', 'read', '{"status":{"_eq":"published"}}', '{}', NULL, '["*"]'),
            (public_role_id, 'skills', 'read', '{}', '{}', NULL, '["*"]'),
            (public_role_id, 'experience', 'read', '{}', '{}', NULL, '["*"]')
        ON CONFLICT (role, collection, action) DO NOTHING;
    END IF;
END $$;

-- Insert sample data
-- About data (only one record since it's a singleton)
INSERT INTO about (name, title, description, bio, email, phone, location, github_url, linkedin_url, twitter_url, working_hours) 
VALUES (
    'Goodluck Wile',
    'Full-Stack Software Engineer',
    'Crafting digital experiences with modern technologies',
    '<p>I am a passionate full-stack software engineer with expertise in building scalable web applications, designing elegant user interfaces, and solving complex problems with clean, efficient code. My journey in technology spans across various domains, from frontend frameworks to backend architectures.</p><p>I believe in writing code that not only works but is maintainable, testable, and follows industry best practices. When I''m not coding, you''ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.</p>',
    'goodluck@example.com',
    '+1 (555) 123-4567',
    'San Francisco, CA',
    'https://github.com/wile44',
    'https://linkedin.com/in/goodluckwile',
    'https://twitter.com/goodluckwile',
    'Monday - Friday: 9:00 AM - 6:00 PM (PST)
Available for remote work and flexible hours
Open to discussing projects outside regular hours'
) ON CONFLICT DO NOTHING;

-- Sample projects data
INSERT INTO projects (title, description, short_description, technologies, github_url, live_url, featured, status, sort) 
VALUES 
    (
        'E-Commerce Platform',
        '<p>A comprehensive e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, payment integration with Stripe, and admin dashboard with real-time analytics.</p><p>Key features include responsive design, SEO optimization, inventory management, order tracking, and customer reviews system.</p>',
        'Full-stack e-commerce solution with modern features and seamless user experience',
        '["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Prisma"]',
        'https://github.com/wile44/ecommerce-platform',
        'https://ecommerce-demo.vercel.app',
        TRUE,
        'published',
        1
    ),
    (
        'Task Management App',
        '<p>A real-time collaborative task management application featuring drag-and-drop functionality, team collaboration, file attachments, notifications, and advanced filtering capabilities.</p><p>Built with real-time synchronization using Socket.io, ensuring all team members stay updated with project changes instantly.</p>',
        'Collaborative project management tool with real-time updates',
        '["React", "Node.js", "Socket.io", "MongoDB", "Express", "Tailwind CSS"]',
        'https://github.com/wile44/task-manager',
        'https://task-manager-demo.vercel.app',
        TRUE,
        'published',
        2
    ),
    (
        'Portfolio Website',
        '<p>A cutting-edge portfolio website built with Next.js and modern web technologies, featuring smooth animations, dark mode, responsive design, and optimized performance.</p><p>Integrated with Directus CMS for dynamic content management, allowing easy updates without touching code.</p>',
        'Modern, responsive portfolio showcasing my work with dynamic CMS integration',
        '["Next.js", "TypeScript", "Directus", "Tailwind CSS", "Docker"]',
        'https://github.com/wile44/portfolio',
        'https://goodluckwile.dev',
        TRUE,
        'published',
        3
    )
ON CONFLICT DO NOTHING;

-- Sample skills data
INSERT INTO skills (name, category, proficiency, sort) 
VALUES 
    ('JavaScript', 'frontend', 95, 1),
    ('TypeScript', 'frontend', 90, 2),
    ('React', 'frontend', 92, 3),
    ('Next.js', 'frontend', 88, 4),
    ('Tailwind CSS', 'frontend', 85, 5),
    ('Node.js', 'backend', 90, 6),
    ('Express', 'backend', 85, 7),
    ('Python', 'backend', 80, 8),
    ('PostgreSQL', 'database', 85, 9),
    ('MongoDB', 'database', 80, 10),
    ('Docker', 'devops', 75, 11),
    ('AWS', 'devops', 70, 12),
    ('Git', 'tools', 90, 13),
    ('VS Code', 'tools', 95, 14)
ON CONFLICT DO NOTHING;

-- Sample experience data
INSERT INTO experience (company, position, description, start_date, end_date, current, location, technologies, sort) 
VALUES 
    (
        'TechCorp Solutions',
        'Senior Full-Stack Developer',
        '<p>Led development of multiple client-facing applications serving over 100K users. Architected scalable microservices and implemented CI/CD pipelines.</p><ul><li>Built responsive web applications using React and Next.js</li><li>Designed RESTful APIs with Node.js and Express</li><li>Implemented automated testing and deployment workflows</li></ul>',
        '2022-01-01',
        NULL,
        TRUE,
        'San Francisco, CA',
        '["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"]',
        1
    ),
    (
        'StartupInc',
        'Frontend Developer',
        '<p>Developed and maintained the company''s main web application, improving performance by 40% and user engagement by 25%.</p><ul><li>Created reusable component library used across multiple projects</li><li>Collaborated with designers to implement pixel-perfect UIs</li><li>Optimized application performance and accessibility</li></ul>',
        '2020-06-01',
        '2021-12-31',
        FALSE,
        'Remote',
        '["React", "JavaScript", "Sass", "Webpack", "Jest"]',
        2
    )
ON CONFLICT DO NOTHING;

COMMIT;
