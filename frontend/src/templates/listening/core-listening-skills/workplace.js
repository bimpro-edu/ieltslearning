export default {
    title: 'Workplace and Employment',
    mindmap: {
      title: 'Workplace and Employment',
      nodes: [
        { id: 'predict', label: 'Predicting Answers' },
        { id: 'sign', label: 'Signpost Words' },
        { id: 'distract', label: 'Distractors' },
        { id: 'numbers', label: 'Numbers & Dates' },
        { id: 'roles', label: 'Job Titles & Roles' }
      ],
      links: [
        { source: 'predict', target: 'sign' },
        { source: 'sign', target: 'distract' },
        { source: 'roles', target: 'numbers' }
      ]
    },
    templates: [
      { name: 'Template 1', content: "When listening for workplace tasks, underline duties and responsibilities. Use short notes." },
      { name: 'Template 2', content: "Listen for shift times and pay details. Note numbers carefully." },
      { name: 'Template 3', content: "Identify speaker roles to match information quickly." }
    ],
    tips: [
      'Listen for job titles, duties, and requirements. E.g., "Applicants must have experience with Excel." ',
      'Pay attention to working hours, pay, and benefits. E.g., "The salary is $2,000 per month." ',
      'Note any problems or workplace issues. E.g., "There is a staff meeting every Friday." ',
      'Underline or write down company names, positions, or deadlines.'
    ],
    traps: [
      'Don\'t confuse job roles or departments. E.g., "HR" vs. "IT".',
      'Be careful with numbers and schedules. E.g., "The shift starts at 8am, not 9am".',
      'Don\'t assume all benefits apply to all employees—listen for details.'
    ],
    predictions: [
      'Expect questions about duties, pay, and workplace issues. E.g., "What is one responsibility of the new employee?" ',
      'Some answers may be about company policies or rules.',
      'You may need to match people to their job preferences.'
    ]
  };