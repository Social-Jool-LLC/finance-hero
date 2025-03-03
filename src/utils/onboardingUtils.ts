export interface OnboardingMessage {
  id: string;
  text: string;
  sender: 'assistant' | 'user';
  options?: {
    id: string;
    text: string;
    action?: string;
  }[];
  loading?: boolean;
  component?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  messages: OnboardingMessage[];
  completed: boolean;
  component?: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Get to know Finance Hero',
    completed: false,
    messages: [
      {
        id: 'welcome-1',
        text: "Hi there! I'm your personal Finance Hero assistant. I'm here to help you set up your account and get you started on your financial journey. Ready to begin?",
        sender: 'assistant',
        options: [
          { id: 'welcome-yes', text: "Yes, let's get started!", action: 'NEXT_STEP' },
          { id: 'welcome-tell-more', text: "Tell me more about Finance Hero first", action: 'SHOW_INFO' }
        ]
      }
    ]
  },
  {
    id: 'personal-info',
    title: 'Personal Info',
    description: 'Basic information',
    completed: false,
    messages: [
      {
        id: 'personal-1',
        text: "Great! Let's start with some basic information. What's your financial goal for using Finance Hero?",
        sender: 'assistant',
        options: [
          { id: 'goal-save', text: "Save money", action: 'SAVE_GOAL' },
          { id: 'goal-budget', text: "Budget better", action: 'SAVE_GOAL' },
          { id: 'goal-debt', text: "Pay off debt", action: 'SAVE_GOAL' },
          { id: 'goal-invest', text: "Learn to invest", action: 'SAVE_GOAL' },
          { id: 'goal-other', text: "Something else", action: 'CUSTOM_GOAL' }
        ]
      }
    ]
  },
  {
    id: 'financial-habits',
    title: 'Financial Habits',
    description: 'Your spending patterns',
    completed: false,
    messages: [
      {
        id: 'habits-1',
        text: "Thanks for sharing your goal! Now, I'd like to understand your current financial habits. How would you describe your spending?",
        sender: 'assistant',
        options: [
          { id: 'spending-careful', text: "I'm very careful with money", action: 'SAVE_SPENDING' },
          { id: 'spending-balanced', text: "I balance saving and spending", action: 'SAVE_SPENDING' },
          { id: 'spending-impulse', text: "I make impulse purchases often", action: 'SAVE_SPENDING' },
          { id: 'spending-unsure', text: "I'm not sure where my money goes", action: 'SAVE_SPENDING' }
        ]
      }
    ]
  },
  {
    id: 'connect-bank',
    title: 'Connect Bank',
    description: 'Link your accounts',
    completed: false,
    component: 'BankLinking',
    messages: [
      {
        id: 'bank-1',
        text: "To help you track your finances, we'll need to connect to your bank accounts. This is secure and we use read-only access - we can't move your money.",
        sender: 'assistant',
        options: [
          { id: 'bank-yes', text: "Let's connect my accounts", action: 'SHOW_BANK_COMPONENT' },
          { id: 'bank-later', text: "I'll do this later", action: 'SKIP_BANK' }
        ]
      }
    ]
  },
  {
    id: 'gamification',
    title: 'Gamification',
    description: 'Set up your game',
    completed: false,
    messages: [
      {
        id: 'game-1',
        text: "Finance Hero makes money management fun! You'll earn coins, level up, and unlock achievements as you improve your finances. What motivates you most?",
        sender: 'assistant',
        options: [
          { id: 'motivation-achievements', text: "Completing achievements", action: 'SAVE_MOTIVATION' },
          { id: 'motivation-streaks', text: "Maintaining streaks", action: 'SAVE_MOTIVATION' },
          { id: 'motivation-rewards', text: "Earning rewards", action: 'SAVE_MOTIVATION' },
          { id: 'motivation-competition', text: "Competing with others", action: 'SAVE_MOTIVATION' }
        ]
      }
    ]
  },
  {
    id: 'all-set',
    title: 'All Set',
    description: 'Ready to go',
    completed: false,
    messages: [
      {
        id: 'done-1',
        text: "Awesome! Your account is all set up. You're ready to start your financial journey with Finance Hero. I've personalized the experience based on your preferences.",
        sender: 'assistant',
        options: [
          { id: 'done-dashboard', text: "Go to Dashboard", action: 'COMPLETE_ONBOARDING' }
        ]
      }
    ]
  }
];

export const generateInfoResponse = (): OnboardingMessage => {
  return {
    id: `info-${Date.now()}`,
    text: "Finance Hero is a gamified personal finance app that helps you build better money habits. You'll track expenses, create budgets, and set financial goals - all while earning coins, leveling up, and unlocking achievements. It's like turning your financial journey into an RPG!",
    sender: 'assistant',
    options: [
      { id: 'info-continue', text: "Got it, let's continue", action: 'NEXT_STEP' }
    ]
  };
};

export const generateCustomGoalResponse = (goal: string): OnboardingMessage => {
  return {
    id: `custom-goal-${Date.now()}`,
    text: `Thanks for sharing! "${goal}" is a great financial goal. I'll help you work toward it.`,
    sender: 'assistant',
    options: [
      { id: 'custom-goal-next', text: "Continue", action: 'NEXT_STEP' }
    ]
  };
};

export const generateBankSkipResponse = (): OnboardingMessage => {
  return {
    id: `bank-skip-${Date.now()}`,
    text: "No problem! You can always connect your bank accounts later from the 'Connect Bank' section in the sidebar.",
    sender: 'assistant',
    options: [
      { id: 'bank-skip-next', text: "Continue", action: 'NEXT_STEP' }
    ]
  };
};
