import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Handle timeout errors specifically
    if (error.message.includes('timeout') || error.message.includes('timed out')) {
      console.warn('Timeout error caught by ErrorBoundary:', error.message);
    }
    
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log timeout-specific errors
    if (error.message.includes('timeout') || error.message.includes('timed out')) {
      console.error('Timeout error details:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
    
    this.setState({ errorInfo });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error state if children change (new props)
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
      this.retryCount = 0;
    }
  }

  render() {
    if (this.state.hasError) {
      const retry = () => {
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          this.setState({ hasError: false, error: undefined, errorInfo: undefined });
        } else {
          // Force page reload if too many retries
          window.location.reload();
        }
      };

      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={retry} />;
      }

      // Special handling for timeout errors
      const isTimeoutError = this.state.error?.message.includes('timeout') || 
                            this.state.error?.message.includes('timed out');

      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <Alert className="max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="space-y-3">
              <div>
                <p className="font-medium">
                  {isTimeoutError ? 'Connection Timeout' : 'Something went wrong'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isTimeoutError 
                    ? 'The request took too long to complete. Please check your connection and try again.'
                    : 'An unexpected error occurred. Please try again.'
                  }
                </p>
                {this.retryCount >= this.maxRetries && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Multiple retries failed. The page will refresh automatically.
                  </p>
                )}
              </div>
              <Button 
                onClick={retry} 
                size="sm" 
                className="w-full"
                disabled={this.retryCount >= this.maxRetries}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {this.retryCount >= this.maxRetries ? 'Refreshing...' : 'Try Again'}
              </Button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-muted-foreground">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <div className="mt-2 border-t pt-2">
                        {this.state.error.stack}
                      </div>
                    )}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}