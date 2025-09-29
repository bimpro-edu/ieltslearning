// List of real lesson topics for each Listening category (for sidebar)
const listeningCategoryTopics = {
  'core-listening-skills': [
    { key: 'workplace', title: 'Workplace and Employment' },
    { key: 'shopping', title: 'Shopping and Consumer Rights' },
    { key: 'climate-change', title: 'Climate Change and You' },
    { key: 'music-impact', title: 'The Impact of Music on Society' },
    { key: 'space-exploration', title: 'Space Exploration: Past and Future' },
    { key: 'renewable-energy', title: 'Renewable Energy Sources' },
    { key: 'digital-privacy', title: 'Digital Privacy in Modern Life' },
    { key: 'sports-benefits', title: 'The Benefits of Sports' },
    { key: 'travel-culture', title: 'Travel and Cultural Exchange' },
    { key: 'history-internet', title: 'The History of the Internet' },
    { key: 'university-life', title: 'University Life and Study Skills' },
    { key: 'accommodation', title: 'Accommodation and Housing' },
    { key: 'environmental-issues', title: 'Environmental Issues' },
    { key: 'family', title: 'Family and Relationships' },
    { key: 'public-services', title: 'Public Services and Facilities' },
    { key: 'healthcare', title: 'Healthcare and Medical Services' },
    { key: 'transport', title: 'Transport and Travel' },
    { key: 'leisure', title: 'Leisure and Free Time' }
  ]
};
// Export function to get topics for a listening category (for sidebar)
export function getListeningTopicsForCategory(categoryKey) {
  return listeningCategoryTopics[categoryKey] || [];
}

// Export function for loading writing templates (for TaskPage and others)
export function loadTemplates({ taskType, category, band }) {
  return templateMap[taskType]?.[category]?.[band] || [];
}
import task2_positiveNegativeDevelopment_band5 from '../templates/task2/positiveNegativeDevelopment/band5.js';
import task2_positiveNegativeDevelopment_band6 from '../templates/task2/positiveNegativeDevelopment/band6.js';
import task2_positiveNegativeDevelopment_band7 from '../templates/task2/positiveNegativeDevelopment/band7.js';
import task2_positiveNegativeDevelopment_band8 from '../templates/task2/positiveNegativeDevelopment/band8.js';
// Utility to dynamically import template data for modular, scalable management
// Import all templates statically
import task2_opinion_band5 from '../templates/task2/opinion/band5.js';
import task2_opinion_band6 from '../templates/task2/opinion/band6.js';
import task2_opinion_band7 from '../templates/task2/opinion/band7.js';
import task2_opinion_band8 from '../templates/task2/opinion/band8.js';

import task2_discussion_band5 from '../templates/task2/discussion/band5.js';
import task2_discussion_band6 from '../templates/task2/discussion/band6.js';
import task2_discussion_band7 from '../templates/task2/discussion/band7.js';
import task2_discussion_band8 from '../templates/task2/discussion/band8.js';

// Mapping: { [taskType]: { [category]: { [band]: templateData } } }
const templateMap = {
  task2: {
    opinion: {
      5: task2_opinion_band5,
      6: task2_opinion_band6,
      7: task2_opinion_band7,
      8: task2_opinion_band8,
    },
    discussion: {
      5: task2_discussion_band5,
      6: task2_discussion_band6,
      7: task2_discussion_band7,
      8: task2_discussion_band8,
    },
    positiveNegativeDevelopment: {
      5: task2_positiveNegativeDevelopment_band5,
      6: task2_positiveNegativeDevelopment_band6,
      7: task2_positiveNegativeDevelopment_band7,
      8: task2_positiveNegativeDevelopment_band8,
    }
  }
};

