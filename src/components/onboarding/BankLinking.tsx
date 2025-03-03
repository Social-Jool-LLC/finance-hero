import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiShield, FiCheckCircle, FiInfo } from 'react-icons/fi';

interface BankLinkingProps {
  onComplete: () => void;
}

const BankLinking = ({ onComplete }: BankLinkingProps) => {
  const [step] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // We're simulating bank linking without actually using Plaid in this demo
  
  const handleConnect = async () => {
    setLoading(true);
    try {
      // This is a simulation since we don't have real Plaid integration in this demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setLoading(false);
      
      // Simulate a pause before moving to the next step
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Error connecting bank:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg my-4"
    >
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
        Connect Your Bank Account
      </h3>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FiShield className="text-primary mr-2" size={18} />
          <p className="text-sm text-neutral-700 dark:text-neutral-300">Your data is encrypted and secure</p>
        </div>
        <div className="flex items-center">
          <FiInfo className="text-primary mr-2" size={18} />
          <p className="text-sm text-neutral-700 dark:text-neutral-300">We use read-only access - we can't move your money</p>
        </div>
      </div>
      
      <div className="my-6 relative">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center mb-4">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                i < step || (i === step && success)
                  ? 'bg-green-500 text-white' 
                  : i === step 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {i < step || (i === step && success) ? (
                <FiCheckCircle size={16} />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">
                {i === 0 ? 'Connect Bank' : i === 1 ? 'Verify Identity' : 'Import Transactions'}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {i === 0 ? 'Select your financial institution' : i === 1 ? 'Securely verify your identity' : 'Import your transaction history'}
              </p>
            </div>
          </div>
        ))}
        
        {/* Connecting line */}
        <div className="absolute left-4 top-8 w-0.5 h-20 bg-neutral-200 dark:bg-neutral-700 -z-10"></div>
      </div>
      
      <button
        onClick={handleConnect}
        disabled={loading || success}
        className={`w-full py-3 rounded-lg flex items-center justify-center ${
          success 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-primary hover:bg-primary-dark'
        } text-white transition-colors`}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Connecting...
          </div>
        ) : success ? (
          <div className="flex items-center">
            <FiCheckCircle className="mr-2" size={18} />
            Connected Successfully
          </div>
        ) : (
          <div className="flex items-center">
            <FiLock className="mr-2" size={18} />
            Connect Bank Account
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default BankLinking;
