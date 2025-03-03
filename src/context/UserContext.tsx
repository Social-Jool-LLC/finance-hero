import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  level: number
  xp: number
  coins: number
  streak: number
  onboardingComplete: boolean
  achievements: string[]
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  updateUserStats: (stats: Partial<User>) => void
  logout: () => void
}

// Default values
const MOCK_USER: User = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?img=37',
  level: 3,
  xp: 350,
  coins: 270,
  streak: 5,
  onboardingComplete: true,
  achievements: ['first_login', 'first_budget', 'week_streak'],
  preferences: {
    theme: 'light',
    notifications: true
  }
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user from API or localStorage
    setTimeout(() => {
      setUser(MOCK_USER)
      setIsLoading(false)
    }, 1000)
  }, [])

  const updateUserStats = (stats: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...stats })
      // In a real app, you would save to backend/localStorage here
    }
  }

  const logout = () => {
    setUser(null)
    // In a real app, clear tokens, localStorage, etc.
  }

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, updateUserStats, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook for using this context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
