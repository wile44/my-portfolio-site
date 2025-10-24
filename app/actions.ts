'use server';

import { submitContactMessage } from '@/lib/directus-server';
import { logger } from '@/lib/logger';
import { contactFormSchema, validateData, type ContactFormData } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

// Re-export types for components
export type { ContactFormData } from '@/lib/validations';

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string;
  };
}

export async function submitContactFormAction(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    // Get identifier for rate limiting (use email as identifier)
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const identifier = `${ip}-${formData.email}`;
    
    // Check rate limit: 3 submissions per 5 minutes per email
    const rateLimit = checkRateLimit(identifier, {
      maxRequests: 3,
      windowMs: 5 * 60 * 1000, // 5 minutes
    });

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      logger.warn('Rate limit exceeded for contact form', { 
        identifier,
        email: formData.email,
      });
      return {
        success: false,
        message: `Too many requests. Please try again in ${resetMinutes} minute(s).`,
      };
    }

    // Validate input with Zod
    const validation = validateData(contactFormSchema, formData);
    
    if (!validation.success) {
      return {
        success: false,
        message: 'Please check the form for errors',
        errors: validation.errors,
      };
    }

    // Data is already sanitized by Zod (trim, toLowerCase, etc.)
    if (!validation.data) {
      return {
        success: false,
        message: 'Invalid form data',
      };
    }
    
    const sanitizedData = validation.data;

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
