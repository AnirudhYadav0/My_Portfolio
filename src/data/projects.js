// ============================================================
// PROJECTS DATA — Edit this file to update project details.
// ============================================================

export const projects = [
  {
    id: 'tripnexus',
    slug: 'tripnexus',
    title: 'TripNexus',
    category: 'AI-Powered Travel Planning',
    tagline: 'Your AI-powered travel companion',
    description:
      'TripNexus is a travel planning application designed to generate personalized travel itineraries based on destination, trip duration, number of travellers, budget, travel style, and interests.',
    features: [
      'Personalized trip planning based on user preferences',
      'AI-assisted itinerary generation',
      'Budget breakdown and estimation',
      'Configurable travel preferences (style, interests)',
      'Dynamic itinerary generation through backend API',
      'React-based interactive interface',
    ],
    stack: ['React.js', 'Vite', 'Node.js', 'REST APIs', 'CSS3'],
    architecture: null, // TripNexus architecture if needed
    // Set real URLs when available; null = hidden
    liveDemo: null, // e.g. 'https://tripnexus.vercel.app'
    github: 'https://github.com/AnirudhYadav0/TripNexus',
    color: '#00F5FF',
    accentColor: '#8B5CFF',
    planetType: 'travel',
    position: [4.5, 0.5, -2],
    size: 0.85,
  },
  {
    id: 'enterskill',
    slug: 'enterskill',
    title: 'EnterSkill Hub',
    category: 'Full-Stack Web Application',
    tagline: 'Manage skills, ideas, and tasks in one dashboard',
    description:
      'EnterSkill Hub is a full-stack web application featuring authentication, a user dashboard, skills management, business ideas, and task management.',
    features: [
      'User registration and login with JWT authentication',
      'Personalized dashboard interface',
      'Skills management section',
      'Business ideas section',
      'Task management with CRUD operations',
      'Full frontend-backend integration',
    ],
    stack: ['React.js', 'Vite', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT', 'Axios'],
    architecture: [
      { label: 'React + Vite Frontend', layer: 0 },
      { label: 'Axios / HTTP Requests', layer: 1 },
      { label: 'Node.js + Express API', layer: 2 },
      { label: 'MongoDB Atlas', layer: 3 },
    ],
    liveDemo: 'https://enter-skill-hub-one.vercel.app',
    github: 'https://github.com/AnirudhYadav0/EnterSkill-Hub',
    color: '#71FF9C',
    accentColor: '#00F5FF',
    planetType: 'saas',
    position: [-4.5, -0.5, -1.5],
    size: 0.8,
  },
];
