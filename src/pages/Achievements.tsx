import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUnlock, FiLock, FiAward, FiStar, FiClock } from 'react-icons/fi'
import ProgressBar from '../components/common/ProgressBar'
import { Achievement, calculateAchievementProgress, achievementCategories, achievementRarities } from '../utils/achievementUtils'

// Sample achievements data
const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Budget Beginner',
    description: 'Create your first budget',
    category: 'budgeting',
    icon: '📊',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2025-01-15T12:30:00',
    reward: {
      coins: 50,
      xp: 25
    }
  },
  {
    id: 'a2',
    title: 'Saving Star',
    description: 'Save $1,000 in your emergency fund',
    category: 'saving',
    icon: '💰',
    rarity: 'uncommon',
    isUnlocked: true,
    unlockedAt: '2025-02-10T18:45:00',
    reward: {
      coins: 100,
      xp: 50
    }
  },
  {
    id: 'a3',
    title: 'Debt Destroyer',
    description: 'Pay off a debt completely',
    category: 'milestone',
    icon: '💸',
    rarity: 'rare',
    isUnlocked: false,
    progress: 75,
    reward: {
      coins: 200,
      xp: 100
    }
  },
  {
    id: 'a4',
    title: 'Budget Master',
    description: 'Stay under budget for 3 consecutive months',
    category: 'streak',
    icon: '🔥',
    rarity: 'epic',
    isUnlocked: false,
    requiredAmount: 3,
    currentAmount: 2,
    reward: {
      coins: 300,
      xp: 150
    }
  },
  {
    id: 'a5',
    title: 'Savings Guru',
    description: 'Save 6 months worth of expenses in your emergency fund',
    category: 'milestone',
    icon: '🏆',
    rarity: 'legendary',
    isUnlocked: false,
    requiredAmount: 6,
    currentAmount: 3,
    reward: {
      coins: 500,
      xp: 250
    }
  },
  {
    id: 'a6',
    title: 'Financial Lifesaver',
    description: 'Connect an emergency fund to your profile',
    category: 'saving',
    icon: '🧡',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2025-01-10T09:15:00',
    reward: {
      coins: 50,
      xp: 25
    }
  },
  {
    id: 'a7',
    title: 'Investment Novice',
    description: 'Make your first investment',
    category: 'investing',
    icon: '📈',
    rarity: 'uncommon',
    isUnlocked: false,
    progress: 0,
    reward: {
      coins: 100,
      xp: 50
    }
  },
  {
    id: 'a8',
    title: 'Money Tracker',
    description: 'Log expenses for 30 consecutive days',
    category: 'streak',
    icon: '📅',
    rarity: 'rare',
    isUnlocked: false,
    requiredAmount: 30,
    currentAmount: 12,
    reward: {
      coins: 200,
      xp: 100
    }
  }
]

// Achievement Card Component
interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const category = achievementCategories[achievement.category];
  const rarity = achievementRarities[achievement.rarity];
  const progress = calculateAchievementProgress(achievement);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden ${!achievement.isUnlocked ? 'opacity-75' : ''}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${achievement.isUnlocked ? `bg-${rarity.color}-100 dark:bg-${rarity.color}-900 dark:bg-opacity-30` : 'bg-neutral-200 dark:bg-neutral-700'}`}>
              {achievement.icon}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-neutral-900 dark:text-white">{achievement.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${category.color}-100 text-${category.color}-600 dark:bg-${category.color}-900 dark:bg-opacity-30 dark:text-${category.color}-400`}>
                  {category.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${rarity.color}-100 text-${rarity.color}-600 dark:bg-${rarity.color}-900 dark:bg-opacity-30 dark:text-${rarity.color}-400`}>
                  {rarity.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {achievement.isUnlocked ? (
              <span className="text-success">
                <FiUnlock size={18} />
              </span>
            ) : (
              <span className="text-neutral-400">
                <FiLock size={18} />
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          {achievement.description}
        </p>
        
        {!achievement.isUnlocked && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar 
              value={progress} 
              color="primary"
              size="sm"
              animated={progress > 0}
            />
          </div>
        )}
        
        <div className="flex justify-between items-center">
          {achievement.isUnlocked ? (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
              <FiClock size={14} className="mr-1" />
              <span>Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}</span>
            </div>
          ) : (
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {achievement.requiredAmount && achievement.currentAmount !== undefined ? (
                <span>{achievement.currentAmount} / {achievement.requiredAmount} completed</span>
              ) : (
                <span>In progress...</span>
              )}
            </div>
          )}
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center text-warning font-medium">
              <FiStar size={14} className="mr-1" /> {achievement.reward?.coins}
            </span>
            <span className="flex items-center text-secondary font-medium">
              <FiAward size={14} className="mr-1" /> {achievement.reward?.xp} XP
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Achievements Stats Card
const AchievementsStats = ({ achievements }: { achievements: Achievement[] }) => {
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);
  
  const rarityStats = Object.entries(achievementRarities).map(([key, value]) => {
    const rarity = key as Achievement['rarity'];
    const count = achievements.filter(a => a.rarity === rarity).length;
    const unlocked = achievements.filter(a => a.rarity === rarity && a.isUnlocked).length;
    return { rarity, name: value.name, color: value.color, count, unlocked };
  });
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
        Achievement Progress
      </h2>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-neutral-500 dark:text-neutral-400">
            {unlockedCount} of {totalCount} Achievements Unlocked
          </span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {percentage}%
          </span>
        </div>
        <ProgressBar 
          value={percentage} 
          color="primary" 
          size="lg"
          animated
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
        {rarityStats.map(stat => (
          <div key={stat.rarity} className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900 dark:bg-opacity-20`}>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.name}</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">
              {stat.unlocked}/{stat.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Achievements = () => {
  const [achievements, setAchievements] = useState(mockAchievements);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter achievements based on selected filter
  const filteredAchievements = activeFilter === 'all'
    ? achievements
    : activeFilter === 'unlocked'
      ? achievements.filter(a => a.isUnlocked)
      : activeFilter === 'locked'
        ? achievements.filter(a => !a.isUnlocked)
        : achievements.filter(a => a.category === activeFilter);
  
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
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Achievements
          </h1>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Track your financial milestones and achievements!
        </p>
      </section>
      
      {/* Stats Card */}
      <AchievementsStats achievements={achievements} />
      
      {/* Filters */}
      <section className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'unlocked' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('unlocked')}
          >
            Unlocked
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'locked' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('locked')}
          >
            Locked
          </button>
          {Object.entries(achievementCategories).map(([key, category]) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeFilter === key ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
              onClick={() => setActiveFilter(key)}
            >
              <span className="mr-1">{category.icon}</span> {category.name}
            </button>
          ))}
        </div>
      </section>
      
      {/* Next Achievement to Unlock */}
      <section className="bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark p-5 rounded-xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              <span className="mr-2">💡</span> Suggested Achievement
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              <strong>Money Tracker</strong>: Log expenses for 30 consecutive days
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              You're 40% of the way there! Keep tracking your expenses daily.
            </p>
          </div>
          <button className="btn-primary flex items-center">
            View Details
          </button>
        </div>
      </section>
      
      {/* Achievements Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAchievements.map(achievement => (
          <motion.div key={achievement.id} variants={itemVariants}>
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </motion.section>
    </div>
  )
}

export default Achievements
