import { createContext, useContext, useState, ReactNode } from 'react'

interface PlaidContextType {
  isPlaidLinked: boolean
  isPlaidLoading: boolean
  generateLinkToken: () => Promise<string>
  openPlaidLink: () => void
}

const PlaidContext = createContext<PlaidContextType | undefined>(undefined)

export const usePlaidContext = () => {
  const context = useContext(PlaidContext)
  if (context === undefined) {
    throw new Error('usePlaidContext must be used within a PlaidProvider')
  }
  return context
}

interface PlaidProviderProps {
  children: ReactNode
}

export const PlaidProvider = ({ children }: PlaidProviderProps) => {
  const [isPlaidLinked, setIsPlaidLinked] = useState(false)
  const [isPlaidLoading, setIsPlaidLoading] = useState(false)
  
  // In a real app, this would actually call the Plaid API
  const generateLinkToken = async (): Promise<string> => {
    setIsPlaidLoading(true)
    
    try {
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Return a fake token
      return `link-sandbox-${Date.now()}`
    } catch (error) {
      console.error('Error generating link token:', error)
      throw error
    } finally {
      setIsPlaidLoading(false)
    }
  }
  
  const openPlaidLink = () => {
    // This is a mock implementation
    console.log('Opening Plaid Link...')
    
    // Simulate success after 2 seconds
    setTimeout(() => {
      setIsPlaidLinked(true)
      console.log('Plaid Link connected successfully')
    }, 2000)
  }
  
  return (
    <PlaidContext.Provider value={{ 
      isPlaidLinked, 
      isPlaidLoading, 
      generateLinkToken,
      openPlaidLink 
    }}>
      {children}
    </PlaidContext.Provider>
  )
}

export default PlaidProvider
