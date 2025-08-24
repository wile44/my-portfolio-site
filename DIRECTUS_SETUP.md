# Directus Setup Guide

## 1. Install and Setup Directus

### Option A: Local Installation (Recommended for Development)
```bash
# Create a new directory for your Directus instance
mkdir directus-cms
cd directus-cms

# Install Directus
npx create-directus-project@latest my-portfolio-cms

# Follow the prompts:
# - Choose SQLite for local development (or PostgreSQL/MySQL for production)
# - Set admin email and password
# - The instance will start on http://localhost:8055
```

### Option B: Directus Cloud
1. Go to [directus.cloud](https://directus.cloud)
2. Create a new project
3. Use the provided URL in your environment variables

## 2. Create Collections in Directus Admin Panel

Log into your Directus admin panel (http://localhost:8055) and create these collections:

### 2.1 About Collection (Singleton)
- **Collection Name**: `about`
- **Type**: Singleton (only one record)

**Fields:**
- `name` (String, Required) - Your full name
- `title` (String, Required) - Your professional title
- `description` (Text, Required) - Short description for hero section
- `bio` (Textarea, Required) - Longer bio for about section
- `email` (String, Required) - Contact email
- `phone` (String) - Phone number
- `location` (String, Required) - Your location
- `resume_url` (String) - URL to your resume/CV
- `profile_image` (File) - Your profile photo
- `github_url` (String) - GitHub profile URL
- `linkedin_url` (String) - LinkedIn profile URL
- `twitter_url` (String) - Twitter profile URL
- `working_hours` (Text) - Your availability hours
- `availability_status` (String) - Current availability status

### 2.2 Projects Collection
- **Collection Name**: `projects`

**Fields:**
- `title` (String, Required) - Project title
- `description` (Textarea, Required) - Full project description
- `short_description` (Text) - Brief description for cards
- `image` (File) - Main project image
- `gallery` (Multiple Files) - Additional project images
- `technologies` (JSON) - Array of technologies used
- `github_url` (String) - GitHub repository URL
- `live_url` (String) - Live project URL
- `featured` (Boolean, Default: false) - Show in featured projects
- `status` (Dropdown: draft, published, Default: draft) - Publication status
- `sort` (Integer) - Sort order

### 2.3 Skills Collection
- **Collection Name**: `skills`

**Fields:**
- `name` (String, Required) - Skill name
- `category` (String, Required) - Skill category (e.g., "Frontend", "Backend", "Tools")
- `proficiency` (Integer, 1-100, Required) - Proficiency level percentage
- `icon` (String) - Icon name or class
- `description` (Text) - Skill description
- `sort` (Integer) - Sort order within category

### 2.4 Experience Collection
- **Collection Name**: `experience`

**Fields:**
- `company` (String, Required) - Company name
- `position` (String, Required) - Job position
- `description` (Textarea, Required) - Job description
- `start_date` (Date, Required) - Start date
- `end_date` (Date) - End date (leave empty if current)
- `current` (Boolean, Default: false) - Currently working here
- `location` (String) - Job location
- `technologies` (JSON) - Technologies used in this role
- `sort` (Integer) - Sort order

### 2.5 Contact Messages Collection
- **Collection Name**: `contact_messages`

**Fields:**
- `name` (String, Required) - Sender name
- `email` (String, Required) - Sender email
- `subject` (String, Required) - Message subject
- `message` (Textarea, Required) - Message content
- `status` (Dropdown: new, read, replied, Default: new) - Message status

## 3. Configure Environment Variables

Update your `.env.local` file:
```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=your-admin-token-here
```

### Getting your Admin Token:
1. Go to Directus Admin Panel > User Directory
2. Click on your admin user
3. Go to the "Admin Options" tab
4. Generate a new token or copy the existing one
5. Add it to your `.env.local` file

## 4. Set Permissions (Important!)

In Directus Admin Panel:

### For Public Role (unauthenticated users):
- **about**: Read permission
- **projects**: Read permission (where status = published)
- **skills**: Read permission
- **experience**: Read permission
- **contact_messages**: Create permission only

### For Admin Role:
- All collections: Full CRUD permissions

## 5. Sample Data

Here's some sample data to get you started:

### About (add via Directus admin):
```json
{
  "name": "Goodluck Wile",
  "title": "Full-Stack Software Engineer",
  "description": "Crafting digital experiences with modern technologies",
  "bio": "I build scalable web applications, design elegant user interfaces, and solve complex problems with clean, efficient code. Passionate about creating impactful digital solutions.",
  "email": "goodluckwile@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA",
  "github_url": "https://github.com/wile44",
  "linkedin_url": "https://linkedin.com/in/goodluckwile",
  "working_hours": "Monday - Friday: 9:00 AM - 6:00 PM (PST)\nAvailable for remote work and flexible hours"
}
```

## 6. Next Steps

1. Start your Directus instance
2. Create the collections as described above
3. Add some sample content
4. Update your environment variables
5. Test the connection by running your Next.js app

## Troubleshooting

- **CORS Issues**: Make sure your Directus instance allows requests from your Next.js app domain
- **Token Issues**: Ensure your admin token has the right permissions
- **Connection Issues**: Check that your DIRECTUS_URL is correct and accessible

Your portfolio will now pull data dynamically from Directus!