// Listening templates for all topics (single valid object)
const listeningTemplates = {
  'workplace': {
    title: 'Workplace and Employment',
    tips: [
      'Listen for job titles, duties, and requirements. E.g., "Applicants must have experience with Excel."',
      'Pay attention to working hours, pay, and benefits. E.g., "The salary is $2,000 per month."',
      'Note any problems or workplace issues. E.g., "There is a staff meeting every Friday."',
      'Underline or write down company names, positions, or deadlines.'
    ],
    traps: [
      'Don\'t confuse job roles or departments. E.g., "HR" vs. "IT".',
      'Be careful with numbers and schedules. E.g., "The shift starts at 8am, not 9am."',
      'Don\'t assume all benefits apply to all employees—listen for details.'
    ],
    predictions: [
      'Expect questions about duties, pay, and workplace issues. E.g., "What is one responsibility of the new employee?"',
      'Some answers may be about company policies or rules.',
      'You may need to match people to their job preferences.'
    ]
  },
  'shopping': {
    title: 'Shopping and Consumer Rights',
    tips: [
      'Listen for types of shops, products, and services. E.g., "The supermarket is open until 9pm."',
      'Pay attention to prices, discounts, and complaints. E.g., "The shoes are on sale for $30."',
      'Note any problems or solutions discussed. E.g., "The product was faulty, so she returned it."',
      'Underline or write down names, prices, or product details.'
    ],
    traps: [
      'Don\'t confuse types of shops or products. E.g., "pharmacy" vs. "bakery".',
      'Be careful with prices and offers. E.g., "Buy one get one free" vs. "50% off".',
      'Don\'t assume all complaints are resolved—listen for outcomes.'
    ],
    predictions: [
      'Expect questions about products, prices, and complaints. E.g., "What did the customer buy?"',
      'Some answers may be about solutions or advice.',
      'You may need to match people to their purchases.'
    ]
  },
  'climate-change': {
    title: 'Climate Change and You',
    tips: [
      'Listen for causes and effects of climate change. E.g., "Burning fossil fuels causes global warming."',
      'Note any personal actions or solutions mentioned. E.g., "You can help by recycling and using less energy."',
      'Underline or write down scientific terms and their meanings.'
    ],
    traps: [
      'Don\'t confuse causes with effects. E.g., "Rising temperatures are an effect, not a cause."',
      'Be careful with scientific terms and data. E.g., "Greenhouse gases" vs. "carbon footprint".',
      'Don\'t assume all solutions are equally effective—listen for the speaker\'s evaluation.'
    ],
    predictions: [
      'Expect questions about environmental impact and solutions. E.g., "What is one way to reduce emissions?"',
      'Answers may require inference from examples. E.g., "Using public transport helps the environment."',
      'Some answers may be about future predictions or trends.'
    ]
  },
  'music-impact': {
    title: 'The Impact of Music on Society',
    tips: [
      'Listen for examples of music\'s influence on culture or emotions. E.g., "Music can bring people together at festivals."',
      'Pay attention to genres and their social roles. E.g., "Classical music is often used in films to create emotion."',
      'Note any historical changes or trends. E.g., "Rock music became popular in the 1960s."',
      'Underline or write down names of artists, genres, or events.'
    ],
    traps: [
      'Don\'t mix up genres or historical periods. E.g., "Jazz originated before hip-hop."',
      'Watch for opinions vs. facts. E.g., "Some people believe pop music is too commercial."',
      'Don\'t assume all examples are positive—listen for criticism as well.'
    ],
    predictions: [
      'Expect questions about effects, examples, and opinions. E.g., "How does music affect mood?"',
      'Some answers may be subjective or require interpretation. E.g., "Why do people listen to sad songs?"',
      'You may need to identify the main idea or theme of a passage.'
    ]
  },
  'space-exploration': {
    title: 'Space Exploration: Past and Future',
    tips: [
      'Listen for key missions and dates. E.g., "Apollo 11 landed on the moon in 1969."',
      'Pay attention to reasons for exploration. E.g., "Scientists want to find life on Mars."',
      'Note any challenges or risks mentioned. E.g., "Radiation is a major concern for astronauts."',
      'Underline or write down names of spacecraft or astronauts.'
    ],
    traps: [
      'Don\'t confuse different missions or planets. E.g., "Voyager explored the outer planets, not the moon."',
      'Be careful with numbers and statistics. E.g., "The mission lasted 8 days, not 18."',
      'Don\'t assume all missions were successful—listen for failures or problems.'
    ],
    predictions: [
      'Expect questions about achievements, goals, and challenges. E.g., "What was the first spacecraft to leave the solar system?"',
      'Some answers may be about future plans or technologies. E.g., "Mars colonization is a future goal."',
      'You may need to match missions to their outcomes.'
    ]
  },
  'renewable-energy': {
    title: 'Renewable Energy Sources',
    tips: [
      'Listen for types of renewable energy. E.g., "Solar, wind, and hydro are common sources."',
      'Pay attention to advantages and disadvantages. E.g., "Wind energy is clean but depends on weather."',
      'Note any statistics or comparisons. E.g., "Solar power use increased by 20% last year."',
      'Underline or write down key terms and their meanings.'
    ],
    traps: [
      'Don\'t confuse renewable and non-renewable sources. E.g., "Coal is not renewable."',
      'Be careful with numbers and percentages. E.g., "Hydro provides 15% of electricity, not 50%."',
      'Don\'t assume all sources are equally effective—listen for the speaker\'s evaluation.'
    ],
    predictions: [
      'Expect questions about types, benefits, and challenges. E.g., "What is one advantage of solar energy?"',
      'Some answers may be about environmental impact or cost.',
      'You may need to compare two or more energy sources.'
    ]
  },
  'digital-privacy': {
    title: 'Digital Privacy in Modern Life',
    tips: [
      'Listen for examples of privacy risks. E.g., "Sharing passwords can lead to identity theft."',
      'Pay attention to advice for staying safe online. E.g., "Use strong passwords and two-factor authentication."',
      'Note any laws or regulations mentioned. E.g., "GDPR protects user data in Europe."',
      'Underline or write down key terms like "encryption" or "phishing".'
    ],
    traps: [
      'Don\'t ignore warnings or exceptions. E.g., "Not all websites are secure."',
      'Be careful with similar-sounding terms. E.g., "malware" vs. "malicious".',
      'Don\'t assume all advice applies everywhere—listen for context.'
    ],
    predictions: [
      'Expect questions about risks, solutions, and laws. E.g., "What is one way to protect your privacy online?"',
      'Some answers may be about consequences of not protecting privacy.',
      'You may need to identify the main risk in a scenario.'
    ]
  },
  'sports-benefits': {
    title: 'The Benefits of Sports',
    tips: [
      'Listen for physical, mental, and social benefits. E.g., "Sports improve teamwork and reduce stress."',
      'Pay attention to examples of different sports. E.g., "Swimming builds endurance; basketball improves coordination."',
      'Note any statistics or recommendations. E.g., "Children should exercise for at least 1 hour a day."',
      'Underline or write down names of sports and their benefits.'
    ],
    traps: [
      'Don\'t confuse benefits with risks. E.g., "Injuries are a risk, not a benefit."',
      'Be careful with numbers and recommendations. E.g., "30 minutes a day" vs. "1 hour a day."',
      'Don\'t assume all sports have the same benefits—listen for differences.'
    ],
    predictions: [
      'Expect questions about types of benefits and examples. E.g., "How does sport help mental health?"',
      'Some answers may be about recommendations or guidelines.',
      'You may need to match sports to their specific benefits.'
    ]
  },
  'travel-culture': {
    title: 'Travel and Cultural Exchange',
    tips: [
      'Listen for reasons people travel and what they learn. E.g., "Traveling helps you understand new cultures."',
      'Pay attention to cultural differences and experiences. E.g., "Trying local food is a big part of travel."',
      'Note any challenges or surprises mentioned. E.g., "She was surprised by the local customs."',
      'Underline or write down country names, foods, or traditions.'
    ],
    traps: [
      'Don\'t confuse countries or customs. E.g., "Japanese bowing" vs. "French cheek kissing".',
      'Be careful with reasons for travel. E.g., "business" vs. "pleasure".',
      'Don\'t assume all experiences are positive—listen for problems.'
    ],
    predictions: [
      'Expect questions about reasons, experiences, and challenges. E.g., "What did the traveler learn?"',
      'Some answers may be about cultural differences.',
      'You may need to match people to their travel experiences.'
    ]
  },
  'history-internet': {
    title: 'The History of the Internet',
    tips: [
      'Listen for key dates and technological milestones. E.g., "The World Wide Web was invented in 1989."',
      'Pay attention to names of inventors or organizations. E.g., "Tim Berners-Lee created the first website."',
      'Note the sequence of events and how the internet evolved over time.'
    ],
    traps: [
      'Don\'t confuse the invention of the internet with the invention of the World Wide Web.',
      'Be careful with dates and technical terms. E.g., "ARPANET" vs. "Internet".',
      'Don\'t assume all countries adopted the internet at the same time.'
    ],
    predictions: [
      'Expect questions about important years, people, and inventions. E.g., "Who invented the World Wide Web?"',
      'Some answers may require understanding the order of events.',
      'You may need to match inventions to their inventors or dates.'
    ]
  },
  'university-life': {
    title: 'University Life and Study Skills',
    tips: [
      'Listen for references to lectures, seminars, and assignments. E.g., "The essay is due next Monday."',
      'Pay attention to advice about time management and study techniques. E.g., "Make a revision timetable."',
      'Note any campus locations or resources mentioned. E.g., "The library is open until 10pm."',
      'Underline or write down names of courses, professors, or deadlines.'
    ],
    traps: [
      'Don\'t confuse different types of academic tasks. E.g., "presentation" vs. "report".',
      'Be careful with dates and times. E.g., "The meeting is on Thursday, not Tuesday."',
      'Don\'t assume all advice is for everyone—listen for exceptions.'
    ],
    predictions: [
      'Expect questions about study skills, campus life, and deadlines. E.g., "Where can students get help with writing?"',
      'Some answers may be about rules or procedures.',
      'You may need to match resources to their purposes.'
    ]
  },
  'accommodation': {
    title: 'Accommodation and Housing',
    tips: [
      'Listen for types of accommodation and their features. E.g., "The apartment has two bedrooms and a balcony."',
      'Pay attention to costs, contracts, and facilities. E.g., "The rent includes water and electricity."',
      'Note any problems or repairs mentioned. E.g., "The heating is not working properly."',
      'Underline or write down addresses, prices, or landlord details.'
    ],
    traps: [
      'Don\'t confuse different types of housing. E.g., "shared flat" vs. "studio apartment".',
      'Be careful with numbers and contract terms. E.g., "six-month lease" vs. "one-year lease".',
      'Don\'t assume all facilities are included—listen for exceptions.'
    ],
    predictions: [
      'Expect questions about features, costs, and problems. E.g., "What is included in the rent?"',
      'Some answers may be about solutions to housing issues.',
      'You may need to match people to their accommodation preferences.'
    ]
  },
  'environmental-issues': {
    title: 'Environmental Issues',
    tips: [
      'Listen for causes and effects of environmental problems. E.g., "Air pollution is caused by car emissions."',
      'Pay attention to solutions and actions. E.g., "Recycling helps reduce waste."',
      'Note any statistics or scientific terms mentioned. E.g., "CO2 levels have increased."',
      'Underline or write down names of organizations or environmental laws.'
    ],
    traps: [
      'Don\'t confuse causes with effects. E.g., "Deforestation is a cause, not an effect."',
      'Be careful with numbers and percentages. E.g., "30% reduction" vs. "70% increase".',
      'Don\'t assume all solutions are equally effective—listen for the speaker\'s evaluation.'
    ],
    predictions: [
      'Expect questions about causes, effects, and solutions. E.g., "What is one way to reduce pollution?"',
      'Some answers may require inference from examples.',
      'You may need to match problems to their solutions.'
    ]
  },
  'family': {
    title: 'Family and Relationships',
    tips: [
      'Listen for family roles and relationships. E.g., "She is the eldest daughter."',
      'Pay attention to family events and traditions. E.g., "They celebrate together every year."',
      'Note any problems or conflicts mentioned. E.g., "There was a disagreement about chores."',
      'Underline or write down names, ages, or relationships.'
    ],
    traps: [
      'Don\'t confuse family members or relationships. E.g., "cousin" vs. "niece".',
      'Be careful with ages and family structure. E.g., "older brother" vs. "younger brother".',
      'Don\'t assume all families are the same—listen for unique situations.'
    ],
    predictions: [
      'Expect questions about roles, events, and problems. E.g., "Who is responsible for cooking?"',
      'Some answers may be about solutions to family issues.',
      'You may need to match people to their relationships.'
    ]
  },
  'public-services': {
    title: 'Public Services and Facilities',
    tips: [
      'Listen for types of public services and their purposes. E.g., "The library offers free internet access."',
      'Pay attention to opening hours, locations, and rules. E.g., "The swimming pool is closed on Mondays."',
      'Note any problems or complaints mentioned. E.g., "The bus service is often late."',
      'Underline or write down names of services, places, or officials.'
    ],
    traps: [
      'Don\'t confuse different services or facilities. E.g., "post office" vs. "bank".',
      'Be careful with times and locations. E.g., "open until 5pm" vs. "open until 6pm".',
      'Don\'t assume all services are free—listen for costs or requirements.'
    ],
    predictions: [
      'Expect questions about services, rules, and problems. E.g., "What does the community center offer?"',
      'Some answers may be about solutions to service issues.',
      'You may need to match people to the services they use.'
    ]
  },
  'healthcare': {
    title: 'Healthcare and Medical Services',
    tips: [
      'Listen for types of healthcare services and their purposes. E.g., "The clinic provides vaccinations."',
      'Pay attention to symptoms, treatments, and advice. E.g., "Take this medicine twice a day."',
      'Note any emergencies or special instructions. E.g., "Call 911 in case of chest pain."',
      'Underline or write down names of doctors, medicines, or conditions.'
    ],
    traps: [
      'Don\'t confuse symptoms with diagnoses. E.g., "headache" vs. "migraine".',
      'Be careful with dosages and schedules. E.g., "once a day" vs. "twice a day".',
      'Don\'t assume all advice is general—listen for specific instructions.'
    ],
    predictions: [
      'Expect questions about services, advice, and emergencies. E.g., "What should the patient do next?"',
      'Some answers may be about solutions to health problems.',
      'You may need to match people to their medical needs.'
    ]
  },
  'transport': {
    title: 'Transport and Travel',
    tips: [
      'Listen for types of transport and travel details. E.g., "The train leaves at 7:30am."',
      'Pay attention to schedules, routes, and costs. E.g., "The bus ticket costs $2."',
      'Note any problems or delays mentioned. E.g., "The flight was cancelled due to weather."',
      'Underline or write down times, destinations, or ticket types.'
    ],
    traps: [
      'Don\'t confuse types of transport or routes. E.g., "express train" vs. "local train".',
      'Be careful with times and connections. E.g., "departure" vs. "arrival".',
      'Don\'t assume all tickets are valid for all routes—listen for restrictions.'
    ],
    predictions: [
      'Expect questions about schedules, problems, and costs. E.g., "What time does the bus leave?"',
      'Some answers may be about solutions to travel issues.',
      'You may need to match people to their travel plans.'
    ]
  },
  'leisure': {
    title: 'Leisure and Free Time',
    tips: [
      'Listen for types of leisure activities and preferences. E.g., "She enjoys hiking on weekends."',
      'Pay attention to reasons for choosing activities. E.g., "He plays chess to relax."',
      'Note any problems or barriers mentioned. E.g., "The park is too far from home."',
      'Underline or write down names of activities, places, or people.'
    ],
    traps: [
      'Don\'t confuse different activities or their purposes. E.g., "reading" for fun vs. for study.',
      'Be careful with times and locations. E.g., "evenings" vs. "weekends".',
      'Don\'t assume everyone has the same opportunities—listen for limitations.'
    ],

    predictions: [
      'Expect questions about activities, preferences, and problems. E.g., "What does the person do in their free time?"',
      'Some answers may be about solutions to leisure barriers.',
      'You may need to match people to their favorite activities.'
    ]
  }
};

export function getListeningTemplateForTopic(categoryKey, topicKey) {
  // categoryKey is ignored; topicKey is used to fetch the template
  return listeningTemplates[topicKey] || null;
}
