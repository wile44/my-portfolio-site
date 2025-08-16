'use client';

import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/goodluckwile',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/goodluckwile',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/goodluckwile',
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold gradient-text">GW</span>
            </div>
            <p className="text-foreground/70 mb-4 max-w-md">
              Full-stack software engineer passionate about creating digital experiences that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-foreground/70">Web Development</span>
              </li>
              <li>
                <span className="text-foreground/70">Mobile Development</span>
              </li>
              <li>
                <span className="text-foreground/70">API Development</span>
              </li>
              <li>
                <span className="text-foreground/70">Consulting</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-foreground/70 text-sm flex items-center">
            Made with
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            by Goodluck Wile
          </div>
          <div className="text-foreground/70 text-sm mt-4 sm:mt-0">
            © {currentYear} Goodluck Wile. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}