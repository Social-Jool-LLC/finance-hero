// Budget related utility functions

export interface Budget {
  id: number
  name: string
  amount: number
  spent: number
  category: string
  transactions: number
  color: string
}

export interface Transaction {
  id: number
  amount: number
  date: Date | string
  description: string
  category: string
  merchant: string
  type: 'income' | 'expense'
}

// Category icons mapping
export const categoryIcons: Record<string, string> = {
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

// Calculate percentage of budget spent
export const calculatePercentage = (spent: number, amount: number): number => {
  if (amount <= 0) return 0
  return (spent / amount) * 100
}

// Get status color based on percentage spent
export const getBudgetStatusColor = (percentage: number): 'primary' | 'success' | 'warning' | 'error' => {
  if (percentage >= 100) return 'error'
  if (percentage >= 85) return 'warning'
  if (percentage <= 50) return 'success'
  return 'primary'
}

// Get text to display for budget status
export const getBudgetStatusText = (percentage: number): string => {
  if (percentage >= 100) return 'Exceeded'
  if (percentage >= 85) return 'Warning'
  if (percentage >= 70) return 'Caution'
  if (percentage <= 50) return 'Good'
  return 'On Track'
}

// Calculate remaining budget
export const calculateRemaining = (amount: number, spent: number): number => {
  return amount - spent
}

// Get transactions for a specific budget
export const getTransactionsForBudget = (
  transactions: Transaction[], 
  budgetCategory: string
): Transaction[] => {
  return transactions.filter(
    transaction => transaction.category === budgetCategory && transaction.type === 'expense'
  )
}

// Calculate total spent for a category 
export const calculateCategorySpending = (
  transactions: Transaction[], 
  category: string
): number => {
  return transactions
    .filter(t => t.category === category && t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0)
}

// Create a new budget
export const createBudget = (
  name: string,
  amount: number,
  category: string,
  color: string = 'primary'
): Budget => ({
  id: Date.now(),
  name,
  amount,
  spent: 0, // Start with zero spent
  category,
  transactions: 0,
  color
})

// Update a budget with new transaction data
export const updateBudgetWithTransactions = (
  budget: Budget,
  transactions: Transaction[]
): Budget => {
  const relevantTransactions = getTransactionsForBudget(transactions, budget.category)
  const totalSpent = relevantTransactions.reduce((sum, t) => sum + t.amount, 0)
  
  return {
    ...budget,
    spent: totalSpent,
    transactions: relevantTransactions.length
  }
}

// Get reward points for staying under budget
export const calculateBudgetRewards = (budget: Budget): number => {
  const percentage = calculatePercentage(budget.spent, budget.amount)
  
  if (percentage <= 80) return 50 // Great budget management
  if (percentage <= 95) return 25 // Good budget management
  if (percentage <= 100) return 10 // Just under budget
  return 0 // Over budget, no rewards
}

// Generate a suggested budget based on transaction history
export const suggestBudget = (
  transactions: Transaction[],
  category: string,
  monthsToAnalyze: number = 3
): number => {
  const categoryTransactions = transactions.filter(
    t => t.category === category && t.type === 'expense'
  )
  
  if (categoryTransactions.length === 0) return 0
  
  const totalSpent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0)
  const averageMonthly = totalSpent / monthsToAnalyze
  
  // Add 10% buffer to the suggested budget
  return Math.ceil(averageMonthly * 1.1)
}
