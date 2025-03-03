import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import ProgressBar from '../components/common/ProgressBar'

// Budget category icons
const categoryIcons: Record<string, string> = {
  'Food & Dining': '🍔',
  'Transportation': '🚗',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Housing': '🏠',
  'Utilities': '💡',
  'Health': '⚕️',
  'Education': '📚',
  'Personal': '👤',
  'Travel': '✈️',
  'Savings': '💰',
  'Other': '📋'
}

// Sample budget data
const initialBudgets = [
  {
    id: 1,
    name: 'Food & Dining',
    amount: 500,
    spent: 320,
    category: 'Food & Dining',
    transactions: 15,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Transportation',
    amount: 200,
    spent: 175,
    category: 'Transportation',
    transactions: 8,
    color: 'secondary'
  },
  {
    id: 3,
    name: 'Entertainment',
    amount: 150,
    spent: 142,
    category: 'Entertainment',
    transactions: 4,
    color: 'warning'
  },
  {
    id: 4,
    name: 'Shopping',
    amount: 300,
    spent: 190,
    category: 'Shopping',
    transactions: 6,
    color: 'primary'
  },
  {
    id: 5,
    name: 'Savings Goal',
    amount: 400,
    spent: 400,
    category: 'Savings',
    transactions: 2,
    color: 'success'
  }
]

// BudgetCard component
interface BudgetCardProps {
  budget: any
  onEdit: () => void
  onDelete: () => void
}

const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => {
  const percentage = (budget.spent / budget.amount) * 100
  const remaining = budget.amount - budget.spent
  
  // Determine the status color based on percentage spent
  const getStatusColor = () => {
    if (percentage >= 100) return 'error'
    if (percentage >= 85) return 'warning'
    return budget.color || 'primary'
  }
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{categoryIcons[budget.category] || '📋'}</span>
            <h3 className="font-semibold text-neutral-900 dark:text-white">{budget.name}</h3>
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
          <div className="flex justify-between mb-1">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ${budget.spent} of ${budget.amount}
            </span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          </div>
          <ProgressBar 
            value={percentage} 
            color={getStatusColor() as any} 
            animated={percentage >= 85}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Remaining: </span>
            <span className={`font-medium ${remaining < 0 ? 'text-error' : 'text-neutral-900 dark:text-white'}`}>
              ${remaining.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Transactions: </span>
            <span className="font-medium text-neutral-900 dark:text-white">{budget.transactions}</span>
          </div>
        </div>
        
        {percentage >= 85 && (
          <div className={`mt-3 text-xs flex items-center p-2 rounded-lg ${
            percentage >= 100 
              ? 'bg-error bg-opacity-10 text-error'
              : 'bg-warning bg-opacity-10 text-warning'
          }`}>
            <FiAlertCircle className="mr-1.5" />
            {percentage >= 100 
              ? 'You have exceeded this budget.'
              : 'You are close to exceeding this budget.'}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// BudgetForm component
interface BudgetFormProps {
  budget?: any
  onSave: (budget: any) => void
  onCancel: () => void
}

const BudgetForm = ({ budget, onSave, onCancel }: BudgetFormProps) => {
  const [name, setName] = useState(budget?.name || '')
  const [amount, setAmount] = useState(budget?.amount || '')
  const [category, setCategory] = useState(budget?.category || 'Other')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !amount) return
    
    onSave({
      id: budget?.id || Date.now(),
      name,
      amount: parseFloat(amount.toString()),
      spent: budget?.spent || 0,
      category,
      transactions: budget?.transactions || 0,
      color: budget?.color || 'primary'
    })
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Budget Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Groceries, Rent, etc."
          required
        />
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Budget Amount ($)
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="0.00"
          required
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          {Object.keys(categoryIcons).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
        >
          {budget ? 'Update Budget' : 'Create Budget'}
        </button>
      </div>
    </form>
  )
}

// Main Budgets page component
const Budgets = () => {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<any>(null)
  
  // Calculate total budget and spent
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalPercentage = (totalSpent / totalBudget) * 100
  
  const handleOpenForm = () => {
    setEditingBudget(null)
    setIsFormOpen(true)
  }
  
  const handleEditBudget = (budget: any) => {
    setEditingBudget(budget)
    setIsFormOpen(true)
  }
  
  const handleDeleteBudget = (id: number) => {
    setBudgets(budgets.filter(budget => budget.id !== id))
  }
  
  const handleSaveBudget = (budget: any) => {
    if (editingBudget) {
      // Update existing budget
      setBudgets(budgets.map(b => b.id === budget.id ? budget : b))
    } else {
      // Add new budget
      setBudgets([...budgets, budget])
    }
    
    setIsFormOpen(false)
    setEditingBudget(null)
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
            My Budgets
          </h1>
          <button
            onClick={handleOpenForm}
            className="btn-primary flex items-center"
          >
            <FiPlus className="mr-1" /> New Budget
          </button>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Track your spending against budget targets and earn rewards for staying on track!
        </p>
      </section>
      
      {/* Total Budget Overview */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
          Monthly Budget Overview
        </h2>
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="text-neutral-500 dark:text-neutral-400">Total Spent: </span>
              <span className="font-medium text-neutral-900 dark:text-white">${totalSpent.toFixed(2)}</span>
              <span className="text-neutral-500 dark:text-neutral-400"> of </span>
              <span className="font-medium text-neutral-900 dark:text-white">${totalBudget.toFixed(2)}</span>
            </div>
            <span className="font-medium text-neutral-900 dark:text-white">
              {Math.round(totalPercentage)}%
            </span>
          </div>
          <ProgressBar 
            value={totalPercentage} 
            color={totalPercentage > 85 ? 'warning' : 'primary'} 
            size="lg"
            animated={totalPercentage > 70}
            showValue
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Budget</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">${totalBudget.toFixed(2)}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Spent</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Remaining</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">${(totalBudget - totalSpent).toFixed(2)}</p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Active Budgets</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">{budgets.length}</p>
          </div>
        </div>
      </section>
      
      {/* Budget Form - Shown when adding/editing */}
      {isFormOpen && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-neutral-50 dark:bg-neutral-700 py-3 px-5">
            <h2 className="font-semibold text-neutral-900 dark:text-white">
              {editingBudget ? 'Edit Budget' : 'Create New Budget'}
            </h2>
          </div>
          <BudgetForm 
            budget={editingBudget} 
            onSave={handleSaveBudget} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </motion.section>
      )}
      
      {/* Budgets Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {budgets.map(budget => (
          <motion.div key={budget.id} variants={itemVariants}>
            <BudgetCard
              budget={budget}
              onEdit={() => handleEditBudget(budget)}
              onDelete={() => handleDeleteBudget(budget.id)}
            />
          </motion.div>
        ))}
      </motion.section>
      
      {/* Game Element - Budget Quest */}
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
              <h2 className="text-xl font-bold">Budget Master Quest</h2>
            </div>
            <p className="mt-2 text-white text-opacity-90">
              Stay under budget in all categories for 30 days to earn 200 coins and unlock the "Budget Master" achievement!
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-sm font-medium">200 coins</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Budgets
