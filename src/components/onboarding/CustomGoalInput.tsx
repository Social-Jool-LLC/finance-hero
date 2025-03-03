import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

interface CustomGoalInputProps {
  onSubmit: (goal: string) => void;
}

const CustomGoalInput = ({ onSubmit }: CustomGoalInputProps) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 mb-6"
    >
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your financial goal..."
          className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        <button
          type="submit"
          className="h-full p-3 bg-primary hover:bg-primary-dark text-white rounded-r-lg"
          disabled={!input.trim()}
        >
          <FiSend size={20} />
        </button>
      </form>
    </motion.div>
  );
};

export default CustomGoalInput;
