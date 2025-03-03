import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Onboarding = () => {
  const navigate = useNavigate()
  const { completeOnboarding } = useUser()
  
  const handleComplete = () => {
    completeOnboarding()
    navigate('/dashboard')
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary to-secondary">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-white">
          Welcome to Finance Hero!
        </h1>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-center">
          Onboarding page is under construction. Click the button below to continue to the dashboard.
        </p>
        
        <button
          onClick={handleComplete}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  )
}

export default Onboarding
