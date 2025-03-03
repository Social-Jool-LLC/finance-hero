import { motion } from 'framer-motion'

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-neutral-900 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
          FH
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-light font-display mb-2"
      >
        Finance Hero
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-neutral-500 dark:text-neutral-400 text-center max-w-md px-4"
      >
        Level up your financial game
      </motion.p>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 230 }}
        transition={{ delay: 0.7, duration: 1.5 }}
        className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-8"
      />
    </div>
  )
}

export default SplashScreen
