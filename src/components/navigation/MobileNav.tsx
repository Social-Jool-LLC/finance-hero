import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, 
  FiPieChart, 
  FiCreditCard, 
  FiTarget, 
  FiCompass, 
  FiAward, 
  FiUser, 
  FiLogOut, 
  FiPlus,
  FiX
} from 'react-icons/fi'
import { useUser } from '../../context/UserContext'
import { usePlaidContext } from '../../context/PlaidLinkContext'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { user, logout } = useUser()
  const { openPlaidLink, isPlaidLinked } = usePlaidContext()
  
  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  }
  
  const handleLogout = () => {
    logout()
    onClose()
  }
  
  const handleConnectBank = () => {
    openPlaidLink()
    onClose()
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Side Menu */}
          <motion.div
            className="fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-neutral-800 shadow-xl flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
                  FH
                </div>
                <span className="ml-2 font-display font-bold text-lg text-primary dark:text-primary-light">Finance Hero</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* User info */}
            <div className="p-4 border-b dark:border-neutral-700">
              <div className="flex items-center">
                <img 
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=37'} 
                  alt="User avatar" 
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <div className="ml-3">
                  <p className="font-medium text-neutral-900 dark:text-white">{user?.name || 'Guest'}</p>
                  <div className="flex items-center">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Level {user?.level || 1}</span>
                    <div className="ml-2 inline-flex items-center">
                      <span className="text-xs font-medium text-amber-500">⭐</span>
                      <span className="text-xs ml-1 text-neutral-500 dark:text-neutral-400">{user?.coins || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <NavLink
                to="/dashboard"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiHome className="text-xl" />
                <span className="ml-3">Dashboard</span>
              </NavLink>
              
              <NavLink
                to="/budgets"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiPieChart className="text-xl" />
                <span className="ml-3">Budgets</span>
              </NavLink>
              
              <NavLink
                to="/transactions"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiCreditCard className="text-xl" />
                <span className="ml-3">Transactions</span>
              </NavLink>
              
              <NavLink
                to="/goals"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiTarget className="text-xl" />
                <span className="ml-3">Goals</span>
              </NavLink>
              
              <NavLink
                to="/quests"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiCompass className="text-xl" />
                <span className="ml-3">Quests</span>
                <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  3
                </span>
              </NavLink>
              
              <NavLink
                to="/achievements"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiAward className="text-xl" />
                <span className="ml-3">Achievements</span>
              </NavLink>
              
              <NavLink
                to="/profile"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-light bg-opacity-30 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                `}
              >
                <FiUser className="text-xl" />
                <span className="ml-3">Profile</span>
              </NavLink>
            </nav>
            
            {/* Connect Bank Button */}
            {!isPlaidLinked && (
              <div className="px-4 py-2">
                <button
                  onClick={handleConnectBank}
                  className="w-full flex items-center justify-center py-2 px-4 rounded-lg 
                    bg-gradient-to-r from-primary to-primary-dark text-white font-medium
                    transition-all hover:shadow-md"
                >
                  <FiPlus />
                  <span className="ml-2">Connect Bank</span>
                </button>
              </div>
            )}
            
            {/* Logout button */}
            <div className="p-4 border-t dark:border-neutral-700 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center py-3 px-4 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all"
              >
                <FiLogOut className="text-xl" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNav
