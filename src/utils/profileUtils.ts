// User profile related utilities and types

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  coins: number;
  joinedAt: Date | string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    currency: string;
    language: string;
  };
  stats: {
    daysActive: number;
    transactionsLogged: number;
    budgetsCreated: number;
    goalsCompleted: number;
    achievementsUnlocked: number;
    questsCompleted: number;
  };
  subscriptionTier: 'free' | 'premium' | 'pro';
  subscriptionRenewsAt?: Date | string;
  bankAccountsConnected: number;
}

// Calculate XP required for next level
export const calculateNextLevelXP = (level: number): number => {
  // Simple formula: each level requires 100 * level XP
  return 100 * level;
};

// Calculate level progress percentage
export const calculateLevelProgress = (xp: number, level: number): number => {
  const nextLevelXP = calculateNextLevelXP(level);
  const prevLevelXP = calculateNextLevelXP(level - 1);
  const levelXP = xp - prevLevelXP;
  const requiredXP = nextLevelXP - prevLevelXP;
  
  return Math.min(100, Math.max(0, Math.round((levelXP / requiredXP) * 100)));
};

// Calculate remaining XP required for next level
export const calculateRemainingXP = (xp: number, level: number): number => {
  const nextLevelXP = calculateNextLevelXP(level);
  const prevLevelXP = calculateNextLevelXP(level - 1);
  const totalRequired = nextLevelXP - prevLevelXP;
  const currentProgress = xp - prevLevelXP;
  
  return Math.max(0, totalRequired - currentProgress);
};

// Get appropriate badge for user level
export const getLevelBadge = (level: number): { name: string; icon: string; color: string } => {
  if (level < 5) {
    return { name: 'Rookie', icon: '🌱', color: 'success' };
  } else if (level < 10) {
    return { name: 'Explorer', icon: '🔍', color: 'info' };
  } else if (level < 20) {
    return { name: 'Pro', icon: '⚡', color: 'primary' };
  } else if (level < 30) {
    return { name: 'Expert', icon: '💎', color: 'secondary' };
  } else {
    return { name: 'Master', icon: '👑', color: 'warning' };
  }
};
