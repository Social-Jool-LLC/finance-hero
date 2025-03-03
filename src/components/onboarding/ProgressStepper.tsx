import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { OnboardingStep } from '../../utils/onboardingUtils';

interface ProgressStepperProps {
  steps: OnboardingStep[];
  currentStepIndex: number;
}

const ProgressStepper = ({ steps, currentStepIndex }: ProgressStepperProps) => {
  return (
    <div className="hidden md:flex items-center justify-between mb-8 px-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        
        return (
          <div key={step.id} className="flex flex-col items-center w-full relative">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isCurrent 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                }`}
            >
              {isCompleted ? <FiCheckCircle size={16} /> : <span>{index + 1}</span>}
            </div>
            
            <motion.p 
              className={`mt-2 text-xs font-medium whitespace-nowrap
                ${isCompleted 
                  ? 'text-green-500' 
                  : isCurrent 
                    ? 'text-primary' 
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
            >
              {step.title}
            </motion.p>
            
            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute h-0.5 w-full -right-1/2 top-4 transform -translate-y-1/2 z-0
                  ${index < currentStepIndex 
                    ? 'bg-green-500' 
                    : 'bg-neutral-300 dark:bg-neutral-700'
                  }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;
