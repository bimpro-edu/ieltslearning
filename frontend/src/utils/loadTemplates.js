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
    },
    // Add more categories as needed
  },
  // task1: { ... }
};

// Restore the loadTemplates export for TaskPage and other consumers
export function loadTemplates({ taskType, category, band }) {
  return templateMap[taskType]?.[category]?.[band] || [];
}


// List of real lesson topics for each Listening category (for sidebar)
const listeningCategoryTopics = {
  'core-listening-skills': [
    { key: 'history-internet', title: 'The History of the Internet' },
    { key: 'healthy-eating', title: 'Healthy Eating Habits' },
    { key: 'urban-transport', title: 'Urban Transport Solutions' },
    { key: 'climate-change', title: 'Climate Change and You' },
    { key: 'music-impact', title: 'The Impact of Music on Society' },
    { key: 'space-exploration', title: 'Space Exploration: Past and Future' },
    { key: 'renewable-energy', title: 'Renewable Energy Sources' },
    { key: 'digital-privacy', title: 'Digital Privacy in Modern Life' },
    { key: 'sports-benefits', title: 'The Benefits of Sports' },
    { key: 'travel-culture', title: 'Travel and Cultural Exchange' },
    { key: 'university-life', title: 'University Life and Study Skills' },
    { key: 'accommodation', title: 'Accommodation and Housing' },
    { key: 'workplace', title: 'Workplace and Employment' },
    { key: 'environmental-issues', title: 'Environmental Issues' },
    { key: 'shopping', title: 'Shopping and Consumer Rights' },
    { key: 'public-services', title: 'Public Services and Facilities' },
    { key: 'healthcare', title: 'Healthcare and Medical Services' },
    { key: 'transport', title: 'Transport and Travel' },
    { key: 'leisure', title: 'Leisure and Free Time' },
    { key: 'family', title: 'Family and Relationships' },
  ],
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
      'Listen for types of accommodation and their features. E.g., "The flat has two bedrooms and a balcony."',
      'Pay attention to costs, contracts, and facilities. E.g., "The rent includes water and electricity."',
      'Note any problems or repairs mentioned. E.g., "The heating is not working."',
      'Underline or write down addresses, prices, or contact details.'
    ],
    traps: [
      'Don\'t confuse different types of housing. E.g., "studio" vs. "shared house".',
      'Be careful with numbers and conditions. E.g., "Deposit is $500, not $50."',
      'Don\'t assume all facilities are included—listen for exceptions.'
    ],
    predictions: [
      'Expect questions about features, costs, and problems. E.g., "What is included in the rent?"',
      'Some answers may be about location or amenities.',
      'You may need to match people to their accommodation preferences.'
    ]
  },
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
  'environmental-issues': {
    title: 'Environmental Issues',
    tips: [
      'Listen for types of environmental problems and their causes. E.g., "Air pollution is caused by car emissions."',
      'Pay attention to solutions and government actions. E.g., "The city is planting more trees."',
      'Note any statistics or comparisons. E.g., "Water usage dropped by 10%."',
      'Underline or write down key terms and their meanings.'
    ],
    traps: [
      'Don\'t confuse causes and effects. E.g., "Deforestation leads to loss of habitat."',
      'Be careful with numbers and percentages. E.g., "Recycling increased by 5%, not 50%."',
      'Don\'t assume all solutions are equally effective—listen for the speaker\'s evaluation.'
    ],
    predictions: [
      'Expect questions about problems, solutions, and statistics. E.g., "What is one way to reduce waste?"',
      'Some answers may be about government or community actions.',
      'You may need to match problems to their solutions.'
    ]
  },
  'shopping': {
    title: 'Shopping and Consumer Rights',
    tips: [
      'Listen for types of shops, products, and prices. E.g., "The supermarket is open until 9pm."',
      'Pay attention to complaints, returns, and guarantees. E.g., "You can return the item within 30 days."',
      'Note any special offers or discounts. E.g., "Buy one, get one free."',
      'Underline or write down product names, prices, or policies.'
    ],
    traps: [
      'Don\'t confuse different products or shops. E.g., "bakery" vs. "butcher".',
      'Be careful with numbers and conditions. E.g., "Discount is 20%, not 2%."',
      'Don\'t assume all guarantees are the same—listen for details.'
    ],
    predictions: [
      'Expect questions about products, prices, and policies. E.g., "What is the return policy?"',
      'Some answers may be about customer complaints or solutions.',
      'You may need to match products to their features.'
    ]
  },
  'public-services': {
    title: 'Public Services and Facilities',
    tips: [
      'Listen for types of services and their locations. E.g., "The post office is next to the bank."',
      'Pay attention to opening hours and procedures. E.g., "You need to fill out a form for a new passport."',
      'Note any problems or changes in service. E.g., "The library will be closed on Sunday."',
      'Underline or write down service names, locations, or requirements.'
    ],
    traps: [
      'Don\'t confuse different services or locations. E.g., "police station" vs. "fire station".',
      'Be careful with times and requirements. E.g., "Open until 5pm, not 6pm."',
      'Don\'t assume all services are free—listen for fees or charges.'
    ],
    predictions: [
      'Expect questions about services, locations, and procedures. E.g., "Where do you get a driver\'s license?"',
      'Some answers may be about changes or problems.',
      'You may need to match services to their purposes.'
    ]
  },
  'healthcare': {
    title: 'Healthcare and Medical Services',
    tips: [
      'Listen for types of healthcare providers and treatments. E.g., "The clinic offers vaccinations."',
      'Pay attention to symptoms, diagnoses, and advice. E.g., "If you have a fever, see a doctor."',
      'Note any costs or insurance details. E.g., "The consultation fee is $30."',
      'Underline or write down names of medicines, doctors, or conditions.'
    ],
    traps: [
      'Don\'t confuse symptoms and treatments. E.g., "Cough" is a symptom, "cough syrup" is a treatment.',
      'Be careful with numbers and instructions. E.g., "Take two pills a day, not one."',
      'Don\'t assume all services are available everywhere—listen for exceptions.'
    ],
    predictions: [
      'Expect questions about providers, treatments, and advice. E.g., "What should you do if you feel sick?"',
      'Some answers may be about costs or insurance.',
      'You may need to match symptoms to treatments.'
    ]
  },
  'transport': {
    title: 'Transport and Travel',
    tips: [
      'Listen for types of transport, routes, and schedules. E.g., "The train leaves at 7:30am."',
      'Pay attention to ticket prices and booking procedures. E.g., "You can buy tickets online."',
      'Note any travel problems or solutions. E.g., "The bus is delayed due to traffic."',
      'Underline or write down station names, times, or fares.'
    ],
    traps: [
      'Don\'t confuse routes or times. E.g., "The express train skips some stations."',
      'Be careful with prices and conditions. E.g., "Return ticket is $10, not $100."',
      'Don\'t assume all transport is direct—listen for transfers or changes.'
    ],
    predictions: [
      'Expect questions about routes, prices, and problems. E.g., "What time does the last bus leave?"',
      'Some answers may be about travel delays or solutions.',
      'You may need to match transport types to their advantages.'
    ]
  },
  'leisure': {
    title: 'Leisure and Free Time',
    tips: [
      'Listen for types of leisure activities and their benefits. E.g., "Reading helps you relax."',
      'Pay attention to schedules and locations. E.g., "The gym is open every day."',
      'Note any costs or equipment needed. E.g., "You need to bring your own racket for tennis."',
      'Underline or write down activity names, times, or places.'
    ],
    traps: [
      'Don\'t confuse activities or locations. E.g., "Swimming pool" vs. "sports hall".',
      'Be careful with times and requirements. E.g., "Yoga class starts at 6pm, not 7pm."',
      'Don\'t assume all activities are free—listen for fees.'
    ],
    predictions: [
      'Expect questions about activities, times, and benefits. E.g., "What is one benefit of playing chess?"',
      'Some answers may be about costs or equipment.',
      'You may need to match activities to their benefits.'
    ]
  },
  'family': {
    title: 'Family and Relationships',
    tips: [
      'Listen for family members, relationships, and events. E.g., "The wedding is next Saturday."',
      'Pay attention to ages, names, and roles. E.g., "Her brother is 12 years old."',
      'Note any problems or solutions discussed. E.g., "They argued about chores."',
      'Underline or write down names, dates, or relationships.'
    ],
    traps: [
      'Don\'t confuse family members or relationships. E.g., "cousin" vs. "nephew".',
      'Be careful with ages and dates. E.g., "Birthday is in June, not July."',
      'Don\'t assume all families are the same—listen for differences.'
    ],
    predictions: [
      'Expect questions about members, events, and problems. E.g., "Who is getting married?"',
      'Some answers may be about solutions or advice.',
      'You may need to match people to their relationships.'
    ]
  },
  'question-types-strategies': [
    { key: 'form', title: 'Form Completion' },
    { key: 'mcq', title: 'Multiple Choice Strategy' },
    { key: 'matching', title: 'Matching' },
    { key: 'map', title: 'Map & Plan Labeling' },
    { key: 'sentence', title: 'Sentence Completion / Short Answer' },
    { key: 'flowchart', title: 'Flow Chart & Diagram Completion' },
  ],
  'test-skills-mindset': [
    { key: 'spelling', title: 'Spelling & Numbers Training' },
    { key: 'accents', title: 'Dealing with Accents' },
    { key: 'timing', title: 'Time Management' },
    { key: 'error', title: 'Error Checking' },
    { key: 'calm', title: 'Staying Calm After Missing an Answer' },
  ],
};

