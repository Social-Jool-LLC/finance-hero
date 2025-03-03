import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiShield, FiCreditCard, FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import { usePlaidContext } from '../context/PlaidLinkContext'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const ConnectBank = () => {
  const { generateLinkToken, isPlaidLinked, isPlaidLoading } = usePlaidContext()
  const { updateUserStats } = useUser()
  const navigate = useNavigate()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStep, setConnectionStep] = useState(0)
  
  useEffect(() => {
    // Generate a link token when the component mounts
    if (!isPlaidLinked) {
      generateLinkToken()
    }
  }, [isPlaidLinked, generateLinkToken])
  
  const handleConnectBank = async () => {
    setIsConnecting(true)
    setConnectionStep(1)
    
    try {
      // For demo purposes, we'll simulate the connection process
      // In a real app, this would be handled by the Plaid Link component
      
      // Simulate authentication and account selection
      await new Promise(resolve => setTimeout(resolve, 1500))
      setConnectionStep(2)
      
      // Simulate connecting accounts
      await new Promise(resolve => setTimeout(resolve, 1500))
      setConnectionStep(3)
      
      // Simulate done
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reward the user for connecting their bank
      updateUserStats({
        coins: 100,
        xp: 50
      })
      
      // Navigate back to dashboard
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
      
    } catch (error) {
      console.error('Error connecting bank:', error)
      setIsConnecting(false)
    }
  }
  
  /* Function to be used when Plaid integration is fully implemented
  const openRealPlaidLink = () => {
    setIsConnecting(true)
    // Will use the Plaid API when implemented
  }
  */
  
  // Step descriptions
  const steps = [
    { 
      title: 'Authenticate',
      description: 'Securely log in to your bank',
      icon: <FiLock size={20} />
    },
    { 
      title: 'Select Accounts',
      description: 'Choose which accounts to connect',
      icon: <FiCreditCard size={20} />
    },
    { 
      title: 'Connect',
      description: 'Establish secure connection',
      icon: <FiShield size={20} />
    }
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary-light"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              FH
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 md:p-8"
        >
          {isPlaidLinked ? (
            <div className="text-center py-12">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-16 h-16 mx-auto mb-6 bg-success bg-opacity-10 rounded-full flex items-center justify-center text-success"
              >
                <FiCheckCircle size={32} />
              </motion.div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Bank Connected Successfully!
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                Your bank accounts are now securely connected to Finance Hero. You've earned 100 coins and 50 XP!
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  Connect Your Bank Account
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                  Link your bank accounts to automatically track transactions, set budgets, and earn achievements!
                </p>
              </div>
              
              {/* Security callouts */}
              <motion.div 
                variants={itemVariants}
                className="grid md:grid-cols-3 gap-6 mb-10"
              >
                <div className="bg-neutral-50 dark:bg-neutral-700 p-5 rounded-lg text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
                    <FiLock size={24} />
                  </div>
                  <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">Bank-Level Security</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Your credentials are never stored and data is encrypted end-to-end.
                  </p>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-700 p-5 rounded-lg text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
                    <FiShield size={24} />
                  </div>
                  <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">Read-Only Access</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    We can only read your transaction data, never move money or make changes.
                  </p>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-700 p-5 rounded-lg text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
                    <FiCreditCard size={24} />
                  </div>
                  <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">Supported Banks</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    We support over 12,000 financial institutions across the US and Canada.
                  </p>
                </div>
              </motion.div>
              
              {isConnecting ? (
                <motion.div 
                  variants={itemVariants}
                  className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-6 md:p-8"
                >
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              connectionStep > index 
                                ? 'bg-success text-white' 
                                : connectionStep === index 
                                  ? 'bg-primary text-white' 
                                  : 'bg-neutral-200 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400'
                            }`}
                          >
                            {connectionStep > index ? <FiCheckCircle size={20} /> : step.icon}
                          </div>
                          <p className="text-xs mt-2 font-medium text-center">{step.title}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                        {connectionStep === 3 
                          ? 'Connection Successful!' 
                          : `Step ${connectionStep + 1}: ${steps[connectionStep]?.title}`}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        {connectionStep === 3 
                          ? 'Your bank accounts are now connected to Finance Hero.' 
                          : steps[connectionStep]?.description}
                      </p>
                      
                      {connectionStep < 3 && (
                        <div className="relative h-2 bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(connectionStep / 3) * 100}%` }}
                            className="absolute top-0 left-0 h-full bg-primary"
                          />
                        </div>
                      )}
                      
                      {connectionStep === 3 && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                          className="w-16 h-16 mx-auto mb-4 bg-success bg-opacity-10 rounded-full flex items-center justify-center text-success"
                        >
                          <FiCheckCircle size={32} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    You'll earn <span className="text-amber-500 font-bold">100 coins</span> and <span className="text-primary font-bold">50 XP</span> for connecting your first account!
                  </p>
                  
                  {/* For the demo we'll use the simulated flow, but in a real app you'd use openRealPlaidLink */}
                  <button
                    onClick={handleConnectBank}
                    disabled={isPlaidLoading}
                    className="btn-primary px-8 py-3 text-base"
                  >
                    {isPlaidLoading ? 'Loading...' : 'Connect Bank Account'}
                  </button>
                  
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                    By connecting your account, you agree to our <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
        
        {/* Supported banks logos */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 text-center"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            We support thousands of banks and financial institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="h-6 w-20 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
            <div className="h-6 w-24 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
            <div className="h-6 w-16 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
            <div className="h-6 w-28 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
            <div className="h-6 w-20 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
            <div className="h-6 w-24 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default ConnectBank
