'use server';

import { submitContactMessage } from '@/lib/directus-server';
import { logger } from '@/lib/logger';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string;
  };
}

// Basic server-side validation
function validateContactForm(data: ContactFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // Check for reasonable lengths to prevent abuse
  if (data.name.length > 100) errors.name = 'Name is too long';
  if (data.email.length > 255) errors.email = 'Email is too long';
  if (data.subject.length > 200) errors.subject = 'Subject is too long';
  if (data.message.length > 5000) errors.message = 'Message is too long';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function submitContactFormAction(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    // Validate input
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Please check the form for errors',
        errors: validation.errors,
      };
    }

    // Sanitize input (basic - you might want to use a library like DOMPurify for more robust sanitization)
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    // Submit to Directus
    const success = await submitContactMessage(sanitizedData);

    if (success) {
      logger.info('Contact form submitted successfully', { email: sanitizedData.email });
      return {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      };
    } else {
      throw new Error('Failed to submit message');
    }
  } catch (error) {
    logger.error('Error submitting contact form', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later or contact me directly via email.',
    };
  }
}
