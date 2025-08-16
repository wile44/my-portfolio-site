'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({ type: 'loading', message: 'Sending message...' });

    // Simulate form submission (replace with actual API call)
    try {
      // In a real app, you would send this to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you soon.',
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'goodluckwile@example.com',
      href: 'mailto:goodluckwile@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San Francisco, CA',
    },
  ];

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
    <section id="contact" className="py-20 sm:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about technology? 
            I'm always open to discussing new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <div className="space-y-8">
            <div className="fade-in-up">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Get In Touch
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                I'm currently available for freelance work and full-time opportunities. 
                Whether you have a project to discuss, a job opportunity, or just want to 
                connect, I'd love to hear from you!
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  className={`flex items-center p-4 rounded-lg bg-background hover:bg-accent/50 transition-all duration-200 fade-in-up delay-${index * 100}`}
                >
                  <info.icon className="h-5 w-5 text-foreground/70 mr-4" />
                  <div>
                    <p className="font-medium text-foreground">{info.label}</p>
                    <p className="text-sm text-foreground/70">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="fade-in-up delay-300">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-background hover:bg-accent/50 transition-all duration-200 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-foreground/70" />
                  </a>
                ))}
              </div>
            </div>

            {/* Working hours */}
            <div className="fade-in-up delay-400">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Working Hours
              </h4>
              <div className="bg-background rounded-lg p-4">
                <p className="text-foreground/70">
                  Monday - Friday: 9:00 AM - 6:00 PM (PST)
                </p>
                <p className="text-foreground/70">
                  Available for remote work and flexible hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="fade-in-up delay-200">
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {formStatus.message && (
                  <div
                    className={`p-4 rounded-lg flex items-center ${
                      formStatus.type === 'success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : formStatus.type === 'error'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}
                  >
                    {formStatus.type === 'success' && (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    )}
                    {formStatus.type === 'error' && (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white gradient-bg hover:opacity-90 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                >
                  {formStatus.type === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h3>
          <div className="max-w-2xl mx-auto text-left">
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  What types of projects do you work on?
                </h4>
                <p className="text-foreground/70 text-sm">
                  I specialize in full-stack web applications, e-commerce platforms, 
                  SaaS products, and custom business solutions using modern technologies.
                </p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  What's your typical project timeline?
                </h4>
                <p className="text-foreground/70 text-sm">
                  Project timelines vary based on scope and complexity. Small projects 
                  typically take 2-4 weeks, while larger applications may take 2-3 months.
                </p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer ongoing support?
                </h4>
                <p className="text-foreground/70 text-sm">
                  Yes, I offer maintenance and support packages to ensure your application 
                  stays secure, updated, and performs optimally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}