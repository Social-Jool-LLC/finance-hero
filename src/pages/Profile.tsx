import { useState } from 'react'
import { FiEdit2, FiUser, FiSettings, FiCreditCard, FiShield, FiBell } from 'react-icons/fi'
import ProgressBar from '../components/common/ProgressBar'
import { UserProfile, calculateLevelProgress, calculateRemainingXP, getLevelBadge } from '../utils/profileUtils'

// Mock user profile data
const mockUserProfile: UserProfile = {
  id: 'user123',
  username: 'alexfinance',
  email: 'alex@example.com',
  displayName: 'Alex Johnson',
  avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4F46E5&color=fff',
  level: 12,
  xp: 1250,
  coins: 3750,
  joinedAt: '2024-11-15T10:30:00',
  preferences: {
    darkMode: true,
    notifications: true,
    currency: 'USD',
    language: 'en',
  },
  stats: {
    daysActive: 48,
    transactionsLogged: 186,
    budgetsCreated: 5,
    goalsCompleted: 3,
    achievementsUnlocked: 12,
    questsCompleted: 28,
  },
  subscriptionTier: 'premium',
  subscriptionRenewsAt: '2025-11-15T10:30:00',
  bankAccountsConnected: 2
};

// Profile Header Component
const ProfileHeader = ({ profile }: { profile: UserProfile }) => {
  const levelProgress = calculateLevelProgress(profile.xp, profile.level);
  const remainingXP = calculateRemainingXP(profile.xp, profile.level);
  const levelBadge = getLevelBadge(profile.level);
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <img 
            src={profile.avatarUrl} 
            alt={profile.displayName} 
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-primary"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
            <FiEdit2 size={16} />
          </div>
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center justify-center md:justify-start">
            {profile.displayName}
            <span className={`ml-2 text-sm px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:bg-opacity-30 dark:text-primary-400 flex items-center`}>
              {levelBadge.icon} {levelBadge.name}
            </span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-3">@{profile.username}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Level</span>
              <span className="font-bold text-lg text-primary">{profile.level}</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">XP</span>
              <span className="font-bold text-lg text-secondary">{profile.xp}</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Coins</span>
              <span className="font-bold text-lg text-warning">{profile.coins}</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Member Since</span>
              <span className="font-bold">{new Date(profile.joinedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Level {profile.level}
          </span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Level {profile.level + 1}
          </span>
        </div>
        <ProgressBar 
          value={levelProgress} 
          color="primary" 
          size="md"
          animated
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 text-right">
          {remainingXP} XP needed for next level
        </p>
      </div>
    </div>
  );
};

// Tab component
interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
  const tabs = [
    { id: 'personal', label: 'Personal', icon: <FiUser /> },
    { id: 'preferences', label: 'Preferences', icon: <FiSettings /> },
    { id: 'payment', label: 'Payment Methods', icon: <FiCreditCard /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
  ];
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-1 flex overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex-1 min-w-0 py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-center ${activeTab === tab.id ? 'bg-primary-light dark:bg-primary-dark text-primary' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="mr-2">{tab.icon}</span>
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Stats card component
const StatsCard = ({ profile }: { profile: UserProfile }) => {
  const stats = [
    { label: 'Days Active', value: profile.stats.daysActive, icon: '📅' },
    { label: 'Transactions', value: profile.stats.transactionsLogged, icon: '💸' },
    { label: 'Budgets', value: profile.stats.budgetsCreated, icon: '📊' },
    { label: 'Goals Completed', value: profile.stats.goalsCompleted, icon: '🎯' },
    { label: 'Achievements', value: profile.stats.achievementsUnlocked, icon: '🏆' },
    { label: 'Quests Completed', value: profile.stats.questsCompleted, icon: '⚔️' },
  ];
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
        Your Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                <p className="text-lg font-semibold text-neutral-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Subscription card component
const SubscriptionCard = ({ profile }: { profile: UserProfile }) => {
  const subscriptionDetails = {
    free: {
      color: 'neutral',
      features: ['Basic budgeting', 'Limited goals', 'Standard support']
    },
    premium: {
      color: 'primary',
      features: ['Advanced analytics', 'Unlimited goals', 'Priority support', 'Custom categories', 'Ad-free experience']
    },
    pro: {
      color: 'warning',
      features: ['Investment tracking', 'Financial advisor access', 'Premium analytics', 'Unlimited goals', 'Priority support', 'Custom categories', 'Ad-free experience']
    }
  };
  
  const details = subscriptionDetails[profile.subscriptionTier];
  const bgClass = profile.subscriptionTier === 'premium' ? 'bg-primary-100 dark:bg-primary-900' : 
                 profile.subscriptionTier === 'pro' ? 'bg-warning-100 dark:bg-warning-900' : 
                 'bg-neutral-100 dark:bg-neutral-900';
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
      <div className={`${bgClass} dark:bg-opacity-30 p-4`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Current Plan</p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white capitalize">
              {profile.subscriptionTier}
            </h3>
          </div>
          <div className="flex items-center">
            {profile.subscriptionTier !== 'free' && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-3">
                Renews: {new Date(profile.subscriptionRenewsAt!).toLocaleDateString()}
              </span>
            )}
            <button className="btn-secondary text-sm">Upgrade</button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-semibold mb-2 text-neutral-900 dark:text-white">Plan Features</h4>
        <ul className="text-sm space-y-2">
          {details.features.map(feature => (
            <li key={feature} className="flex items-center text-neutral-600 dark:text-neutral-400">
              <span className="text-success mr-2">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  const [profile] = useState(mockUserProfile);
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Profile
          </h1>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Manage your account settings and preferences
        </p>
      </section>
      
      {/* Profile Header Card */}
      <ProfileHeader profile={profile} />
      
      {/* Profile Tabs */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Tab Content - Just showing a placeholder */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
          {activeTab === 'personal' ? 'Personal Information' :
          activeTab === 'preferences' ? 'Preferences' :
          activeTab === 'payment' ? 'Payment Methods' :
          activeTab === 'security' ? 'Security Settings' :
          'Notification Settings'}
        </h3>
        
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Display Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800"
                  value={profile.displayName}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Username</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800"
                  value={profile.username}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800"
                  value={profile.email}
                  readOnly
                />
              </div>
            </div>
            <button className="btn-primary mt-4">
              Edit Profile
            </button>
          </div>
        )}
        
        {activeTab !== 'personal' && (
          <p className="text-neutral-500 dark:text-neutral-400">
            This section is currently under development. Check back soon for updates!
          </p>
        )}
      </div>
      
      {/* Stats Section */}
      <StatsCard profile={profile} />
      
      {/* Subscription Section */}
      <SubscriptionCard profile={profile} />
    </div>
  )
}

export default Profile
