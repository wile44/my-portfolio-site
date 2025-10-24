import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../logger';

describe('Logger', () => {
  const originalEnv = process.env.NODE_ENV;
  
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.NODE_ENV = originalEnv;
  });

  describe('debug', () => {
    it('should log debug messages in development', () => {
      process.env.NODE_ENV = 'development';
      logger.debug('Test debug message');
      expect(console.log).toHaveBeenCalled();
    });

    it('should not log debug messages in production', () => {
      process.env.NODE_ENV = 'production';
      logger.debug('Test debug message');
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Test info message');
      expect(console.info).toHaveBeenCalled();
    });

    it('should include context in log message', () => {
      logger.info('Test message', { userId: '123' });
      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining('userId')
      );
    });
  });

  describe('error', () => {
    it('should always log errors', () => {
      process.env.NODE_ENV = 'production';
      logger.error('Test error');
      expect(console.error).toHaveBeenCalled();
    });

    it('should log error objects with stack traces in development', () => {
      process.env.NODE_ENV = 'development';
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('stack')
      );
    });

    it('should not include stack traces in production', () => {
      process.env.NODE_ENV = 'production';
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      const mockError = console.error as unknown as { mock: { calls: string[][] } };
      const callArg = mockError.mock.calls[0][0];
      expect(callArg).not.toContain('stack');
    });
  });

  describe('directus helpers', () => {
    it('should log directus fetch start', () => {
      logger.directus.fetchStart('projects', { id: '123' });
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('projects')
      );
    });

    it('should log directus fetch success', () => {
      logger.directus.fetchSuccess('projects', 5);
      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining('projects')
      );
    });

    it('should log directus fetch error', () => {
      const error = new Error('Fetch failed');
      logger.directus.fetchError('projects', error);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
