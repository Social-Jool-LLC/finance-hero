import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FiHome, 
  FiPieChart, 
  FiCreditCard, 
  FiTarget, 
  FiCompass, 
  FiAward, 
  FiUser, 
  FiChevronLeft, 
  FiChevronRight, 
  FiLogOut, 
  FiPlus 
} from 'react-icons/fi'
import { useUser } from '../../context/UserContext'
import { usePlaidContext } from '../../context/PlaidLinkContext'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
  isOpen: boolean
  badge?: number
  onClick?: () => void
}

const NavItem = ({ to, icon, label, isOpen, badge, onClick }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center py-3 px-4 rounded-lg transition-all duration-200
        ${isActive ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}
      `}
    >
      <div className="text-xl">{icon}</div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          className="ml-3 whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
      {badge && isOpen && (
        <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { user, logout } = useUser()
  const { openPlaidLink, isPlaidLinked } = usePlaidContext()
  const [showTooltip, setShowTooltip] = useState('')

  const handleMouseEnter = (id: string) => {
    if (!isOpen) {
      setShowTooltip(id)
    }
  }

  const handleMouseLeave = () => {
    setShowTooltip('')
  }
  
  return (
    <aside className="h-full flex flex-col bg-white dark:bg-neutral-800 shadow-md transition-all duration-300 relative z-10">
      {/* Logo and Toggle */}
      <div className={`flex ${isOpen ? 'justify-between' : 'justify-center'} items-center p-4 border-b dark:border-neutral-700`}>
        {isOpen ? (
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold"
            >
              FH
            </motion.div>
            <span className="ml-2 font-display font-bold text-lg text-primary dark:text-primary-light">Finance Hero</span>
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold"
          >
            FH
          </motion.div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>
      </div>
      
      {/* User info */}
      <div className={`p-4 border-b dark:border-neutral-700 ${isOpen ? '' : 'flex justify-center'}`}>
        {isOpen ? (
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
        ) : (
          <div className="relative" onMouseEnter={() => handleMouseEnter('profile')} onMouseLeave={handleMouseLeave}>
            <img 
              src={user?.avatar || 'https://i.pravatar.cc/150?img=37'} 
              alt="User avatar" 
              className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
              onClick={() => window.location.href = '/profile'}
            />
            {showTooltip === 'profile' && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap">
                {user?.name || 'Guest'}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <NavItem to="/dashboard" icon={<FiHome />} label="Dashboard" isOpen={isOpen} 
          onMouseEnter={() => handleMouseEnter('dashboard')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'dashboard' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Dashboard
          </div>
        )}
        
        <NavItem to="/budgets" icon={<FiPieChart />} label="Budgets" isOpen={isOpen} 
          onMouseEnter={() => handleMouseEnter('budgets')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'budgets' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Budgets
          </div>
        )}
        
        <NavItem to="/transactions" icon={<FiCreditCard />} label="Transactions" isOpen={isOpen} 
          onMouseEnter={() => handleMouseEnter('transactions')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'transactions' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Transactions
          </div>
        )}
        
        <NavItem to="/goals" icon={<FiTarget />} label="Goals" isOpen={isOpen} 
          onMouseEnter={() => handleMouseEnter('goals')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'goals' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Goals
          </div>
        )}
        
        <NavItem to="/quests" icon={<FiCompass />} label="Quests" isOpen={isOpen} badge={3} 
          onMouseEnter={() => handleMouseEnter('quests')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'quests' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Quests (3)
          </div>
        )}
        
        <NavItem to="/achievements" icon={<FiAward />} label="Achievements" isOpen={isOpen} 
          onMouseEnter={() => handleMouseEnter('achievements')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'achievements' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Achievements
          </div>
        )}
        
        <NavItem to="/profile" icon={<FiUser />} label="Profile" isOpen={isOpen} 
          onMouseEnter={() => handleMouseEnter('profile-page')} 
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip === 'profile-page' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Profile
          </div>
        )}
      </nav>
      
      {/* Connect Bank Button */}
      {!isPlaidLinked && (
        <div className="px-3 mt-2">
          <button
            onClick={openPlaidLink}
            className={`w-full flex items-center justify-center py-2 px-4 rounded-lg 
              bg-gradient-to-r from-primary to-primary-dark text-white font-medium transition-all hover:shadow-md
              ${isOpen ? '' : 'p-2'}`}
            onMouseEnter={() => handleMouseEnter('connect-bank')} 
            onMouseLeave={handleMouseLeave}
          >
            <FiPlus className="text-white" />
            {isOpen && <span className="ml-2">Connect Bank</span>}
          </button>
          {showTooltip === 'connect-bank' && !isOpen && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
              Connect Bank
            </div>
          )}
        </div>
      )}
      
      {/* Logout button */}
      <div className="p-3 border-t dark:border-neutral-700 mt-auto">
        <button
          onClick={logout}
          className={`w-full flex items-center py-2 px-3 rounded-lg text-neutral-600 
            dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all
            ${isOpen ? '' : 'justify-center'}`}
          onMouseEnter={() => handleMouseEnter('logout')} 
          onMouseLeave={handleMouseLeave}
        >
          <FiLogOut />
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
        {showTooltip === 'logout' && !isOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded">
            Logout
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
