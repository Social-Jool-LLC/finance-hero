import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../navigation/Sidebar'
import Header from '../navigation/Header'
import MobileNav from '../navigation/MobileNav'
import ProgressBar from '../common/ProgressBar'
import { useUser } from '../../context/UserContext'

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Calculate XP progress
  const xpProgress = user ? Math.min(100, (user.xp / (user.level * 500)) * 100) : 0
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  }
  
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Sidebar - hidden on mobile */}
      <div className={`hidden md:block transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isScrolled={isScrolled}
          toggleSidebar={toggleSidebar} 
          toggleMobileMenu={toggleMobileMenu}
          isSidebarOpen={isSidebarOpen}
        />
        
        {/* Mobile menu - sliding from left */}
        <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        
        {/* XP Progress bar - only shows at top level */}
        {user && (
          <div className={`px-4 py-2 transition-all duration-300 ${isScrolled ? 'shadow-md bg-white dark:bg-neutral-800' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-primary dark:text-primary-light">Level {user.level}</span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{user.xp}/{user.level * 500} XP</span>
            </div>
            <ProgressBar value={xpProgress} color="primary" size="sm" animated />
          </div>
        )}
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
