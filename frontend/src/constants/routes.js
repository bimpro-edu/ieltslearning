// Route definitions for the entire application
export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    TEACHER_DASHBOARD: '/teacher/dashboard'
  },
  
  // Main skill modules
  READING: {
    HOME: '/reading',
    CORE_SKILLS: '/reading/core-reading-skills',
    CATEGORY: (categoryKey) => `/reading/${categoryKey}`,
    TOPIC: (categoryKey, topicKey) => `/reading/${categoryKey}/${topicKey}`
  },
  
  LISTENING: {
    HOME: '/listening',
    CORE_SKILLS: '/listening/core-skills',
    CATEGORY: (categoryKey) => `/listening/${categoryKey}`,
    TOPIC: (categoryKey, topicKey) => `/listening/${categoryKey}/${topicKey}`
  },
  
  // Task routes
  TASKS: {
    WRITING: '/tasks/writing',
    READING: '/tasks/reading',
    LISTENING: '/tasks/listening',
    SPEAKING: '/tasks/speaking',
    GRAMMAR: '/tasks/grammar',
    VOCABULARY: '/tasks/vocabulary',
    CATEGORY: (taskType, category) => `/tasks/${taskType}/${category}`,
    SUBCATEGORY: (taskType, category, subCategory) => `/tasks/${taskType}/${category}/${subCategory}`
  },

  // Writing specific routes
  WRITING: {
    TASK1: {
      ROOT: '/writing/task1',
      PRACTICE: '/writing/task1/practice',
      TIPS: '/writing/task1/tips'
    },
    TASK2: {
      ROOT: '/writing/task2',
      PRACTICE: '/writing/task2/practice',
      TIPS: '/writing/task2/tips'
    }
  },
  
  // Resources
  RESOURCES: {
    TIPS: '/resources/tips'
  },
  
  // Exercises
  EXERCISES: {
    SINGLE: (exerciseId) => `/exercises/${exerciseId}`
  },
  
  // Home
  HOME: '/'
};

// API endpoints
export const API_ENDPOINTS = {
  LESSONS: {
    READING: {
      CATEGORY: (category) => `/api/lessons/reading/${category}`,
      TOPIC: (category, topic) => `/api/lessons/reading/${category}/${topic}`
    },
    LISTENING: {
      CATEGORY: (category) => `/api/lessons/listening/${category}`,
      TOPIC: (category, topic) => `/api/lessons/listening/${category}/${topic}`
    }
  },
  EXERCISES: {
    GET: (id) => `/api/exercises/${id}`,
    SUBMIT: (id) => `/api/exercises/${id}/submit`
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup'
  }
};