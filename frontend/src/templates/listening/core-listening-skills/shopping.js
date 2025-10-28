export default {
    title: 'Shopping and Consumer Rights',
    templates: [
      { name: 'Template 1', content: "Listen for product names and prices. Write exact words for form completion." },
      { name: 'Template 2', content: "Track complaints and solutions - map cause to outcome." },
      { name: 'Template 3', content: "For multi-speaker dialogues, assign each speaker an initial and track their purchases." }
    ],
    mindmap: {
      title: 'Shopping and Consumer Rights',
      nodes: [
        { id: 'products', label: 'Products & Services' },
        { id: 'prices', label: 'Prices/Discounts' },
        { id: 'issues', label: 'Complaints & Returns' }
      ],
      links: [
        { source: 'products', target: 'prices' },
        { source: 'issues', target: 'products' }
      ]
    },
    tips: [
      'Listen for types of shops, products, and services. E.g., "The supermarket is open until 9pm." ',
      'Pay attention to prices, discounts, and complaints. E.g., "The shoes are on sale for $30." ',
      'Note any problems or solutions discussed. E.g., "The product was faulty, so she returned it." ',
      'Underline or write down names, prices, or product details.'
    ],
    traps: [
      'Don\'t confuse types of shops or products. E.g., "pharmacy" vs. "bakery".',
      'Be careful with prices and offers. E.g., "Buy one get one free" vs. "50% off".',
      'Don\'t assume all complaints are resolved—listen for outcomes.'
    ],
    predictions: [
      'Expect questions about products, prices, and complaints. E.g., "What did the customer buy?" ',
      'Some answers may be about solutions or advice.',
      'You may need to match people to their purchases.'
    ]
  };