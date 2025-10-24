import { z } from 'zod';
import { FORM_CONFIG } from './constants';

/**
 * Validation schemas using Zod
 * Provides type-safe validation for forms and data
 */

const { CONTACT } = FORM_CONFIG;

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(CONTACT.MIN_NAME_LENGTH, `Name must be at least ${CONTACT.MIN_NAME_LENGTH} characters`)
    .max(CONTACT.MAX_NAME_LENGTH, `Name must be less than ${CONTACT.MAX_NAME_LENGTH} characters`)
    .trim(),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(CONTACT.MAX_EMAIL_LENGTH, `Email must be less than ${CONTACT.MAX_EMAIL_LENGTH} characters`)
    .toLowerCase()
    .trim(),
  
  subject: z
    .string()
    .min(CONTACT.MIN_SUBJECT_LENGTH, `Subject must be at least ${CONTACT.MIN_SUBJECT_LENGTH} characters`)
    .max(CONTACT.MAX_SUBJECT_LENGTH, `Subject must be less than ${CONTACT.MAX_SUBJECT_LENGTH} characters`)
    .trim(),
  
  message: z
    .string()
    .min(CONTACT.MIN_MESSAGE_LENGTH, `Message must be at least ${CONTACT.MIN_MESSAGE_LENGTH} characters`)
    .max(CONTACT.MAX_MESSAGE_LENGTH, `Message must be less than ${CONTACT.MAX_MESSAGE_LENGTH} characters`)
    .trim(),
});

// Infer TypeScript type from schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validation result type
export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Validate data against a Zod schema and return formatted result
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }
  
  // Format Zod errors into a simple object
  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    errors[path] = issue.message;
  });
  
  return {
    success: false,
    errors,
  };
}
