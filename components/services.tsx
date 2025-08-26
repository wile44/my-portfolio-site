'use client';

import { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  Database, 
  Cloud, 
  Palette, 
  Search, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  // price?: string;
  // timeline?: string;
}

const services: Service[] = [
  {
    id: 'web-development',
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies like Next.js, React, and TypeScript.',
    features: [
      'Full-stack development',
      'Responsive design',
      'Performance optimization',
      'API integration',
      'Database design',
      'Testing & deployment'
    ],
    // price: 'Starting at $2,500',
    // timeline: '2-4 weeks'
  },
  {
    id: 'mobile-app',
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications using React Native and Flutter for iOS and Android.',
    features: [
      'React Native development',
      'Flutter applications',
      'Native performance',
      'App store deployment',
      'Push notifications',
      'Offline functionality'
    ],
    // price: 'Starting at $3,500',
    // timeline: '3-6 weeks'
  },
  {
    id: 'ecommerce',
    icon: Database,
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration, inventory management, and analytics.',
    features: [
      'Shopping cart integration',
      'Payment processing',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Analytics dashboard'
    ],
    // price: 'Starting at $4,000',
    // timeline: '4-6 weeks'
  },
  {
    id: 'cloud-services',
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Cloud architecture design and deployment with AWS, Google Cloud, and Azure.',
    features: [
      'Cloud architecture',
      'Serverless functions',
      'Database migration',
      'CI/CD pipelines',
      'Monitoring & alerts',
      'Security implementation'
    ],
    // price: 'Starting at $1,500',
    // timeline: '1-3 weeks'
  },
  {
    id: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, user-centered designs that enhance user experience and drive engagement.',
    features: [
      'User research',
      'Wireframing',
      'Prototyping',
      'Design systems',
      'User testing',
      'Accessibility compliance'
    ],
    // price: 'Starting at $1,000',
    // timeline: '1-2 weeks'
  },
  {
    id: 'tech-consulting',
    icon: Search,
    title: 'Tech Consulting',
    description: 'Strategic technology consulting to help you make informed decisions for your business.',
    features: [
      'Technology audit',
      'Architecture review',
      'Performance analysis',
      'Security assessment',
      'Scalability planning',
      'Tech stack recommendations'
    ],
    // price: 'Starting at $500',
    // timeline: '1 week'
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            I offer comprehensive development services to bring your ideas to life. 
            From concept to deployment, I deliver high-quality solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6">
                <service.icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-foreground/70 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-foreground/60">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                {/* <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-foreground/70">{service.price}</span>
                  <span className="text-foreground/70">{service.timeline}</span>
                </div> */}

                <button
                  onClick={() => setSelectedService(service.id)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              {(() => {
                const service = services.find(s => s.id === selectedService);
                if (!service) return null;

                return (
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mr-4">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        {/* <div>
                          <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                          <p className="text-foreground/70">{service.price} • {service.timeline}</p>
                        </div> */}
                      </div>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-foreground/70 mb-6">{service.description}</p>

                    <h4 className="text-lg font-semibold text-foreground mb-4">What&apos;s Included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setSelectedService(null);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Get Started
                      </button>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss your project requirements and create a custom solution that meets your needs. 
              I offer free consultations to explore how we can work together.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}