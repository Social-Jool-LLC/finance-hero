import React, { Component, ErrorInfo, ReactNode } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    // Here you could log the error to an error reporting service
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full">
          <FiAlertTriangle className="text-5xl text-error mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
