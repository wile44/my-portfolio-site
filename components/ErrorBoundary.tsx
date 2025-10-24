'use client';

import React from 'react';
import { logger } from '@/lib/logger';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('Error caught by boundary', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-background border border-border rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-foreground/70 mb-6">
              We encountered an unexpected error. Please try refreshing the section.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-left">
                <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all duration-200"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Section-specific error boundary with smaller fallback
export function SectionErrorBoundary({ 
  children, 
  sectionName 
}: { 
  children: React.ReactNode; 
  sectionName: string;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Unable to load {sectionName}
            </h3>
            <p className="text-foreground/70">
              This section is temporarily unavailable. Please try again later.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
