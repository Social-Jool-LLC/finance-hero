import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrendingDown, FiTarget, FiCreditCard, FiArrowRight, FiAward, FiCompass } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { usePlaidContext } from '../context/PlaidLinkContext'
import { useUser } from '../context/UserContext'
import ProgressBar from '../components/common/ProgressBar'

// Dashboard card component
interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

const Card = ({ title, children, className = '' }: CardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-white dark:bg-neutral-800 rounded-xl shadow-md p-5 card-hover ${className}`}
  >
    <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">{title}</h3>
    {children}
  </motion.div>
)

// Stats item component
interface StatsItemProps {
  label: string
  value: string | number
  change?: number
  icon: React.ReactNode
  positive?: boolean
}

const StatsItem = ({ label, value, change, icon, positive }: StatsItemProps) => (
  <div className="flex items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${positive ? 'bg-success bg-opacity-10 text-success' : 'bg-error bg-opacity-10 text-error'}`}>
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
      <div className="flex items-center">
        <p className="text-lg font-semibold text-neutral-800 dark:text-white">{value}</p>
        {change !== undefined && (
          <span className={`ml-2 text-xs ${positive ? 'text-success' : 'text-error'} flex items-center`}>
            {positive ? <FiTrendingUp size={12} className="mr-1" /> : <FiTrendingDown size={12} className="mr-1" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  </div>
)

// Transaction item component
interface TransactionProps {
  name: string
  amount: number
  date: string
  category: string
  icon: string 
}

const Transaction = ({ name, amount, date, category, icon }: TransactionProps) => (
  <div className="flex items-center justify-between py-3 border-b dark:border-neutral-700">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div className="ml-3">
        <p className="font-medium text-neutral-800 dark:text-white">{name}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{category} • {date}</p>
      </div>
    </div>
    <p className={`font-medium ${amount < 0 ? 'text-error' : 'text-success'}`}>
      {amount < 0 ? '-' : '+'}${Math.abs(amount).toFixed(2)}
    </p>
  </div>
)

// Quest item component
interface QuestProps {
  title: string
  description: string
  reward: number
  progress: number
  icon: React.ReactNode
}

const Quest = ({ title, description, reward, progress, icon }: QuestProps) => (
  <div className="flex items-start p-3 border-b dark:border-neutral-700 last:border-0">
    <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 text-primary flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="ml-3 flex-1">
      <div className="flex justify-between">
        <h4 className="font-medium text-neutral-800 dark:text-white">{title}</h4>
        <span className="text-xs font-medium text-amber-500 flex items-center">
          ⭐ {reward}
        </span>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{description}</p>
      <ProgressBar value={progress} size="sm" color="primary" />
    </div>
  </div>
)

const Dashboard = () => {
  const { isPlaidLinked, openPlaidLink } = usePlaidContext()
  const { user } = useUser()
  const [insights, setInsights] = useState({
    spending: { amount: 1250, change: -12 },
    savings: { amount: 450, change: 8 },
    monthlyBudget: { amount: 2000, spent: 1250 }
  })
  
  // Recent transactions data
  const recentTransactions = [
    { id: 1, name: 'Starbucks Coffee', amount: -5.75, date: 'Today, 10:23 AM', category: 'Food & Dining', icon: '☕' },
    { id: 2, name: 'Spotify Premium', amount: -9.99, date: 'Yesterday', category: 'Entertainment', icon: '🎵' },
    { id: 3, name: 'Amazon.com', amount: -24.99, date: 'Mar 1', category: 'Shopping', icon: '🛒' },
    { id: 4, name: 'Paycheck', amount: 1200, date: 'Feb 28', category: 'Income', icon: '💰' }
  ]
  
  // Active quests data
  const activeQuests = [
    { 
      id: 1, 
      title: 'Budget Master', 
      description: 'Create your first monthly budget', 
      reward: 50, 
      progress: 0,
      icon: <FiTarget size={16} /> 
    },
    { 
      id: 2, 
      title: 'Saving Streak', 
      description: 'Stay under budget for 3 days in a row', 
      reward: 30, 
      progress: 66,
      icon: <FiTrendingUp size={16} /> 
    },
    { 
      id: 3, 
      title: 'Transaction Tracker', 
      description: 'Categorize all your transactions this week', 
      reward: 25, 
      progress: 80,
      icon: <FiCreditCard size={16} /> 
    }
  ]
  
  // Calculate progress for monthly budget
  const budgetProgress = (insights.monthlyBudget.spent / insights.monthlyBudget.amount) * 100
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Welcome back, {user?.name.split(' ')[0] || 'Hero'}!
          </h1>
          <div className="hidden md:flex items-center space-x-1 text-primary dark:text-primary-light text-sm">
            <span>⚡ {user?.streak || 0} day streak</span>
          </div>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Track your financial progress and complete quests to level up!
        </p>
      </section>
      
      {/* Connect Bank CTA - Shows if not connected to Plaid */}
      {!isPlaidLinked && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 md:p-8 text-white mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Connect your bank account</h2>
              <p className="text-white text-opacity-90 max-w-lg">
                Link your bank account to automatically track transactions, set budgets, and earn achievements!
              </p>
            </div>
            <button 
              onClick={openPlaidLink}
              className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:shadow-md transition-all"
            >
              Connect Now
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Financial Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Financial Pulse">
          <div className="space-y-3">
            <StatsItem 
              label="Monthly Spending" 
              value={`$${insights.spending.amount}`} 
              change={insights.spending.change} 
              icon={<FiTrendingDown size={18} />} 
              positive={false}
            />
            <StatsItem 
              label="Monthly Savings" 
              value={`$${insights.savings.amount}`} 
              change={insights.savings.change} 
              icon={<FiTrendingUp size={18} />} 
              positive={true}
            />
          </div>
        </Card>
        
        <Card title="Monthly Budget">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Used ${insights.monthlyBudget.spent} of ${insights.monthlyBudget.amount}
              </span>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {Math.round(budgetProgress)}%
              </span>
            </div>
            <ProgressBar 
              value={budgetProgress} 
              color={budgetProgress > 80 ? 'warning' : 'success'} 
              animated 
            />
          </div>
          <Link 
            to="/budgets" 
            className="text-sm text-primary dark:text-primary-light font-medium flex items-center hover:underline"
          >
            View all budgets <FiArrowRight size={14} className="ml-1" />
          </Link>
        </Card>
        
        <Card title="Level Progress">
          <div className="mb-4">
            <div className="flex justify-between items-end mb-1">
              <div>
                <p className="text-lg font-bold text-primary dark:text-primary-light">Level {user?.level || 1}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user?.xp || 0} / {(user?.level || 1) * 500} XP</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-xl">
                  🏆
                </div>
                <p className="text-xs mt-1 text-neutral-500 dark:text-neutral-400">Rank</p>
              </div>
            </div>
            <ProgressBar 
              value={(user?.xp || 0) / ((user?.level || 1) * 500) * 100} 
              color="primary" 
              animated 
            />
          </div>
          <div className="flex justify-between items-center">
            <Link 
              to="/achievements" 
              className="text-sm text-primary dark:text-primary-light font-medium flex items-center hover:underline"
            >
              View achievements <FiAward size={14} className="ml-1" />
            </Link>
            <span className="text-amber-500 font-medium text-sm flex items-center">
              ⭐ {user?.coins || 0}
            </span>
          </div>
        </Card>
      </section>
      
      {/* Transactions and Quests Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Recent Transactions">
          <div className="space-y-1">
            {recentTransactions.map(transaction => (
              <Transaction key={transaction.id} {...transaction} />
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link 
              to="/transactions" 
              className="text-sm text-primary dark:text-primary-light font-medium flex items-center justify-end hover:underline"
            >
              View all transactions <FiArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </Card>
        
        <Card title="Active Quests">
          <div>
            {activeQuests.map(quest => (
              <Quest key={quest.id} {...quest} />
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link 
              to="/quests" 
              className="text-sm text-primary dark:text-primary-light font-medium flex items-center justify-end hover:underline"
            >
              View all quests <FiCompass size={14} className="ml-1" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Dashboard
