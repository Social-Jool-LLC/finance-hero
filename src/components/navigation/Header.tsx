import { useState, useEffect, useRef } from 'react'
import { FiMenu, FiBell, FiMoon, FiSun, FiSearch, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '../../context/UserContext'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  isSidebarOpen: boolean
  isScrolled: boolean
}

const Header = ({ toggleSidebar, toggleMobileMenu, isSidebarOpen, isScrolled }: HeaderProps) => {
  const { user } = useUser()
  const { theme, toggleTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Quest Available!',
      message: 'Complete your first weekly budget to earn 50 coins',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      title: 'Achievement Unlocked!',
      message: 'You earned the "Budgeting Beginner" badge',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Spending Alert',
      message: 'You\'re close to your dining budget limit this month',
      time: 'Yesterday',
      read: true
    }
  ])
  
  const notificationsRef = useRef<HTMLDivElement>(null)
  
  // Close notifications panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  return (
    <header 
      className={`py-2 px-4 md:px-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-neutral-800 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Menu"
        >
          <FiMenu size={22} />
        </button>
        
        {/* Desktop sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden md:block p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          <FiMenu size={22} />
        </button>
        
        {/* Search bar */}
        <div className={`relative ml-2 ${isSearchOpen ? 'w-full md:w-72' : 'w-auto'}`}>
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search transactions, budgets, etc..."
                  className="w-full py-2 pl-9 pr-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <FiSearch className="absolute left-3 text-neutral-400" size={16} />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  <FiX size={16} />
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors relative"
            aria-label="Notifications"
          >
            <FiBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden z-50"
              >
                <div className="p-3 border-b dark:border-neutral-700 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:text-primary-dark"
                  >
                    Mark all as read
                  </button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-neutral-500">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <span className="text-xs text-neutral-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="p-2 text-center border-t dark:border-neutral-700">
                  <button className="text-sm text-primary hover:text-primary-dark">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* User info - mobile only */}
        <div className="flex items-center md:hidden">
          <img
            src={user?.avatar || 'https://i.pravatar.cc/150?img=37'}
            alt="User avatar"
            className="w-8 h-8 rounded-full border-2 border-primary"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
