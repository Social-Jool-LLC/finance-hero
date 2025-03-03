import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiGithub, FiTwitter } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useUser } from '../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { setUser } = useUser()
  const navigate = useNavigate()
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, we'll use mock data
      const mockUser = {
        id: 'user-123',
        name: 'Alex Johnson',
        email: email,
        avatar: 'https://i.pravatar.cc/150?img=37',
        level: 3,
        xp: 350,
        coins: 270,
        streak: 5,
        onboardingComplete: true,
        achievements: ['first_login', 'first_budget', 'week_streak'],
        preferences: {
          theme: 'light' as 'light',
          notifications: true
        }
      }
      
      setUser(mockUser)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
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
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white font-display">Welcome back!</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">Log in to continue your financial journey</p>
          </div>
          
          {error && (
            <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
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
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Password
                  </label>
                  <a href="#" className="text-sm text-primary dark:text-primary-light hover:underline">
                    Forgot Password?
                  </a>
                </div>
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
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
              
              <div className="relative flex items-center justify-center mt-8 mb-6">
                <div className="absolute w-full border-t border-neutral-200 dark:border-neutral-700"></div>
                <div className="relative bg-white dark:bg-neutral-900 px-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Or continue with
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
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary dark:text-primary-light font-medium hover:underline">
              Sign Up
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
            <h2 className="text-3xl font-bold mb-6 font-display">Level Up Your Finances</h2>
            
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                <span className="text-5xl">🚀</span>
              </div>
              
              <p className="text-white text-opacity-90 mb-4">
                Finance Hero makes managing your money fun with:
              </p>
              
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <span className="mr-2">🎮</span>
                  <span>Gamified financial tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏆</span>
                  <span>Achievements & rewards</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📊</span>
                  <span>Smart insights & budgeting</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔐</span>
                  <span>Secure bank connection</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-white border-opacity-20">
              <p className="font-medium">
                "Finance Hero turned my budgeting from boring to fun! I've saved $1200 in just 3 months."
              </p>
              <div className="mt-4 flex items-center justify-center">
                <img 
                  src="https://i.pravatar.cc/150?img=32" 
                  alt="Testimonial" 
                  className="w-8 h-8 rounded-full border-2 border-white" 
                />
                <div className="ml-2 text-left">
                  <p className="text-sm font-medium">Jamie Chen</p>
                  <p className="text-xs text-white text-opacity-80">Level 8 Finance Hero</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
