// Achievement related utilities and types

export type AchievementCategory = 'saving' | 'spending' | 'budgeting' | 'investing' | 'milestone' | 'streak' | 'special';
export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  rarity: AchievementRarity;
  isUnlocked: boolean;
  unlockedAt?: Date | string;
  progress?: number;
  reward?: {
    coins: number;
    xp: number;
  };
  requiredAmount?: number;
  currentAmount?: number;
  secret?: boolean;
}

// Achievement categories with metadata
export const achievementCategories: Record<AchievementCategory, { name: string; icon: string; color: string }> = {
  saving: {
    name: 'Saving',
    icon: '💰',
    color: 'success'
  },
  spending: {
    name: 'Spending',
    icon: '💸',
    color: 'warning'
  },
  budgeting: {
    name: 'Budgeting',
    icon: '📊',
    color: 'primary'
  },
  investing: {
    name: 'Investing',
    icon: '📈',
    color: 'secondary'
  },
  milestone: {
    name: 'Milestone',
    icon: '🏆',
    color: 'info'
  },
  streak: {
    name: 'Streak',
    icon: '🔥',
    color: 'error'
  },
  special: {
    name: 'Special',
    icon: '⭐',
    color: 'tertiary'
  }
};

// Achievement rarity with metadata
export const achievementRarities: Record<AchievementRarity, { name: string; color: string; multiplier: number }> = {
  common: {
    name: 'Common',
    color: 'neutral',
    multiplier: 1
  },
  uncommon: {
    name: 'Uncommon',
    color: 'success',
    multiplier: 2
  },
  rare: {
    name: 'Rare',
    color: 'info',
    multiplier: 3
  },
  epic: {
    name: 'Epic',
    color: 'secondary',
    multiplier: 5
  },
  legendary: {
    name: 'Legendary',
    color: 'warning',
    multiplier: 10
  }
};

// Calculate achievement progress percentage
export const calculateAchievementProgress = (achievement: Achievement): number => {
  if (achievement.isUnlocked) {
    return 100;
  }
  
  if (achievement.requiredAmount && achievement.currentAmount !== undefined) {
    return Math.min(100, Math.max(0, Math.round((achievement.currentAmount / achievement.requiredAmount) * 100)));
  }
  
  return achievement.progress || 0;
};

// Get achievement reward based on rarity
export const calculateAchievementReward = (baseCoins: number, baseXP: number, rarity: AchievementRarity): { coins: number; xp: number } => {
  const multiplier = achievementRarities[rarity].multiplier;
  return {
    coins: baseCoins * multiplier,
    xp: baseXP * multiplier
  };
};

// Check if an achievement could be unlocked
export const checkAchievementUnlock = (
  achievement: Achievement, 
  value: number
): Achievement => {
  if (achievement.isUnlocked || !achievement.requiredAmount) {
    return achievement;
  }
  
  const newCurrentAmount = Math.max(achievement.currentAmount || 0, value);
  const isUnlocked = newCurrentAmount >= achievement.requiredAmount;
  
  return {
    ...achievement,
    currentAmount: newCurrentAmount,
    isUnlocked,
    unlockedAt: isUnlocked ? new Date().toISOString() : undefined
  };
};

// Generate a personalized achievement recommendation
export const getPersonalizedAchievementRecommendation = (
  achievements: Achievement[],
  userActivity: { type: string; count: number }[]
): Achievement | null => {
  // Find non-unlocked achievements
  const availableAchievements = achievements.filter(a => !a.isUnlocked);
  if (availableAchievements.length === 0) return null;
  
  // Find achievements that are close to completion (>50% progress)
  const nearCompletion = availableAchievements.filter(a => {
    const progress = calculateAchievementProgress(a);
    return progress > 50 && progress < 100;
  });
  
  if (nearCompletion.length > 0) {
    // Return the achievement with the highest progress
    return nearCompletion.sort((a, b) => 
      (calculateAchievementProgress(b) - calculateAchievementProgress(a))
    )[0];
  }
  
  // Otherwise, find achievements that match user's most frequent activity
  if (userActivity.length > 0) {
    const topActivity = userActivity.sort((a, b) => b.count - a.count)[0];
    
    // Find achievement related to top activity
    const relevantAchievements = availableAchievements.filter(a => 
      a.category === topActivity.type || a.description.toLowerCase().includes(topActivity.type.toLowerCase())
    );
    
    if (relevantAchievements.length > 0) {
      return relevantAchievements[0];
    }
  }
  
  // If nothing specific found, return a random available achievement
  return availableAchievements[Math.floor(Math.random() * availableAchievements.length)];
};
