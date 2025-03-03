import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Layouts
import MainLayout from './components/layouts/MainLayout'

// Pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Budgets from './pages/Budgets'
import Transactions from './pages/Transactions'
import Goals from './pages/Goals'
import Quests from './pages/Quests'
import Achievements from './pages/Achievements'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Onboarding from './pages/Onboarding'
import ConnectBank from './pages/ConnectBank'

// Context
import { useUser } from './context/UserContext'

// Components
import SplashScreen from './components/common/SplashScreen'

function App() {
  const { user, isLoading } = useUser()
  const [showSplash, setShowSplash] = useState(true)
  
  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (showSplash || isLoading) {
    return <SplashScreen />
  }
  
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        
        {/* Protected routes */}
        <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="goals" element={<Goals />} />
          <Route path="quests" element={<Quests />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connect-bank" element={<ConnectBank />} />
        </Route>
        
        {/* Onboarding route */}
        <Route path="/onboarding" element={user && !user.onboardingComplete ? <Onboarding /> : <Navigate to="/dashboard" />} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
