import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiFilter, FiDownload, FiCalendar, FiArrowUp, FiArrowDown, FiSearch } from 'react-icons/fi'

// Sample transaction data
const initialTransactions = [
  {
    id: 1,
    date: '2025-03-01',
    description: 'Grocery Store',
    amount: 78.35,
    category: 'Food & Dining',
    merchant: 'Whole Foods',
    type: 'expense'
  },
  {
    id: 2,
    date: '2025-02-28',
    description: 'Monthly Salary',
    amount: 3500.00,
    category: 'Income',
    merchant: 'Employer Inc.',
    type: 'income'
  },
  {
    id: 3,
    date: '2025-02-27',
    description: 'Coffee Shop',
    amount: 5.75,
    category: 'Food & Dining',
    merchant: 'Starbucks',
    type: 'expense'
  },
  {
    id: 4,
    date: '2025-02-26',
    description: 'Gas Station',
    amount: 45.80,
    category: 'Transportation',
    merchant: 'Shell',
    type: 'expense'
  },
  {
    id: 5,
    date: '2025-02-25',
    description: 'Movie Tickets',
    amount: 24.00,
    category: 'Entertainment',
    merchant: 'AMC Theaters',
    type: 'expense'
  },
  {
    id: 6,
    date: '2025-02-24',
    description: 'Online Purchase',
    amount: 39.99,
    category: 'Shopping',
    merchant: 'Amazon',
    type: 'expense'
  },
  {
    id: 7,
    date: '2025-02-23',
    description: 'Ride Share',
    amount: 18.50,
    category: 'Transportation',
    merchant: 'Uber',
    type: 'expense'
  },
  {
    id: 8,
    date: '2025-02-22',
    description: 'Electricity Bill',
    amount: 95.40,
    category: 'Utilities',
    merchant: 'Power Company',
    type: 'expense'
  }
]

// Category icons from our utility
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
  'Income': '💸',
  'Other': '📋'
}

// Transaction component
const TransactionItem = ({ transaction }: { transaction: any }) => {
  const isIncome = transaction.type === 'income'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isIncome ? 'bg-success bg-opacity-10' : 'bg-primary bg-opacity-10'
          }`}>
            <span className="text-xl">
              {categoryIcons[transaction.category] || '📋'}
            </span>
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-neutral-900 dark:text-white">{transaction.description}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {transaction.merchant} • {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className={`text-right ${isIncome ? 'text-success' : 'text-error'}`}>
          <p className="font-semibold">
            {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
            {transaction.category}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Filter Panel component
const FilterPanel = ({ onClose, onApplyFilters }: { onClose: () => void, onApplyFilters: (filters: any) => void }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [categories, setCategories] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  
  const handleCategoryToggle = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category))
    } else {
      setCategories([...categories, category])
    }
  }
  
  const handleTypeToggle = (type: string) => {
    if (types.includes(type)) {
      setTypes(types.filter(t => t !== type))
    } else {
      setTypes([...types, type])
    }
  }
  
  const handleApply = () => {
    onApplyFilters({
      dateRange,
      categories,
      types
    })
    onClose()
  }
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-5 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Filter Transactions</h3>
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-neutral-800 dark:text-neutral-200">Date Range</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-neutral-500 dark:text-neutral-400">Start Date</label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
              <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
          <div>
            <label className="text-xs text-neutral-500 dark:text-neutral-400">End Date</label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
              <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2 text-neutral-800 dark:text-neutral-200">Transaction Type</h4>
        <div className="flex space-x-3">
          <button
            onClick={() => handleTypeToggle('income')}
            className={`px-3 py-2 rounded-md flex items-center ${
              types.includes('income') 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <FiArrowUp className={types.includes('income') ? 'text-white' : 'text-success'} />
            <span className="ml-2">Income</span>
          </button>
          <button
            onClick={() => handleTypeToggle('expense')}
            className={`px-3 py-2 rounded-md flex items-center ${
              types.includes('expense') 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <FiArrowDown className={types.includes('expense') ? 'text-white' : 'text-error'} />
            <span className="ml-2">Expense</span>
          </button>
        </div>
      </div>
      
      <div className="mb-5">
        <h4 className="font-medium mb-2 text-neutral-800 dark:text-neutral-200">Categories</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(categoryIcons).map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-2 rounded-md flex items-center text-sm ${
                categories.includes(category) 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-300"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

// Main Transactions page component
const Transactions = () => {
  const [transactions] = useState(initialTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    dateRange: { start: '', end: '' },
    categories: [] as string[],
    types: [] as string[]
  })
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Search term filter
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    // Date range filter
    if (activeFilters.dateRange.start && new Date(transaction.date) < new Date(activeFilters.dateRange.start)) {
      return false
    }
    if (activeFilters.dateRange.end && new Date(transaction.date) > new Date(activeFilters.dateRange.end)) {
      return false
    }
    
    // Category filter
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(transaction.category)) {
      return false
    }
    
    // Type filter
    if (activeFilters.types.length > 0 && !activeFilters.types.includes(transaction.type)) {
      return false
    }
    
    return true
  })
  
  // Calculate totals
  const income = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const expense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const balance = income - expense
  
  return (
    <div className="pb-6">
      {/* Header */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Transactions
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(true)}
              className="btn-outline-primary flex items-center"
            >
              <FiFilter className="mr-1" /> 
              Filters
              {(activeFilters.categories.length > 0 || activeFilters.types.length > 0) && (
                <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilters.categories.length + activeFilters.types.length}
                </span>
              )}
            </button>
            <button className="btn-outline-primary flex items-center">
              <FiDownload className="mr-1" /> Export
            </button>
          </div>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          View and manage your transaction history
        </p>
      </section>
      
      {/* Filter dialog */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <FilterPanel 
              onClose={() => setShowFilters(false)} 
              onApplyFilters={setActiveFilters} 
            />
          </motion.div>
        </motion.div>
      )}
      
      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-5">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Income</p>
          <h3 className="text-2xl font-bold text-success">${income.toFixed(2)}</h3>
          <div className="flex items-center mt-2 text-success">
            <FiArrowUp size={16} />
            <span className="text-xs ml-1">
              {filteredTransactions.filter(t => t.type === 'income').length} transactions
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-5">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Expenses</p>
          <h3 className="text-2xl font-bold text-error">${expense.toFixed(2)}</h3>
          <div className="flex items-center mt-2 text-error">
            <FiArrowDown size={16} />
            <span className="text-xs ml-1">
              {filteredTransactions.filter(t => t.type === 'expense').length} transactions
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-5">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Balance</p>
          <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-error'}`}>
            ${balance.toFixed(2)}
          </h3>
          <div className="flex items-center mt-2 text-neutral-500 dark:text-neutral-400">
            <span className="text-xs">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Bar */}
      <section className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>
      </section>
      
      {/* Transaction List */}
      <section className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">No transactions found</p>
          </div>
        )}
      </section>
      
      {/* Gamification Element */}
      <section className="mt-8 bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Budget Tracker Achievement</h3>
            <p className="text-white text-opacity-90">
              You've tracked 25 transactions this month! Earn 50 coins for reaching 30 transactions.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-sm font-medium mt-1">5 more to go</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Transactions