export function getListeningTopicsForCategory(categoryKey) {
  return listeningCategoryTopics[categoryKey] || [];
}

// Get template/tips/traps for a listening topic (by category and topicKey)
const listeningTemplates = {
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
      'Listen for examples of cultural exchange. E.g., "Travelers can learn new languages and customs."',
      'Pay attention to benefits and challenges of travel. E.g., "Travel broadens the mind but can be expensive."',
      'Note any personal stories or experiences shared.',
      'Underline or write down country names and cultural practices.'
    ],
    traps: [
      'Don\'t confuse countries or customs. E.g., "Japan is known for tea ceremonies, not Italy."',
      'Be careful with opinions vs. facts. E.g., "Some people think travel is essential; others disagree."',
      'Don\'t assume all experiences are positive—listen for challenges as well.'
    ],
    predictions: [
      'Expect questions about benefits, challenges, and examples. E.g., "What is one benefit of cultural exchange?"',
      'Some answers may be about personal growth or learning.',
      'You may need to identify the main idea or lesson from a story.'
    ]
  },
  'leisure': {
    title: 'Leisure and Free Time',
    tips: [
      'Listen for types of leisure activities and their benefits. E.g., "Reading helps you relax."',
      'Pay attention to schedules and locations. E.g., "The gym is open every day."',
      'Note any costs or equipment needed. E.g., "You need to bring your own racket for tennis."',
      'Underline or write down activity names, times, or places.'
    ],
    traps: [
      'Don\'t confuse activities or locations. E.g., "Swimming pool" vs. "sports hall".',
      'Be careful with times and requirements. E.g., "Yoga class starts at 6pm, not 7pm."',
      'Don\'t assume all activities are free—listen for fees.'
    ],
    predictions: [
      'Expect questions about activities, times, and benefits. E.g., "What is one benefit of playing chess?"',
      'Some answers may be about costs or equipment.',
      'You may need to match activities to their benefits.'
    ]
  },
  'family': {
    title: 'Family and Relationships',
    tips: [
      'Listen for family members, relationships, and events. E.g., "The wedding is next Saturday."',
      'Pay attention to ages, names, and roles. E.g., "Her brother is 12 years old."',
      'Note any problems or solutions discussed. E.g., "They argued about chores."',
      'Underline or write down names, dates, or relationships.'
    ],
    traps: [
      'Don\'t confuse family members or relationships. E.g., "cousin" vs. "nephew".',
      'Be careful with ages and dates. E.g., "Birthday is in June, not July."',
      'Don\'t assume all families are the same—listen for differences.'
    ],
    predictions: [
      'Expect questions about members, events, and problems. E.g., "Who is getting married?"',
      'Some answers may be about solutions or advice.',
      'You may need to match people to their relationships.'
    ]
  },
  // Real lesson topics (sample placeholder data)
  'history-internet': {
    title: 'The History of the Internet',
    tips: [
      'Listen for dates and names of key inventors. E.g., "Tim Berners-Lee invented the World Wide Web in 1989."',
      'Pay attention to the sequence of events. E.g., "ARPANET was developed before the Internet became public."',
      'Note the reasons for each development. E.g., "The need for faster communication led to email."',
      'Underline or jot down acronyms and what they stand for.'
    ],
    traps: [
      'Don\'t confuse the order of technological developments. E.g., The Internet came after ARPANET, not before.',
      'Be careful with similar-sounding technical terms. E.g., "modem" vs. "modular".',
      'Don\'t assume the first date you hear is the answer—listen for corrections or clarifications.'
    ],
    predictions: [
      'Expect questions about years, inventions, and people. E.g., "Who invented the World Wide Web?"',
      'Some answers may be paraphrased. E.g., "global network" for "Internet" or "message system" for "email".',
      'You may need to match events to dates or people.'
    ]
  },
  'healthy-eating': {
    title: 'Healthy Eating Habits',
    tips: [
      'Listen for specific food groups and their benefits. E.g., "Fruits provide vitamins; dairy gives calcium."',
      'Note any statistics or recommendations. E.g., "Eat at least 5 servings of vegetables per day."',
      'Pay attention to advice about what to avoid. E.g., "Limit your intake of sugar and salt."',
      'Underline or write down any numbers or frequencies mentioned.'
    ],
    traps: [
      'Don\'t mix up positive and negative health effects. E.g., "Too much fat can cause health problems."',
      'Watch for exceptions or special cases. E.g., "Some people are allergic to nuts."',
      'Don\'t confuse portion sizes or recommended amounts.'
    ],
    predictions: [
      'Expect questions about nutrients, habits, and health outcomes. E.g., "Which food group helps build strong bones?"',
      'Answers may require listening for numbers or frequency. E.g., "Eat fish twice a week."',
      'Some answers may be about negative effects (e.g., "What happens if you eat too much sugar?").'
    ]
  },
  'urban-transport': {
    title: 'Urban Transport Solutions',
    tips: [
      'Listen for types of transport and their pros/cons. E.g., "Buses are cheap but slow; subways are fast but crowded."',
      'Pay attention to problems and proposed solutions. E.g., "Traffic congestion can be reduced by carpooling."',
      'Note any statistics or comparisons. E.g., "40% of people use public transport."',
      'Underline or write down city names and transport types.'
    ],
    traps: [
      'Don\'t confuse different cities or transport systems. E.g., "London has the Tube; New York has the Subway."',
      'Be careful with statistics and comparisons. E.g., "More people use buses than trains in City A."',
      'Don\'t assume the first solution mentioned is the best—listen for the speaker\'s opinion.'
    ],
    predictions: [
      'Expect questions about advantages/disadvantages and future trends. E.g., "What is one benefit of cycling?"',
      'Some answers may be implied, not directly stated. E.g., "Fewer cars means less pollution."',
      'You may need to compare two or more transport options.'
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
      'Listen for examples of cultural exchange. E.g., "Travelers can learn new languages and customs."',
      'Pay attention to benefits and challenges of travel. E.g., "Travel broadens the mind but can be expensive."',
      'Note any personal stories or experiences shared.',
      'Underline or write down country names and cultural practices.'
    ],
    traps: [
      'Don\'t confuse countries or customs. E.g., "Japan is known for tea ceremonies, not Italy."',
      'Be careful with opinions vs. facts. E.g., "Some people think travel is essential; others disagree."',
      'Don\'t assume all experiences are positive—listen for challenges as well.'
    ],
    predictions: [
      'Expect questions about benefits, challenges, and examples. E.g., "What is one benefit of cultural exchange?"',
      'Some answers may be about personal growth or learning.',
      'You may need to identify the main idea or lesson from a story.'
    ]
  },
  predicting: {
    title: 'Predicting Answers from Context',
    tips: [
      'Anticipate answer type before listening. E.g., If the question is "How many people attended?", expect a number. For "Who is responsible?", expect a name.',
      'Underline keywords in the question. E.g., For "Where is the meeting?", underline "where" and "meeting" to focus on location.',
      'Look for clues in the question stem. E.g., If the question says "How much does it cost?", expect a price or amount.',
      'Write your prediction next to the question. E.g., For "What is the main reason?", write "reason" or "cause" as a reminder.'
    ],
    traps: [
      'Don\'t assume the answer is always obvious. E.g., The speaker may mention several numbers, but only one is correct for the question.',
      'Be careful with similar-sounding options. E.g., "fifteen" and "fifty" can be easily confused.',
      'Don\'t ignore units. E.g., If the answer is a number, check if it should be "5" or "5 kilograms".',
      'Don\'t get distracted by extra information. E.g., The speaker may mention irrelevant details before giving the real answer.'
    ],
    predictions: [
      'Common answer types: number, name, place. E.g., For time-table questions, expect times like "9:30" or days like "Monday".',
      'If the question asks for a place, listen for locations such as "library", "main hall", or "office".',
      'Expect the answer to be paraphrased. E.g., The question says "departure time" but the audio says "leaves at 7pm".',
      'Sometimes the answer is implied, not directly stated. E.g., "Bring your umbrella" implies the answer is "rain".'
    ]
  },
  signpost: {
    title: 'Listening for Signpost Words',
    tips: [
      'Listen for transition words like "first", "however", "finally". E.g., "First, we will discuss..." signals a new section.',
      'Notice when the speaker says "on the other hand" or "in contrast"—this often means a change in direction.',
      'Pay attention to phrases like "to sum up", "in summary", which signal the end of a section.',
      'Underline or note signpost words in the question booklet as you hear them.'
    ],
    traps: [
      'Don\'t ignore changes in topic. E.g., If the speaker says "Now, let\'s move on to...", the answer may be in the new section.',
      'Don\'t assume the answer is always in the first part of the recording. E.g., Sometimes the answer comes after a signpost phrase.'
    ]
  },
  distractors: {
    title: 'Identifying Key Information vs Distractors',
    tips: [
      'Watch for corrections in the audio. E.g., "I think the answer is 12... oh no, sorry, it\'s 21."',
      'Focus on the final answer, not the first thing you hear.',
      'Listen for phrases like "actually", "no, wait", or "sorry"—these often signal a correction.',
      'Underline or note the key information in the question to avoid being distracted by extra details.'
    ],
    traps: [
      'Don\'t be misled by distractors. E.g., The speaker may mention several options but only one is correct.',
      'Don\'t write the first answer you hear. E.g., Wait for confirmation or correction before writing your answer.',
      'Don\'t get confused by similar-sounding words. E.g., "ship" and "sheep".'
    ]
  },
  paraphrase: { title: 'Paraphrase Recognition', tips: ['Match synonyms between question and audio.'] },
  'multi-speaker': { title: 'Multi-Speaker Tracking', tips: ['Track who is speaking.'] },
  form: { title: 'Form Completion', tips: ['Check spelling and word limits.'] },
  mcq: { title: 'Multiple Choice Strategy', tips: ['Eliminate wrong options.'] },
  matching: { title: 'Matching', tips: ['Listen for synonyms and order.'] },
  map: { title: 'Map & Plan Labeling', tips: ['Visualize the layout.'] },
  sentence: { title: 'Sentence Completion / Short Answer', tips: ['Check grammar and word limits.'] },
  flowchart: { title: 'Flow Chart & Diagram Completion', tips: ['Listen for sequence and process words.'] },
  spelling: { title: 'Spelling & Numbers Training', tips: ['Practice writing as you listen.'] },
  accents: { title: 'Dealing with Accents', tips: ['Practice with a variety of recordings.'] },
  timing: { title: 'Time Management', tips: ['Use the time before each section wisely.'] },
  error: { title: 'Error Checking', tips: ['Review your answers if time allows.'] },
  calm: { title: 'Staying Calm After Missing an Answer', tips: ['Move on quickly and don\'t dwell on mistakes.'] },
};

export function getListeningTemplateForTopic(categoryKey, topicKey) {
  return listeningTemplates[topicKey] || { title: 'No data', tips: [], traps: [], predictions: [] };
}
