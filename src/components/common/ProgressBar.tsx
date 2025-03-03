import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number // 0-100
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showValue?: boolean
  className?: string
}

const ProgressBar = ({
  value,
  color = 'primary',
  size = 'md',
  animated = false,
  showValue = false,
  className = ''
}: ProgressBarProps) => {
  // Clamp value between 0-100
  const clampedValue = Math.min(100, Math.max(0, value))
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  
  // Color classes
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error'
  }
  
  // Background color classes
  const bgColorClasses = {
    primary: 'bg-neutral-200 dark:bg-neutral-700',
    secondary: 'bg-neutral-200 dark:bg-neutral-700',
    success: 'bg-neutral-200 dark:bg-neutral-700',
    warning: 'bg-neutral-200 dark:bg-neutral-700',
    error: 'bg-neutral-200 dark:bg-neutral-700'
  }
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full ${sizeClasses[size]} ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={animated ? { duration: 1, ease: 'easeOut' } : { duration: 0.3 }}
          className={`h-full ${colorClasses[color]} rounded-full ${animated ? 'relative' : ''}`}
        >
          {animated && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  'linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.5) 50%, transparent 0%)'
                ],
                left: ['-100%', '100%']
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear'
              }}
            />
          )}
        </motion.div>
      </div>
      {showValue && (
        <p className="text-xs text-right mt-1 text-neutral-500 dark:text-neutral-400">{Math.round(clampedValue)}%</p>
      )}
    </div>
  )
}

export default ProgressBar
