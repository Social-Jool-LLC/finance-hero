import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/dashboard"
        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound
