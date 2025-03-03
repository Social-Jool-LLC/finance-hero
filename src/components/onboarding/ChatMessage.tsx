import { motion } from 'framer-motion';
import { FiUser, FiHelpCircle } from 'react-icons/fi';
import { OnboardingMessage } from '../../utils/onboardingUtils';

interface ChatMessageProps {
  message: OnboardingMessage;
  onOptionClick: (action: string, value?: string) => void;
}

const ChatMessage = ({ message, onOptionClick }: ChatMessageProps) => {
  const isAssistant = message.sender === 'assistant';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className="flex max-w-[80%]">
        {isAssistant && (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mr-2">
            <FiHelpCircle size={18} />
          </div>
        )}
        
        <div className={`rounded-2xl py-3 px-4 ${
          isAssistant 
            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white' 
            : 'bg-primary text-white'
        }`}>
          <p className="text-sm md:text-base">{message.text}</p>
          
          {message.loading && (
            <div className="flex space-x-1 mt-2 items-center">
              <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
          
          {message.options && message.options.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => onOptionClick(option.action || 'NONE', option.text)}
                  className="block w-full text-left px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {!isAssistant && (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-white ml-2">
            <FiUser size={18} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
