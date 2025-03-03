import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight, FiLock, FiCheckCircle, FiAward } from 'react-icons/fi'
import ProgressBar from '../components/common/ProgressBar'
import { Quest, QuestDifficulty, calculateQuestProgress, questCategories, questDifficulties } from '../utils/questUtils'

// Sample quests data
const mockQuests: Quest[] = [
  {
    id: 'q1',
    title: 'Budget Master',
    description: 'Create your first budget and stick to it for 7 days. Track all your expenses and stay under budget.',
    shortDescription: 'Create and stick to a budget for 7 days',
    category: 'budgeting',
    difficulty: 'medium',
    status: 'in_progress',
    icon: '📊',
    color: 'primary',
    steps: [
      { id: 's1', description: 'Create a budget', isCompleted: true },
      { id: 's2', description: 'Track expenses for 7 days', isCompleted: false },
      { id: 's3', description: 'Stay under budget', isCompleted: false }
    ],
    reward: {
      coins: 150,
      xp: 80
    }
  },
  {
    id: 'q2',
    title: 'Daily Log',
    description: 'Log in to the app today and check your financial overview.',
    shortDescription: 'Log in and check your overview',
    category: 'daily',
    difficulty: 'easy',
    status: 'completed',
    icon: '🔄',
    color: 'success',
    steps: [
      { id: 's1', description: 'Log in to the app', isCompleted: true },
      { id: 's2', description: 'Check your dashboard', isCompleted: true }
    ],
    reward: {
      coins: 50,
      xp: 20
    },
    completedAt: '2025-03-03T08:30:00'
  },
  {
    id: 'q3',
    title: 'Savings Challenge',
    description: 'Save 10% of your income this month by reducing unnecessary expenses.',
    shortDescription: 'Save 10% of monthly income',
    category: 'saving',
    difficulty: 'hard',
    status: 'available',
    icon: '💰',
    color: 'warning',
    steps: [
      { id: 's1', description: 'Calculate 10% of monthly income', isCompleted: false },
      { id: 's2', description: 'Identify unnecessary expenses', isCompleted: false },
      { id: 's3', description: 'Save the target amount', isCompleted: false },
      { id: 's4', description: "Don't touch savings for 30 days", isCompleted: false }
    ],
    reward: {
      coins: 300,
      xp: 150,
      badges: ['Saver Badge']
    }
  },
  {
    id: 'q4',
    title: 'Financial Literacy',
    description: 'Learn about compound interest and how it can grow your wealth over time.',
    shortDescription: 'Learn about compound interest',
    category: 'learning',
    difficulty: 'easy',
    status: 'available',
    icon: '📚',
    color: 'info',
    steps: [
      { id: 's1', description: 'Watch the educational video', isCompleted: false },
      { id: 's2', description: 'Complete the quiz', isCompleted: false }
    ],
    reward: {
      coins: 75,
      xp: 40
    }
  },
  {
    id: 'q5',
    title: 'Debt Destroyer',
    description: 'Make extra payments towards your highest interest debt to reduce interest costs.',
    shortDescription: 'Make extra debt payments',
    category: 'spending',
    difficulty: 'expert',
    status: 'locked',
    icon: '💸',
    color: 'error',
    steps: [
      { id: 's1', description: 'Identify highest interest debt', isCompleted: false },
      { id: 's2', description: 'Find $100 in budget to redirect', isCompleted: false },
      { id: 's3', description: 'Make an extra payment', isCompleted: false }
    ],
    reward: {
      coins: 400,
      xp: 200,
      badges: ['Debt Crusher Badge']
    },
    prerequisites: ['q1', 'q3']
  }
]

// Quest Card Component
interface QuestCardProps {
  quest: Quest;
  onStart: (quest: Quest) => void;
  onClaim: (quest: Quest) => void;
}

