import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiDollarSign, FiTarget, FiAward } from 'react-icons/fi'
import ProgressBar from '../components/common/ProgressBar'
import { calculateGoalProgress, goalCategories } from '../utils/goalUtils'

// Sample goals data
const initialGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5600,
    category: 'emergency',
    deadline: '2025-06-30',
    description: 'Build a 3-month emergency fund',
    priority: 'high',
    icon: '🛡️',
    color: 'warning',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Dream Vacation',
    targetAmount: 3000,
    currentAmount: 1200,
    category: 'travel',
    deadline: '2025-12-31',
    description: 'Save for a trip to Japan',
    priority: 'medium',
    icon: '✈️',
    color: 'primary',
    createdAt: '2024-02-01'
  },
  {
    id: 3,
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 1500,
    category: 'tech',
    deadline: '2024-09-01',
    description: 'Upgrade my work setup',
    priority: 'medium',
    icon: '💻',
    color: 'success',
    createdAt: '2024-03-15',
    completedAt: '2024-08-25'
  },
  {
    id: 4,
    name: 'Down Payment',
    targetAmount: 50000,
    currentAmount: 12500,
    category: 'home',
    deadline: '2026-12-31',
    description: 'Save for a house down payment',
    priority: 'high',
    icon: '🏠',
    color: 'secondary',
    createdAt: '2023-11-01'
  }
]

// GoalCard component
interface GoalCardProps {
  goal: any
  onEdit: () => void
  onDelete: () => void
  onContribute: () => void
}

const GoalCard = ({ goal, onEdit, onDelete, onContribute }: GoalCardProps) => {
  const progress = calculateGoalProgress(goal.currentAmount, goal.targetAmount)
  const isCompleted = goal.currentAmount >= goal.targetAmount
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{goal.icon}</span>
            <h3 className="font-semibold text-neutral-900 dark:text-white">{goal.name}</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
              aria-label="Edit"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-error transition-colors"
              aria-label="Delete"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{goal.description}</p>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              {Math.round(progress)}%
            </span>
          </div>
          <ProgressBar 
            value={progress} 
            color={isCompleted ? 'success' : (goal.color as any)}
            animated={progress > 0 && !isCompleted}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-neutral-500 dark:text-neutral-400">
            <FiCalendar size={14} className="mr-1" />
            <span>{new Date(goal.deadline).toLocaleDateString()}</span>
          </div>
          
          {isCompleted ? (
            <span className="text-success flex items-center">
              <FiAward size={14} className="mr-1" /> Completed!
            </span>
          ) : (
            <button 
              onClick={onContribute}
              className="text-primary flex items-center font-medium hover:underline"
            >
              <FiDollarSign size={14} className="mr-1" /> Contribute
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Goals page component
const Goals = () => {
  const [goals, setGoals] = useState(initialGoals)
  
  // Calculate total progress across all goals
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const overallProgress = calculateGoalProgress(totalSaved, totalTarget)
  
  const handleEditGoal = (goal: any) => {
    // Placeholder for edit functionality
    console.log('Edit goal:', goal)
  }
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }
  
  const handleContribute = (goal: any) => {
    // Placeholder for contribute functionality
    console.log('Contribute to goal:', goal)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Financial Goals
          </h1>
          <button
            className="btn-primary flex items-center"
          >
            <FiPlus className="mr-1" /> New Goal
          </button>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Set and track your financial goals to achieve financial freedom!
        </p>
      </section>
      
      {/* Overall Progress */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
          Overall Progress
        </h2>
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="text-neutral-500 dark:text-neutral-400">Total Saved: </span>
              <span className="font-medium text-neutral-900 dark:text-white">${totalSaved.toLocaleString()}</span>
              <span className="text-neutral-500 dark:text-neutral-400"> of </span>
              <span className="font-medium text-neutral-900 dark:text-white">${totalTarget.toLocaleString()}</span>
            </div>
            <span className="font-medium text-neutral-900 dark:text-white">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <ProgressBar 
            value={overallProgress} 
            color="primary" 
            size="lg"
            animated
            showValue
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Saved</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">${totalSaved.toLocaleString()}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Target Total</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">${totalTarget.toLocaleString()}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Remaining</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">${(totalTarget - totalSaved).toLocaleString()}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Active Goals</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">{goals.filter(g => g.currentAmount < g.targetAmount).length}</p>
          </div>
        </div>
      </section>
      
      {/* Goals Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {goals.map(goal => (
          <motion.div key={goal.id} variants={itemVariants}>
            <GoalCard
              goal={goal}
              onEdit={() => handleEditGoal(goal)}
              onDelete={() => handleDeleteGoal(goal.id)}
              onContribute={() => handleContribute(goal)}
            />
          </motion.div>
        ))}
      </motion.section>
      
      {/* Game Element - Goal Achievement */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mt-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🏆</span>
              <h2 className="text-xl font-bold">Goal Seeker Challenge</h2>
            </div>
            <p className="mt-2 text-white text-opacity-90">
              Complete 3 financial goals by the end of the year to earn 500 coins and unlock the "Financial Visionary" achievement!
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-sm font-medium">500 coins</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Goals
