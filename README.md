# Goodluck Wile - Portfolio Website

A modern, responsive portfolio website built with Next.js and powered by Directus CMS for dynamic content management.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light theme support
- **Dynamic Content**: Powered by Directus headless CMS
- **Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Built with Next.js 15 and optimized images
- **Working Contact Form**: Real contact form that stores messages in Directus
- **SEO Friendly**: Proper meta tags and Open Graph support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **CMS**: Directus (Headless CMS)
- **TypeScript**: Full TypeScript support
- **Icons**: Lucide React
- **Fonts**: Geist (Google Fonts)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set up Directus

#### Option A: Docker Setup (Recommended)

The easiest way to run Directus locally is using Docker:

```bash
# Start Directus with Docker
cd ../directus-docker
./start.sh

# Or manually
docker compose up -d
```

**Access Directus:**
- URL: http://localhost:8055
- Email: `admin@example.com`
- Password: `directus123`

#### Option B: Manual Installation

Alternatively, follow the detailed setup guide in [`DIRECTUS_SETUP.md`](./DIRECTUS_SETUP.md) to manually install and configure Directus.

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Directus configuration:

```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=your-directus-admin-token
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📧 Contact Form Integration

The contact form is now fully functional and integrates with Directus:
- Form submissions are stored in the `contact_messages` collection
- Includes form validation and error handling
- Shows success/error messages to users
- Admin can manage messages through Directus admin panel

## 🎨 Dynamic Content

All content is now managed through Directus:
- **Hero Section**: Name, title, description, bio, social links
- **Contact Info**: Email, phone, location, working hours
- **Projects**: Portfolio projects (coming soon)
- **Skills**: Technical skills (coming soon)
- **Experience**: Work history (coming soon)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_DIRECTUS_URL`: Your Directus instance URL
   - `DIRECTUS_TOKEN`: Your Directus admin token

### Deploy Directus

For production, consider:
- **Directus Cloud**: Managed Directus hosting
- **Self-hosted**: Deploy on your own server
- **Railway/Render**: Easy deployment platforms

## 🔧 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

Built with ❤️ using Next.js and Directus
