import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Application Error</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Something went wrong while loading the application.
            </p>
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
              <p className="font-medium mb-1">Error Details:</p>
              <p className="text-red-600">{this.state.error?.message}</p>
              {this.state.errorInfo?.componentStack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-600">Show component stack</summary>
                  <pre className="mt-2 text-xs overflow-auto max-h-40">{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;