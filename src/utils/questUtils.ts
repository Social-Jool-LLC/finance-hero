// Quest related utility functions and types

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type QuestStatus = 'available' | 'in_progress' | 'completed' | 'expired' | 'locked';
export type QuestCategory = 'saving' | 'spending' | 'budgeting' | 'investing' | 'income' | 'learning' | 'daily';

export interface QuestReward {
  coins: number;
  xp: number;
  badges?: string[];
  items?: string[];
}

export interface QuestStep {
  id: string;
  description: string;
  isCompleted: boolean;
  target?: number;
  progress?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  icon: string;
  color: string;
  reward: QuestReward;
  expiresAt?: Date | string | null;
  unlocksAt?: Date | string | null;
  steps?: QuestStep[];
  completedAt?: Date | string;
  prerequisites?: string[];
  progressPercentage?: number;
}

// Quest categories with metadata
export const questCategories: Record<QuestCategory, { name: string; icon: string; color: string; description: string }> = {
  saving: {
    name: 'Saving',
    icon: '💰',
    color: 'success',
    description: 'Quests related to saving money and building wealth'
  },
  spending: {
    name: 'Spending',
    icon: '💸',
    color: 'warning',
    description: 'Quests related to mindful spending and expense tracking'
  },
  budgeting: {
    name: 'Budgeting',
    icon: '📊',
    color: 'primary',
    description: 'Quests related to creating and sticking to budgets'
  },
  investing: {
    name: 'Investing',
    icon: '📈',
    color: 'secondary',
    description: 'Quests related to investing money for long-term growth'
  },
  income: {
    name: 'Income',
    icon: '💵',
    color: 'info',
    description: 'Quests related to increasing your income'
  },
  learning: {
    name: 'Learning',
    icon: '📚',
    color: 'tertiary',
    description: 'Quests related to financial education'
  },
  daily: {
    name: 'Daily',
    icon: '🔄',
    color: 'error',
    description: 'Daily quests that refresh every 24 hours'
  }
};

// Quest difficulty levels with metadata
export const questDifficulties: Record<QuestDifficulty, { name: string; multiplier: number; color: string }> = {
  easy: {
    name: 'Easy',
    multiplier: 1,
    color: 'success'
  },
  medium: {
    name: 'Medium',
    multiplier: 1.5,
    color: 'info'
  },
  hard: {
    name: 'Hard',
    multiplier: 2,
    color: 'warning'
  },
  expert: {
    name: 'Expert',
    multiplier: 3,
    color: 'error'
  }
};

// Calculate quest progress percentage based on steps
export const calculateQuestProgress = (quest: Quest): number => {
  if (!quest.steps || quest.steps.length === 0) {
    return quest.status === 'completed' ? 100 : 0;
  }

  const completedSteps = quest.steps.filter(step => step.isCompleted).length;
  return Math.round((completedSteps / quest.steps.length) * 100);
};

// Check if a quest is available to the user
export const isQuestAvailable = (quest: Quest): boolean => {
  // Check if quest is explicitly locked
  if (quest.status === 'locked') {
    return false;
  }

  // Check if quest has unlock date that hasn't passed yet
  if (quest.unlocksAt) {
    const unlockDate = new Date(quest.unlocksAt);
    if (unlockDate > new Date()) {
      return false;
    }
  }

  // Check if quest is expired
  if (quest.expiresAt) {
    const expireDate = new Date(quest.expiresAt);
    if (expireDate < new Date()) {
      return false;
    }
  }

  return true;
};

// Get recommended quests based on user behavior
export const getRecommendedQuests = (quests: Quest[], userLevel: number): Quest[] => {
  // Filter available quests that aren't completed
  const availableQuests = quests.filter(quest => 
    isQuestAvailable(quest) && quest.status !== 'completed'
  );
  
  // Determine appropriate difficulty based on user level
  let targetDifficulty: QuestDifficulty = 'easy';
  if (userLevel >= 30) {
    targetDifficulty = 'expert';
  } else if (userLevel >= 20) {
    targetDifficulty = 'hard';
  } else if (userLevel >= 10) {
    targetDifficulty = 'medium';
  }
  
  // Prioritize quests of appropriate difficulty
  return availableQuests
    .sort((a, b) => {
      // First prioritize by matching difficulty
      if (a.difficulty === targetDifficulty && b.difficulty !== targetDifficulty) {
        return -1;
      }
      if (b.difficulty === targetDifficulty && a.difficulty !== targetDifficulty) {
        return 1;
      }
      
      // Then prioritize daily quests
      if (a.category === 'daily' && b.category !== 'daily') {
        return -1;
      }
      if (b.category === 'daily' && a.category !== 'daily') {
        return 1;
      }
      
      // Then prioritize by expiration (sooner expiration first)
      if (a.expiresAt && b.expiresAt) {
        return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      }
      if (a.expiresAt) return -1;
      if (b.expiresAt) return 1;
      
      return 0;
    })
    .slice(0, 3); // Return top 3 recommended quests
};
