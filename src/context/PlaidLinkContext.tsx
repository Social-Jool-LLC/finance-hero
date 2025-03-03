import { createContext, useContext, useState, ReactNode } from 'react'
import { usePlaidLink as usePlaidLinkHook, PlaidLinkOptions, PlaidLinkOnSuccessMetadata } from 'react-plaid-link'

interface PlaidLinkContextType {
  linkToken: string | null
  isPlaidLoading: boolean
  generateLinkToken: () => Promise<void>
  onPlaidSuccess: (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => void
  openPlaidLink: () => void
  isPlaidLinked: boolean
}

// Create context
const PlaidLinkContext = createContext<PlaidLinkContextType | undefined>(undefined)

// Provider component
export function PlaidLinkProvider({ children }: { children: ReactNode }) {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [isPlaidLoading, setIsPlaidLoading] = useState(false)
  const [isPlaidLinked, setIsPlaidLinked] = useState(false)

  // In a real app, this would be a call to your backend that communicates with Plaid
  const generateLinkToken = async () => {
    setIsPlaidLoading(true)
    try {
      // Simulate API call to get link token
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // This would normally come from your backend that interfaces with Plaid
      setLinkToken('mock-link-token-123')
    } catch (error) {
      console.error('Error generating link token:', error)
    } finally {
      setIsPlaidLoading(false)
    }
  }

  const onPlaidSuccess = (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => {
    console.log('Success with Plaid Link!', { publicToken, metadata })
    
    // In a real app, you would send this public token to your backend
    // which would exchange it for an access token and store it
    
    setIsPlaidLinked(true)
    // Reset link token after use
    setLinkToken(null)
  }

  const config: PlaidLinkOptions = {
    token: linkToken ?? '',
    onSuccess: (public_token, metadata) => onPlaidSuccess(public_token, metadata),
    // Other required Plaid Link options would go here
  }

  const { open } = usePlaidLinkHook(config)

  const openPlaidLink = () => {
    if (linkToken) {
      open()
    } else {
      generateLinkToken().then(() => {
        // open will be called after the token is generated
        if (linkToken) open()
      })
    }
  }

  return (
    <PlaidLinkContext.Provider 
      value={{ 
        linkToken, 
        isPlaidLoading, 
        generateLinkToken, 
        onPlaidSuccess, 
        openPlaidLink,
        isPlaidLinked
      }}
    >
      {children}
    </PlaidLinkContext.Provider>
  )
}

// Custom hook for using this context
export function usePlaidContext() {
  const context = useContext(PlaidLinkContext)
  if (context === undefined) {
    throw new Error('usePlaidContext must be used within a PlaidLinkProvider')
  }
  return context
}
