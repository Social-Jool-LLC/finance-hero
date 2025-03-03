// Goal related utility functions and types

export interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: Date | string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  icon: string;
  color: string;
  createdAt: Date | string;
  completedAt?: Date | string;
  reminderFrequency?: 'daily' | 'weekly' | 'monthly' | 'none';
  autoContribute?: {
    enabled: boolean;
    amount: number;
    frequency: 'weekly' | 'biweekly' | 'monthly';
  };
  milestones?: {
    percentage: number;
    achieved: boolean;
    reward?: number;
  }[];
}

// Goal categories
export const goalCategories = [
  {
    id: 'emergency',
    name: 'Emergency Fund',
    icon: '🛡️',
    color: 'warning',
    description: 'Save for unexpected expenses'
  },
  {
    id: 'retirement',
    name: 'Retirement',
    icon: '🏖️',
    color: 'success',
    description: 'Long term savings for retirement'
  },
  {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    color: 'primary',
    description: 'Down payment or home improvements'
  },
  {
    id: 'vehicle',
    name: 'Vehicle',
    icon: '🚗',
    color: 'info',
    description: 'Car purchase or repairs'
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
    color: 'secondary',
    description: 'Vacation or travel plans'
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    color: 'primary',
    description: 'Tuition or continued education'
  },
  {
    id: 'debt',
    name: 'Debt Payoff',
    icon: '💳',
    color: 'error',
    description: 'Pay off loans or credit cards'
  },
  {
    id: 'tech',
    name: 'Tech & Gadgets',
    icon: '📱',
    color: 'info',
    description: 'Electronics and technology'
  },
  {
    id: 'personal',
    name: 'Personal',
    icon: '🎁',
    color: 'success',
    description: 'Personal spending goals'
  },
  {
    id: 'other',
    name: 'Other',
    icon: '🎯',
    color: 'secondary',
    description: 'Other savings goals'
  }
];

// Calculate goal progress percentage
export const calculateGoalProgress = (current: number, target: number): number => {
  if (target <= 0) return 0;
  const percentage = (current / target) * 100;
  return Math.min(100, Math.max(0, percentage));
};

// Get estimated completion date based on contribution rate and current progress
export const getEstimatedCompletionDate = (
  currentAmount: number, 
  targetAmount: number, 
  monthlyContribution: number
): Date | null => {
  if (currentAmount >= targetAmount) {
    return new Date(); // Already completed
  }
  
  if (monthlyContribution <= 0) {
    return null; // Cannot calculate with no contributions
  }
  
  const amountLeft = targetAmount - currentAmount;
  const monthsLeft = Math.ceil(amountLeft / monthlyContribution);
  
  const estimatedDate = new Date();
  estimatedDate.setMonth(estimatedDate.getMonth() + monthsLeft);
  
  return estimatedDate;
};

// Get appropriate status color based on progress and deadline
export const getGoalStatusColor = (
  progress: number, 
  deadline: Date | string, 
  currentAmount: number,
  targetAmount: number
): string => {
  // If completed
  if (currentAmount >= targetAmount) {
    return 'success';
  }
  
  // Check if deadline is approaching
  const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // If deadline has passed
  if (daysLeft < 0) {
    return 'error';
  }
  
  // If less than 30 days left but progress is below 75%
  if (daysLeft < 30 && progress < 75) {
    return 'error';
  }
  
  // If less than 60 days left but progress is below 50%
  if (daysLeft < 60 && progress < 50) {
    return 'warning';
  }
  
  // Based on progress
  if (progress >= 75) {
    return 'success';
  }
  
  if (progress >= 50) {
    return 'primary';
  }
  
  if (progress >= 25) {
    return 'info';
  }
  
  return 'secondary';
};

// Get suggested goals for different user profiles
export const getSuggestedGoals = (userAge: number, hasDebt: boolean, hasEmergencyFund: boolean): Partial<Goal>[] => {
  const suggestions: Partial<Goal>[] = [];
  
  // Everyone should have an emergency fund
  if (!hasEmergencyFund) {
    suggestions.push({
      name: 'Emergency Fund',
      category: 'emergency',
      description: 'Build a safety net of 3-6 months of expenses',
      priority: 'high',
      icon: '🛡️',
      color: 'warning'
    });
  }
  
  // Pay off high-interest debt
  if (hasDebt) {
    suggestions.push({
      name: 'Debt Freedom Plan',
      category: 'debt',
      description: 'Pay off high-interest debt',
      priority: 'high',
      icon: '💳',
      color: 'error'
    });
  }
  
  // Age-based suggestions
  if (userAge < 30) {
    suggestions.push({
      name: 'Travel Adventure',
      category: 'travel',
      description: 'Save for your dream trip',
      priority: 'medium',
      icon: '✈️',
      color: 'secondary'
    });
    
    suggestions.push({
      name: 'Tech Upgrade Fund',
      category: 'tech',
      description: 'Save for new devices or gadgets',
      priority: 'low',
      icon: '📱',
      color: 'info'
    });
  }
  
  // Everyone should consider retirement savings
  suggestions.push({
    name: 'Retirement Booster',
    category: 'retirement',
    description: 'Increase your retirement contributions',
    priority: userAge > 40 ? 'high' : 'medium',
    icon: '🏖️',
    color: 'success'
  });
  
  return suggestions;
};
