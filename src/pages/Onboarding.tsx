
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { useUser } from '../context/UserContext'

// Onboarding utilities and components
import { onboardingSteps, OnboardingMessage, OnboardingStep, generateInfoResponse, generateCustomGoalResponse, generateBankSkipResponse } from '../utils/onboardingUtils'
import ChatMessage from '../components/onboarding/ChatMessage'
import CustomGoalInput from '../components/onboarding/CustomGoalInput'
import BankLinking from '../components/onboarding/BankLinking'
import ProgressStepper from '../components/onboarding/ProgressStepper'

const Onboarding = () => {
  const navigate = useNavigate()
  const { completeOnboarding, user, updateUserStats } = useUser()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>(onboardingSteps)
  const [inputMode, setInputMode] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  
  const currentStep = steps[currentStepIndex]
  
  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentStep.messages])
  
  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const updatedSteps = [...steps]
      updatedSteps[currentStepIndex].completed = true
      setSteps(updatedSteps)
      setCurrentStepIndex(prevIndex => prevIndex + 1)
      setInputMode(null)
    }
  }
  
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1)
      setInputMode(null)
    }
  }
  
  const handleOptionClick = (action: string, value?: string) => {
    // Create a copy of steps to modify
    const updatedSteps = [...steps]
    const currentMessages = [...updatedSteps[currentStepIndex].messages]
    
    // Add the user's response as a message
    if (value) {
      currentMessages.push({
        id: `user-${Date.now()}`,
        text: value,
        sender: 'user'
      })
    }
    
    // Add a loading message from the assistant
    const loadingMessageId = `loading-${Date.now()}`
    currentMessages.push({
      id: loadingMessageId,
      text: '',
      sender: 'assistant',
      loading: true
    })
    
    // Update the messages in the current step
    updatedSteps[currentStepIndex].messages = currentMessages
    setSteps(updatedSteps)
    
    // Simulate AI response delay
    setTimeout(() => {
      // Remove the loading message
      const updatedMessagesWithoutLoading = updatedSteps[currentStepIndex].messages.filter(
        msg => msg.id !== loadingMessageId
      )
      
      let responseMessage: OnboardingMessage | null = null
      
      // Process the action
      switch (action) {
        case 'SHOW_INFO':
          responseMessage = generateInfoResponse()
          break
          
        case 'CUSTOM_GOAL':
          setInputMode('custom-goal')
          break
          
        case 'SAVE_GOAL':
        case 'SAVE_SPENDING':
        case 'SAVE_MOTIVATION':
          // In a real implementation, we would save this data to the user profile
          responseMessage = {
            id: `response-${Date.now()}`,
            text: "That's great! I've saved your preference.",
            sender: 'assistant',
            options: [{ id: 'continue', text: 'Continue', action: 'NEXT_STEP' }]
          }
          break
          
        case 'SHOW_BANK_COMPONENT':
          updatedSteps[currentStepIndex].component = 'BankLinking'
          break
          
        case 'SKIP_BANK':
          responseMessage = generateBankSkipResponse()
          break
          
        case 'COMPLETE_ONBOARDING':
          completeOnboarding()
          if (user) {
            // Add XP and coins for completing onboarding
            updateUserStats({
              xp: user.xp + 100,
              coins: user.coins + 50,
              achievements: [...(user.achievements || []), 'onboarding_complete']
            })
          }
          navigate('/dashboard')
          break
          
        case 'NEXT_STEP':
          handleNextStep()
          break
          
        default:
          break
      }
      
      // If we generated a response, add it to messages
      if (responseMessage) {
        updatedSteps[currentStepIndex].messages = [...updatedMessagesWithoutLoading, responseMessage]
        setSteps(updatedSteps)
      } else if (action !== 'CUSTOM_GOAL') {
        // Update messages without the loading one if there's no response and no input mode
        updatedSteps[currentStepIndex].messages = updatedMessagesWithoutLoading
        setSteps(updatedSteps)
      }
      
    }, 1000) // Simulate a 1-second response time
  }
  
  const handleCustomGoalSubmit = (goal: string) => {
    setInputMode(null)
    
    // Add the user's input as a message
    const updatedSteps = [...steps]
    const userMessage: OnboardingMessage = {
      id: `user-goal-${Date.now()}`,
      text: goal,
      sender: 'user'
    }
    
    // Add a loading message
    const loadingMessageId = `loading-${Date.now()}`
    const loadingMessage: OnboardingMessage = {
      id: loadingMessageId,
      text: '',
      sender: 'assistant',
      loading: true
    }
    
    updatedSteps[currentStepIndex].messages = [
      ...updatedSteps[currentStepIndex].messages,
      userMessage,
      loadingMessage
    ]
    
    setSteps(updatedSteps)
    
    // Simulate response delay
    setTimeout(() => {
      const responseMessage = generateCustomGoalResponse(goal)
      
      // Remove loading message and add the response
      const withoutLoading = updatedSteps[currentStepIndex].messages.filter(
        msg => msg.id !== loadingMessageId
      )
      
      updatedSteps[currentStepIndex].messages = [...withoutLoading, responseMessage]
      setSteps(updatedSteps)
    }, 1000)
  }
  
  const handleBankLinkComplete = () => {
    // Add a success message
    const updatedSteps = [...steps]
    
    const successMessage: OnboardingMessage = {
      id: `bank-success-${Date.now()}`,
      text: "Great! Your bank account has been successfully connected. Now you can track your finances in real-time.",
      sender: 'assistant',
      options: [{ id: 'bank-success-next', text: 'Continue', action: 'NEXT_STEP' }]
    }
    
    updatedSteps[currentStepIndex].messages.push(successMessage)
    updatedSteps[currentStepIndex].component = undefined
    setSteps(updatedSteps)
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 py-4 px-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center">
            <span className="text-primary mr-1">Finance</span> Hero
            <span className="ml-3 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Onboarding
            </span>
          </h1>
          
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>
      </header>
      
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 flex flex-col">
        {/* Progress Stepper - Desktop */}
        <ProgressStepper steps={steps} currentStepIndex={currentStepIndex} />
        
        {/* Current Step Title */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            {currentStep.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            {currentStep.description}
          </p>
        </div>
        
        {/* Chat Messages */}
        <div className="bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl p-4 md:p-6 flex-1 overflow-y-auto mb-4">
          <div className="max-w-2xl mx-auto">
            {currentStep.messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onOptionClick={handleOptionClick} 
              />
            ))}
            
            {inputMode === 'custom-goal' && (
              <CustomGoalInput onSubmit={handleCustomGoalSubmit} />
            )}
            
            {currentStep.component === 'BankLinking' && (
              <BankLinking onComplete={handleBankLinkComplete} />
            )}
            
            <div ref={chatEndRef} />
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0 || inputMode !== null}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentStepIndex === 0 || inputMode !== null
                ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <FiArrowLeft className="mr-2" /> Previous
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === steps.length - 1 || inputMode !== null || currentStep.component !== undefined}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentStepIndex === steps.length - 1 || inputMode !== null || currentStep.component !== undefined
                ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            Next <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