const QuestCard = ({ quest, onStart, onClaim }: QuestCardProps) => {
  const category = questCategories[quest.category];
  const difficulty = questDifficulties[quest.difficulty];
  const progress = calculateQuestProgress(quest);
  
  const renderButton = () => {
    if (quest.status === 'locked') {
      return (
        <button className="btn-disabled flex items-center justify-center w-full mt-3" disabled>
          <FiLock size={16} className="mr-2" /> Locked
        </button>
      );
    }
    
    if (quest.status === 'completed') {
      return (
        <div className="flex items-center justify-center text-success mt-3">
          <FiCheckCircle size={18} className="mr-2" /> 
          <span className="font-medium">Completed</span>
        </div>
      );
    }
    
    if (quest.status === 'in_progress') {
      return (
        <button 
          className="btn-secondary flex items-center justify-center w-full mt-3"
          onClick={() => onClaim(quest)}
        >
          <FiAward size={16} className="mr-2" /> Claim Reward
        </button>
      );
    }
    
    return (
      <button 
        className="btn-primary flex items-center justify-center w-full mt-3"
        onClick={() => onStart(quest)}
      >
        <FiArrowRight size={16} className="mr-2" /> Start Quest
      </button>
    );
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-3">{quest.icon}</span>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">{quest.title}</h3>
            <div className="flex items-center space-x-3 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full bg-${category.color}-100 text-${category.color}-600 dark:bg-${category.color}-900 dark:bg-opacity-30 dark:text-${category.color}-400`}>
                {category.name}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-${difficulty.color}-100 text-${difficulty.color}-600 dark:bg-${difficulty.color}-900 dark:bg-opacity-30 dark:text-${difficulty.color}-400`}>
                {difficulty.name}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
          {quest.shortDescription || quest.description}
        </p>
        
        {(quest.status === 'in_progress' || quest.status === 'completed') && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar 
              value={progress} 
              color={quest.status === 'completed' ? 'success' : 'primary'}
              size="sm"
              animated={quest.status === 'in_progress'}
            />
          </div>
        )}
        
        <div className="flex justify-between text-sm mb-3">
          <div className="flex items-center text-neutral-500 dark:text-neutral-400">
            <FiClock size={14} className="mr-1" />
            <span>{quest.steps?.length || 1} {quest.steps?.length === 1 ? 'task' : 'tasks'}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-warning font-medium">
              {quest.reward.coins} <span className="text-xs ml-1">coins</span>
            </span>
            <span className="flex items-center text-secondary font-medium">
              {quest.reward.xp} <span className="text-xs ml-1">XP</span>
            </span>
          </div>
        </div>
        
        {renderButton()}
      </div>
    </motion.div>
  );
};

const Quests = () => {
  const [quests, setQuests] = useState(mockQuests);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredQuests = activeFilter === 'all' 
    ? quests 
    : quests.filter(quest => quest.category === activeFilter || quest.status === activeFilter);
  
  const handleStartQuest = (quest: Quest) => {
    setQuests(quests.map(q => 
      q.id === quest.id 
        ? { ...q, status: 'in_progress' as const } 
        : q
    ));
  };
  
  const handleClaimReward = (quest: Quest) => {
    setQuests(quests.map(q => 
      q.id === quest.id 
        ? { ...q, status: 'completed' as const, completedAt: new Date().toISOString() } 
        : q
    ));
  };
  
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
            Financial Quests
          </h1>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Complete quests to earn rewards and improve your financial health!
        </p>
      </section>
      
      {/* Quest Filters */}
      <section className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('all')}
          >
            All Quests
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'daily' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('daily')}
          >
            Daily
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'in_progress' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('in_progress')}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'completed' ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>
      </section>
      
      {/* Featured Quest */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🏆</span>
              <div>
                <h2 className="text-xl font-bold">Weekly Challenge</h2>
                <p className="text-sm text-white text-opacity-90">
                  Track all expenses for 7 consecutive days
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-white text-opacity-90 ml-2 mb-4">
              <li>Log every purchase you make for a full week</li>
              <li>Categorize all transactions properly</li>
              <li>Review your spending patterns at the end of the week</li>
            </ul>
            <button className="bg-white text-primary font-medium px-4 py-2 rounded-lg flex items-center hover:bg-opacity-90 transition-colors">
              <FiArrowRight size={16} className="mr-2" /> Accept Challenge
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <p className="text-xs uppercase tracking-wide mb-1">Rewards</p>
              <div className="flex justify-center space-x-4">
                <div>
                  <p className="text-xl font-bold">250</p>
                  <p className="text-xs">Coins</p>
                </div>
                <div>
                  <p className="text-xl font-bold">100</p>
                  <p className="text-xs">XP</p>
                </div>
                <div>
                  <p className="text-xl font-bold">🧠</p>
                  <p className="text-xs">Badge</p>
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm flex items-center">
              <FiCalendar size={14} className="mr-1" />
              <span>Expires in 5 days</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quests Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredQuests.map(quest => (
          <motion.div key={quest.id} variants={itemVariants}>
            <QuestCard
              quest={quest}
              onStart={handleStartQuest}
              onClaim={handleClaimReward}
            />
          </motion.div>
        ))}
      </motion.section>
    </div>
  )
}

export default Quests
