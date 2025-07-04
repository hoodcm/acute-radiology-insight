
// Navigation configuration - centralized for easy renaming
export const navigationConfig = {
  sections: {
    learn: {
      name: 'Learn',
      href: '/learn',
      description: 'Long-form thoughts on radiology, technology, and medical practice.',
      category: 'Essay' // Maps to existing post category
    },
    cases: {
      name: 'Cases', 
      href: '/cases',
      description: 'Analysis of notable and educational cases in emergency radiology.',
      category: 'Case Study'
    },
    atlas: {
      name: 'Atlas',
      href: '/atlas', 
      description: 'Visual reference and imaging atlas.',
      category: 'Case Study'
    },
    signal: {
      name: 'Signal',
      href: '/signal',
      description: 'Reflections and learnings from past cases and experiences.',
      category: 'Hindsight'
    },
    levelUp: {
      name: 'Level Up',
      href: '/level-up',
      description: 'Tools and resources for advancing your radiology practice.',
      category: 'Tool'
    }
  }
} as const;

// Helper function to get navigation array
export const getNavigationItems = () => {
  return Object.values(navigationConfig.sections);
};

// Helper function to get section by category
export const getSectionByCategory = (category: string) => {
  return Object.values(navigationConfig.sections).find(section => section.category === category);
};
