import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiGithub, FiTwitter } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useUser } from '../context/UserContext'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { setUser } = useUser()
  const navigate = useNavigate()
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, we'll create a new user with level 1
      const newUser = {
        id: 'user-' + Date.now(),
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        level: 1,
        xp: 0,
        coins: 50, // Start with some coins
        streak: 0,
        onboardingComplete: false, // New users need onboarding
        achievements: [],
        preferences: {
          theme: 'light' as 'light',
          notifications: true
        }
      }
      
      setUser(newUser)
      navigate('/onboarding') // Redirect to onboarding
    } catch (err) {
      setError('Error creating account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
                FH
              </div>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white font-display">Create Account</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">Begin your financial journey with Finance Hero</p>
          </div>
          
          {error && (
            <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-neutral-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
                    ) : (
                      <FiEye className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-neutral-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                  I agree to the{' '}
                  <a href="#" className="text-primary dark:text-primary-light hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary dark:text-primary-light hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className="relative flex items-center justify-center mt-8 mb-6">
                <div className="absolute w-full border-t border-neutral-200 dark:border-neutral-700"></div>
                <div className="relative bg-white dark:bg-neutral-900 px-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Or sign up with
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-2.5 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex justify-center items-center"
                >
                  <FcGoogle size={20} />
                </button>
                <button
                  type="button"
                  className="py-2.5 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex justify-center items-center"
                >
                  <FiGithub size={20} className="dark:text-white" />
                </button>
                <button
                  type="button"
                  className="py-2.5 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex justify-center items-center"
                >
                  <FiTwitter size={20} className="text-blue-400" />
                </button>
              </div>
            </div>
          </form>
          
          <p className="mt-8 text-center text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary dark:text-primary-light font-medium hover:underline">
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
      
      {/* Right side - Hero image/graphics */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md text-center"
          >
            <h2 className="text-3xl font-bold mb-6 font-display">Join Thousands of Finance Heroes</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 rounded-xl p-5 text-center">
                <div className="text-4xl mb-2">🎮</div>
                <h3 className="text-lg font-semibold mb-1">Gamified Experience</h3>
                <p className="text-sm text-white text-opacity-80">Turn financial tracking into a fun game</p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-xl p-5 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-lg font-semibold mb-1">Earn Rewards</h3>
                <p className="text-sm text-white text-opacity-80">Complete quests and level up</p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-xl p-5 text-center">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-lg font-semibold mb-1">Smart Insights</h3>
                <p className="text-sm text-white text-opacity-80">Get personalized financial tips</p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-xl p-5 text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="text-lg font-semibold mb-1">Secure & Private</h3>
                <p className="text-sm text-white text-opacity-80">Your data is encrypted and safe</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/150?img=1" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=2" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/150?img=4" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-dark flex items-center justify-center text-xs font-medium">
                  +5k
                </div>
              </div>
              <p className="text-sm text-white">Join our growing community today!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Signup
