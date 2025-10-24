/**
 * Application-wide constants and configuration
 * Single source of truth for magic strings, URLs, and configuration values
 */

// Site Metadata
export const SITE_CONFIG = {
  name: 'Goodluck Wile',
  title: 'Goodluck Wile - Software Engineer',
  description: 'Modern portfolio of Goodluck Wile, a passionate software engineer specializing in full-stack development, cloud technologies, and innovative solutions.',
  url: 'https://goodluckwile.dev',
  author: {
    name: 'Goodluck Wile',
    email: 'goodluckwileonline@gmail.com',
    twitter: '@goodluckwile',
  },
} as const;

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/wile44',
  linkedin: 'https://linkedin.com/in/goodluckwile',
  twitter: 'https://twitter.com/goodluckwile',
} as const;

// Image Sizes for optimization
export const IMAGE_SIZES = {
  PROJECT_CARD: { width: 800, height: 400 },
  PROJECT_THUMBNAIL: { width: 400, height: 200 },
  HERO_AVATAR: { width: 300, height: 300 },
  QUALITY: 80,
} as const;

// Animation Delays (in ms)
export const ANIMATION_DELAYS = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
  EXTRA_LONG: 400,
  MAX: 500,
} as const;

// Form Configuration
export const FORM_CONFIG = {
  CONTACT: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_EMAIL_LENGTH: 5,
    MAX_EMAIL_LENGTH: 255,
    MIN_SUBJECT_LENGTH: 3,
    MAX_SUBJECT_LENGTH: 200,
    MIN_MESSAGE_LENGTH: 10,
    MAX_MESSAGE_LENGTH: 5000,
  },
} as const;

// Rate Limiting Configuration
export const RATE_LIMIT_CONFIG = {
  CONTACT_FORM: {
    maxRequests: 3,
    windowMs: 5 * 60 * 1000, // 5 minutes
  },
} as const;

// Project Categories
export const PROJECT_CATEGORIES = [
  'All',
  'Full-Stack',
  'Frontend', 
  'AI/ML',
  'Mobile',
  'Backend',
] as const;

// Technology Mappings for filtering
export const TECH_CATEGORIES = {
  'Full-Stack': ['react', 'next.js', 'node.js', 'express', 'mongodb', 'postgresql'],
  'Frontend': ['react', 'next.js', 'vue', 'angular', 'tailwind', 'css', 'html'],
  'AI/ML': ['python', 'tensorflow', 'pytorch', 'machine learning', 'ai', 'ml'],
  'Mobile': ['react native', 'flutter', 'swift', 'kotlin', 'ios', 'android'],
  'Backend': ['node.js', 'python', 'java', 'postgresql', 'mongodb', 'redis'],
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  DIRECTUS: process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
  CONTACT_FORM: '/api/contact',
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

// Section IDs for smooth scrolling
export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CONTACT: 'contact',
} as const;

// Default Fallback Values
export const DEFAULTS = {
  NAME: 'Goodluck Wile',
  TITLE: 'Full-Stack Software Engineer',
  DESCRIPTION: 'Crafting digital experiences with modern technologies',
  BIO: 'I build scalable web applications, design elegant user interfaces, and solve complex problems with clean, efficient code. Passionate about creating impactful digital solutions.',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check the form for errors.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  DIRECTUS_UNAVAILABLE: 'Unable to load content. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CONTACT_FORM: "Thank you for your message! I'll get back to you soon.",
  GENERIC: 'Success!',
} as const;

// Time Constants
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

// SEO Keywords
export const SEO_KEYWORDS = [
  'Goodluck Wile',
  'software engineer',
  'full-stack developer',
  'portfolio',
  'web development',
  'cloud',
  'react',
  'node.js',
  'typescript',
  'next.js',
] as const;
