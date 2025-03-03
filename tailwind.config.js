/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo
          dark: '#4F46E5',
          light: '#A5B4FC',
        },
        secondary: {
          DEFAULT: '#EC4899', // Pink
          dark: '#DB2777',
          light: '#F9A8D4',
        },
        success: {
          DEFAULT: '#10B981', // Emerald
          dark: '#059669',
          light: '#6EE7B7',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          dark: '#D97706',
          light: '#FCD34D',
        },
        error: {
          DEFAULT: '#EF4444', // Red
          dark: '#DC2626',
          light: '#FCA5A5',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
      boxShadow: {
        game: '0 0 20px rgba(99, 102, 241, 0.5)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
