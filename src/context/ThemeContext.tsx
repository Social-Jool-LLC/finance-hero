import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If no saved preference, use system preference
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    // Apply theme class to body
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    
    // Save theme preference
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for using this context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
