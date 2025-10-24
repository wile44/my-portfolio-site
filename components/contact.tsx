'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { submitContactFormAction } from '@/app/actions';
import type { ContactFormData } from '@/app/actions';
import type { About } from '@/lib/directus';
import { contactFormSchema } from '@/lib/validations';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  errors?: Record<string, string>;
}

interface ContactProps {
  aboutData: About | null;
}

export default function Contact({ aboutData }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
    errors: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation with Zod
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      });
      setFormStatus({
        type: 'error',
        message: 'Please check the form for errors',
        errors,
      });
      toast.error('Please check the form for errors');
      return;
    }

    setFormStatus({ type: 'loading', message: 'Sending message...', errors: undefined });
    toast.loading('Sending your message...');

    try {
      const response = await submitContactFormAction(formData);
      
      if (response.success) {
        setFormStatus({
          type: 'success',
          message: response.message,
        });
        toast.dismiss();
        toast.success(response.message);
        
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setFormStatus({
          type: 'error',
          message: response.message,
          errors: response.errors,
        });
        toast.dismiss();
        toast.error(response.message);
      }
    } catch {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
      toast.dismiss();
      toast.error('Something went wrong. Please try again.');
    }
  };

  const contactInfo = [
    ...(aboutData?.email ? [{
      icon: Mail,
      label: 'Email',
      value: aboutData.email,
      href: `mailto:${aboutData.email}`,
    }] : []),
    ...(aboutData?.phone ? [{
      icon: Phone,
      label: 'Phone',
      value: aboutData.phone,
      href: `tel:${aboutData.phone.replace(/[^+\d]/g, '')}`,
    }] : []),
    ...(aboutData?.location ? [{
      icon: MapPin,
      label: 'Location',
      value: aboutData.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(aboutData.location)}`,
    }] : []),
  ];

  return (
    <section id="contact" className="py-20 sm:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about technology? 
            I&apos;m always open to discussing new opportunities and collaborations.
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
                I&apos;m currently available for freelance work and full-time opportunities. 
                Whether you have a project to discuss, a job opportunity, or just want to 
                connect, I&apos;d love to hear from you!
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
                  What&apos;s your typical project timeline?
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