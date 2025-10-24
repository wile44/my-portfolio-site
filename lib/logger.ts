/**
 * Logging utility for the application
 * Provides structured logging with environment-based configuration
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGGING !== 'false';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    // Always log errors
    if (level === 'error') return true;
    
    // In production, only log warnings and errors
    if (!this.isDevelopment && level === 'debug') return false;
    
    // Respect the enable flag
    return this.isEnabled;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.shouldLog('error')) {
      const errorContext = {
        ...context,
        ...(error instanceof Error && {
          error: {
            name: error.name,
            message: error.message,
            stack: this.isDevelopment ? error.stack : undefined,
          },
        }),
      };
      console.error(this.formatMessage('error', message, errorContext));
    }
  }

  // Directus-specific helpers
  directus = {
    fetchStart: (collection: string, filter?: unknown) => {
      this.debug(`Fetching from Directus: ${collection}`, { filter });
    },
    fetchSuccess: (collection: string, count: number) => {
      this.info(`Successfully fetched from Directus: ${collection}`, { count });
    },
    fetchError: (collection: string, error: unknown) => {
      this.error(`Failed to fetch from Directus: ${collection}`, error);
    },
  };
}

// Export singleton instance
export const logger = new Logger();

// Export for testing or custom instances
export default Logger;
