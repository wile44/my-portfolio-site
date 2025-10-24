import { z } from 'zod';

/**
 * Environment variable validation with Zod
 * Ensures all required env vars are present and valid at runtime
 */

const envSchema = z.object({
  // Public variables (exposed to client)
  NEXT_PUBLIC_DIRECTUS_URL: z.string().url('NEXT_PUBLIC_DIRECTUS_URL must be a valid URL'),
  NEXT_PUBLIC_ENABLE_LOGGING: z
    .string()
    .optional()
    .transform((val) => val !== 'false'),
  
  // Server-only variables
  DIRECTUS_TOKEN: z.string().min(1, 'DIRECTUS_TOKEN is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Parse and validate environment variables
const parseEnv = () => {
  const env = {
    NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL,
    NEXT_PUBLIC_ENABLE_LOGGING: process.env.NEXT_PUBLIC_ENABLE_LOGGING,
    DIRECTUS_TOKEN: process.env.DIRECTUS_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error('Invalid environment variables. Check the console for details.');
  }

  return result.data;
};

// Export validated environment variables
export const env = parseEnv();

// Type-safe access to environment variables
export type Env = z.infer<typeof envSchema>;
