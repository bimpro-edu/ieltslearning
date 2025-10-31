// Scanning content templates with focus on scanning techniques
export const scanningTopics = {
  'education': {
    title: 'Education Passages - Scanning Techniques',
    examples: [
      {
        title: 'Admission Statistics Snapshot',
        content: `[QUICK FOCUS] Look for numbers, dates and proper nouns in academic reports and admission documents. Example: "The University of Cambridge saw total admissions increase by 8% (from 3,450 to 3,726) in the 2023-24 academic year, with STEM programs showing the highest growth at 12.3% year-over-year."`,
        tips: [
          'SCANNING TECHNIQUE #1: Search for digit clusters and year patterns (e.g., 2020-21, 2023/24) - these often indicate admission cycles',
          'SCANNING TECHNIQUE #2: Use your peripheral vision to spot % signs and number ranges in parentheses (e.g., 15% increase, 500-600 students)',
          'SCANNING TECHNIQUE #3: Move line-by-line but focus on numerical data blocks - look for patterns like "X% increase" or "decreased from X to Y"',
          'SCANNING TECHNIQUE #4: When scanning tables, use column headers as guides - look for "Year", "Total", "Change (%)" to locate relevant cells'
        ],
        mistakes: [
          'Reading full contextual sentences when only looking for a specific statistic',
          'Missing the crucial qualifying information (e.g., "undergraduate" vs "total" admissions)',
          'Confusing percentage changes with absolute numbers',
          'Not checking whether figures are provisional or final'
        ],
        predictions: [
          'Key statistics often appear in (brackets) or as part of "X to Y" comparisons',
          'Look for tables with year-on-year comparisons in the appendix or supplementary sections',
          'Executive summaries typically contain headline figures in their opening paragraph',
          'Footnotes may contain important qualifications about the statistics presented'
        ]
      }
      ,
      {
        title: 'Course Deadlines & Dates',
        content: `[QUICK FOCUS] When scanning academic calendars and course documents, look for specific temporal markers. Example: "Fall Semester 2024: Early application deadline: October 15th; Regular decision: January 15th, 2025; Summer session registration opens March 1st, 2025 (9:00 AM EST)."`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for month names followed by ordinal numbers (e.g., "September 1st", "October 31st")',
          'SCANNING TECHNIQUE #2: Use semester markers ("Fall", "Spring") as initial anchors, then locate nearby dates',
          'SCANNING TECHNIQUE #3: Scan for deadline-related words ("due by", "no later than", "deadline", "closes")',
          'SCANNING TECHNIQUE #4: Check for time zones (EST, GMT) when precise timing is mentioned'
        ],
        mistakes: [
          'Confusing academic year dates with calendar year dates',
          'Missing priority or early decision deadlines that differ from regular deadlines',
          'Not noticing time zone specifications for online submissions',
          'Overlooking different deadlines for different student categories (domestic/international)'
        ],
        predictions: [
          'Important dates are typically presented in chronological bullet points or tables',
          'Look for deadlines in highlighted boxes or specially formatted sections',
          'End of sections often contain reminder dates in bold or italic text',
          'Calendar tables usually have key dates highlighted or in different formatting'
        ]
      },
      {
        title: 'Faculty Contact & Office Hours',
        content: `[QUICK FOCUS] In faculty directories and course syllabi, locate contact information efficiently. Example: "Prof. Sarah Chen (schen@university.edu) | Office: Room 405, Science Building | Office Hours: Mon/Wed 14:00-15:30 & by appointment | Tel: +1-555-0123"`,
        tips: [
          'SCANNING TECHNIQUE #1: Use visual anchors: @ symbols for emails, "Room" for locations, colons for office hours',
          'SCANNING TECHNIQUE #2: Look for time formats (2:00 PM, 14:00) and day abbreviations (Mon, Tues)',
          'SCANNING TECHNIQUE #3: Scan for contact-specific words ("ext.", "Tel:", "Room", "Building")',
          'SCANNING TECHNIQUE #4: Use formatting breaks (|, •, or new lines) to separate different information types'
        ],
        mistakes: [
          'Missing alternative contact methods (e.g., "by appointment" options)',
          'Confusing regular office hours with special consultation times',
          'Not noting semester-specific variations in availability',
          'Overlooking digital contact options (e.g., virtual office hours, Zoom links)'
        ],
        predictions: [
          'Contact information blocks are usually set apart from main text, often in boxes or with special formatting',
          'Look for contact details at the top or bottom of syllabi, not in the middle',
          'Office hours are typically grouped together, often in table format',
          'Digital contact options (Zoom, Teams links) often appear alongside traditional contact methods'
        ]
      }
    ]
  },
  'technology': {
    title: 'Technology Passages - Scanning Techniques',
    examples: [
      {
        title: 'Product Release Dates',
        content: `[QUICK FOCUS] In tech announcements and product documentation, scan for version numbers, release dates, and company details. Example: "Apple® released iOS 17.1.2 (Build 21B101) on November 7, 2023, with security patches available for iPhone XS and later models."`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for version patterns (e.g., v2.0.1, Build 12345) near release information',
          'SCANNING TECHNIQUE #2: Use trademark symbols (®, ™) and capitalized company names as anchors',
          'SCANNING TECHNIQUE #3: Scan for compatibility notes ("for devices running...", "supports version...")',
          'SCANNING TECHNIQUE #4: Check parenthetical text for build numbers and specific timing details'
        ],
        mistakes: [
          'Confusing announcement dates with actual release dates',
          'Missing regional release variations in global launches',
          'Not distinguishing between beta and stable releases',
          'Overlooking device compatibility requirements'
        ],
        predictions: [
          'Version numbers typically appear in consistent formats across a document',
          'Release information is often found in the first two paragraphs of announcements',
          'Technical details appear in bullet points or specially formatted blocks',
          'Compatibility lists are usually separated into their own sections'
        ]
      }
      ,
      {
        title: 'Technical Specification Lookup',
        content: `[QUICK FOCUS] In product specifications and technical documents, locate exact measurements and capabilities. Example: "Display: 6.7-inch OLED (2796 × 1290 pixels at 460 ppi); Memory: 8GB RAM; Storage: 128GB/256GB/512GB; Battery: 4,422mAh with 27W fast charging"`,
        tips: [
          'SCANNING TECHNIQUE #1: Use measurement units as anchors (GB, MHz, mm, mAh)',
          'SCANNING TECHNIQUE #2: Look for specification patterns ("spec: value") and bullet points',
          'SCANNING TECHNIQUE #3: Scan for comparison operators (×, /, -) that often separate related specs',
          'SCANNING TECHNIQUE #4: Use technical abbreviations (ppi, fps, mAh) to locate specific details'
        ],
        mistakes: [
          'Reading numbers without their units or qualifiers',
          'Confusing minimum with recommended specifications',
          'Missing important ranges or variations (e.g., "up to X" or "X-Y")',
          'Not noting whether specs are theoretical or tested values'
        ],
        predictions: [
          'Technical specs appear in structured tables or bullet lists',
          'Key specifications are often highlighted or in bold text',
          'Detailed specs are typically grouped by component or feature',
          'Look for comparison tables when multiple models are discussed'
        ]
      },
      {
        title: 'Company Attribution',
        content: `[QUICK FOCUS] In tech articles and product documentation, identify company relationships and ownership. Example: "The RTX 4090 GPU, developed by NVIDIA® in partnership with TSMC (7nm process), features technology licensed from ARM Holdings™ and Samsung Electronics Co., Ltd."`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for legal markers (®, ™, ©) and corporate suffixes (Inc., Ltd., Corp.)',
          'SCANNING TECHNIQUE #2: Scan for relationship words ("developed by", "manufactured by", "licensed from")',
          'SCANNING TECHNIQUE #3: Use company logos and stylized names as visual anchors',
          'SCANNING TECHNIQUE #4: Check footnotes and legal notices for detailed attribution'
        ],
        mistakes: [
          'Confusing manufacturing partners with brand owners',
          'Missing subsidiary relationships in corporate structures',
          'Not distinguishing between technology licensors and product makers',
          'Overlooking joint venture or partnership attributions'
        ],
        predictions: [
          'Primary attribution appears in the first mention of a product',
          'Legal relationships are often detailed in footnotes or endnotes',
          'Partner companies are typically listed in order of involvement',
          'Look for attribution blocks in "About" sections or press releases'
        ]
      }
    ]
  },
  'science': {
    title: 'Science Passages - Scanning Techniques',
    examples: [
      {
        title: 'Experiment Results Table',
        content: `[QUICK FOCUS] Scan for units, numbers, and variable names when asked about results or measurements.`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for units (kg, mm, °C) as anchors',
          'SCANNING TECHNIQUE #2: Headings like RESULTS or FINDINGS point to data'
        ],
        mistakes: ['Don’t try to verify statistical details on first skim'],
        predictions: ['Graphs and data sections contain the core results; conclusions restate them']
      }
      ,
      {
        title: 'Methodology Quick-Find',
        content: `[QUICK FOCUS] When questions ask about sample size or instruments, scan for "n=" and instrument names (e.g., "thermocouple").`,
        tips: [
          'SCANNING TECHNIQUE #1: Search for "n=" and sample descriptors',
          'SCANNING TECHNIQUE #2: Instrument names are often capitalised or technical nouns'
        ],
        mistakes: ['Confusing method details with outcome statements'],
        predictions: ['Method elements are concentrated in a single paragraph or under a METHODS header']
      },
      {
        title: 'Result Statement Lookup',
        content: `[QUICK FOCUS] To answer questions about a reported effect, scan for verbs like "increased", "decreased" and nearby percentages or p-values.`,
        tips: [
          'SCANNING TECHNIQUE #1: Jump to verbs indicating change and then read the surrounding token for the numeric evidence',
          'SCANNING TECHNIQUE #2: Look for the word "significant" as a shortcut to key results'
        ],
        mistakes: ['Overreading background content instead of locating the result sentence'],
        predictions: ['Result sentences summarise findings and are ideal scanning targets']
      }
    ]
  },
  'environment': {
    title: 'Environment Passages - Scanning Techniques',
    examples: [
      {
        title: 'Conservation Funding Figures',
        content: `[QUICK FOCUS] Identify currency symbols and funding amounts when asked about budgets or investments.`,
        tips: [
          'SCANNING TECHNIQUE #1: Search for $/£/€ signs and numerals',
          'SCANNING TECHNIQUE #2: Read the sentence fragment containing the amount to confirm context'
        ],
        mistakes: ['Taking an example amount as the total without checking the paragraph context'],
        predictions: ['Monetary figures often appear near policy/recommendation paragraphs']
      }
      ,
      {
        title: 'Species Count & Status',
        content: `[QUICK FOCUS] Scan for numbers and status words (endangered, vulnerable) when asked about species counts or status.`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for numeric tokens followed by species names',
          'SCANNING TECHNIQUE #2: Status terms are often near the species name and in bold or italics'
        ],
        mistakes: ['Reading contextual paragraphs instead of extracting the single numeric answer'],
        predictions: ['Conservation reports often list counts in a single summarising sentence']
      },
      {
        title: 'Policy Implementation Dates',
        content: `[QUICK FOCUS] When asked about dates for policy changes, scan for years and official names of the policy acts.`,
        tips: [
          'SCANNING TECHNIQUE #1: Use capitalised policy names as anchor points',
          'SCANNING TECHNIQUE #2: Years are often parenthetical and thus stand out'
        ],
        mistakes: ['Mixing proposal dates with implementation dates'],
        predictions: ['Implementation dates are reported in concluding policy paragraphs']
      }
    ]
  },
  'health': {
    title: 'Health & Medicine Passages - Scanning Techniques',
    examples: [
      {
        title: 'Clinical Trial Outcomes',
        content: `[QUICK FOCUS] Scan for percentages, sample sizes (n=), and outcome words (reduced, increased).`,
        tips: [
          'SCANNING TECHNIQUE #1: Identify % and n= as immediate evidence anchors',
          'SCANNING TECHNIQUE #2: Look at sentence ends for reported effects (e.g., "reduced by 20%")'
        ],
        mistakes: ['Misreading relative vs absolute numbers when scanning too fast'],
        predictions: ['Outcomes are summarised in parentheses or final sentences']
      },
      {
        title: 'Guideline Dates & Agencies',
        content: `[QUICK FOCUS] Scan for dates and agency names (WHO, CDC) when asked about guidelines or updates.`,
        tips: [
          'SCANNING TECHNIQUE #1: Capitalised agency acronyms are fast anchors',
          'SCANNING TECHNIQUE #2: Dates often follow the agency or guideline name'
        ],
        mistakes: ['Assuming the publication date is the same as the guideline effective date'],
        predictions: ['Guidelines list publication and effective dates near the start or end of the document']
      },
      {
        title: 'Dosage & Administration Quick-Find',
        content: `[QUICK FOCUS] When asked about dosage, look for mg, ml, times per day (e.g., "500 mg twice daily").`,
        tips: [
          'SCANNING TECHNIQUE #1: Scan for units (mg, ml) and frequency words (daily, weekly)',
          'SCANNING TECHNIQUE #2: Dosage information is often in short isolated sentences or lists'
        ],
        mistakes: ['Misreading frequency as total dose when scanning hastily'],
        predictions: ['Dosage lines are concise and stand out visually']
      }
    ]
  },
  'business': {
    title: 'Business & Economics Passages - Scanning Techniques',
    examples: [
      {
        title: 'Market Share Figures',
        content: `[QUICK FOCUS] Scan for percentages and company names when asked which firm holds a particular share.`,
        tips: [
          'SCANNING TECHNIQUE #1: Use capital letters and % signs to jump to the right lines',
          'SCANNING TECHNIQUE #2: Read the noun phrase around the number to avoid context errors'
        ],
        mistakes: ['Don’t confuse year-on-year change with total market share'],
        predictions: ['Summaries and recommendations appear at the end of business sections']
      },
      {
        title: 'Revenue & Growth Numbers',
        content: `[QUICK FOCUS] When asked about revenue or growth, scan for currency symbols and % change figures.`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for $/£/€ and % markers',
          'SCANNING TECHNIQUE #2: Read the clause around the number to capture the time period'
        ],
        mistakes: ['Mixing quarterly figures with annual totals when skimming quickly'],
        predictions: ['Growth figures are often presented with a reference year or quarter nearby']
      },
      {
        title: 'Executive Names & Roles',
        content: `[QUICK FOCUS] To find who holds a position, scan for capitalised names followed by role titles (e.g., "CEO, CFO").`,
        tips: [
          'SCANNING TECHNIQUE #1: Use title tokens (CEO, Director) as anchors',
          'SCANNING TECHNIQUE #2: Names often appear immediately before or after the role'
        ],
        mistakes: ['Confusing previous role holders with current incumbents'],
        predictions: ['Executives are typically introduced in one concise sentence']
      }
    ]
  },
  'society': {
    title: 'Society & Culture Passages - Scanning Techniques',
    examples: [
      {
        title: 'Survey Results Quick-Find',
        content: `[QUICK FOCUS] When asked about survey percentages or dates, scan for % and year tokens.`,
        tips: [
          'SCANNING TECHNIQUE #1: Focus on number tokens and quotation marks for reported opinions',
          'SCANNING TECHNIQUE #2: Look for headings like "Survey" or "Study" to narrow search'
        ],
        mistakes: ['Mistaking sample descriptions for results'],
        predictions: ['Survey summaries appear in a single paragraph near the start or end']
      },
      {
        title: 'Demographic Breakdown',
        content: `[QUICK FOCUS] For questions about age groups or populations, scan for age ranges, percentages, and population labels (e.g., "18-24", "majority").`,
        tips: [
          'SCANNING TECHNIQUE #1: Search for % signs and hyphenated age ranges',
          'SCANNING TECHNIQUE #2: Look at table captions and figure labels for demographic notes'
        ],
        mistakes: ['Confusing subgroup percentages with overall population figures'],
        predictions: ['Demographic stats are typically condensed into one summarising sentence or table']
      },
      {
        title: 'Policy Opinion Quotations',
        content: `[QUICK FOCUS] To find who said what about a policy, scan for quotation marks and named individuals or organisations nearby.`,
        tips: [
          'SCANNING TECHNIQUE #1: Use "\"" (quotation marks) as anchors for reported speech',
          'SCANNING TECHNIQUE #2: Names usually appear immediately before or after the quote'
        ],
        mistakes: ['Attributing a quote to the wrong speaker when multiple voices are present'],
        predictions: ['Quotations are often followed by attribution in the same or the following sentence']
      }
    ]
  },
  'history': {
    title: 'History & Archaeology Passages - Scanning Techniques',
    examples: [
      {
        title: 'Date & Place Lookup',
        content: `[QUICK FOCUS] Scan for years, proper nouns (places, rulers) when asked about chronology or attribution.`,
        tips: [
          'SCANNING TECHNIQUE #1: Jump to capitalised words and numerals',
          'SCANNING TECHNIQUE #2: Use the left-edge of paragraphs to find dates quickly'
        ],
        mistakes: ['Confusing speculative dates with confirmed dates when scanning hastily'],
        predictions: ['Chronological details are concentrated in the first or last lines of historical paragraphs']
      },
      {
        title: 'Artifact Date & Provenance',
        content: `[QUICK FOCUS] When asked about provenance or dating, scan for excavation years, carbon-dating results, and site names.`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for date ranges and site/place names',
          'SCANNING TECHNIQUE #2: Provenance is often given in parenthetical notes or captions'
        ],
        mistakes: ['Assuming a referenced site is the site of discovery rather than the site of exhibition'],
        predictions: ['Provenance statements are usually concise and near mentions of the object']
      },
      {
        title: 'Event Sequence Quick-Find',
        content: `[QUICK FOCUS] To find sequence-related answers, scan for ordinal words (first, then, subsequently) and accompanying dates.`,
        tips: [
          'SCANNING TECHNIQUE #1: Use sequence markers as anchors',
          'SCANNING TECHNIQUE #2: Read only the clause containing the ordinal to verify order'
        ],
        mistakes: ['Mixing separate events described in adjacent sentences'],
        predictions: ['Sequential descriptions often list events in temporal order within a short paragraph']
      }
    ]
  },
  'arts': {
    title: 'Arts & Humanities Passages - Scanning Techniques',
    examples: [
      {
        title: 'Artist/Work Attribution',
        content: `[QUICK FOCUS] To find who created a work or when it was produced, scan for names and dates near mentions of the work.`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for italics or quotation marks that often denote works',
          'SCANNING TECHNIQUE #2: Names and dates usually appear close to the work mentions'
        ],
        mistakes: ['Missing the immediate attribution sentence because you scanned past the name'],
        predictions: ['Parenthetical dates or artist names are common and easy to spot']
      },
      {
        title: 'Exhibition Dates & Venues',
        content: `[QUICK FOCUS] When asked about where or when a work was displayed, scan for venue names and date ranges.`,
        tips: [
          'SCANNING TECHNIQUE #1: Use proper nouns (gallery, museum) as anchors',
          'SCANNING TECHNIQUE #2: Dates for exhibitions are often in parentheses'
        ],
        mistakes: ['Confusing the location of creation with the exhibition venue'],
        predictions: ['Exhibition details often appear in a short metadata line near the mention of the work']
      },
      {
        title: 'Critical Reception Snippets',
        content: `[QUICK FOCUS] To find critics’ opinions or reception, scan for quotation marks, reviewer names, and evaluative adjectives (e.g., "praised", "panned").`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for quotation marks and reviewer attributions',
          'SCANNING TECHNIQUE #2: Adjectives describing quality are quick markers for reception lines'
        ],
        mistakes: ['Attributing a comment to the wrong critic when multiple reviews are cited'],
        predictions: ['Reception lines are often short and follow the work description']
      }
    ]
  },
  'global-issues': {
    title: 'Global Issues Passages - Scanning Techniques',
    examples: [
      {
        title: 'Policy Date & Statistic Find',
        content: `[QUICK FOCUS] Scan for dates, treaty names, and numeric indicators when asked about policies or outcomes.`,
        tips: [
          'SCANNING TECHNIQUE #1: Use capital letters and numerals to locate policy names and years',
          'SCANNING TECHNIQUE #2: Check the sentence fragment around the token to confirm the claim'
        ],
        mistakes: ['Assuming a headline-like token is the answer without verifying context'],
        predictions: ['Policy names and dates often cluster in a single summarising sentence']
      },
      {
        title: 'International Agreement Ratification',
        content: `[QUICK FOCUS] When asked about ratification or signatories, scan for country names and ratification dates near treaty titles.`,
        tips: [
          'SCANNING TECHNIQUE #1: Look for capitalised country names and year tokens',
          'SCANNING TECHNIQUE #2: Ratification details are often in parenthetical notes after treaty names'
        ],
        mistakes: ['Confusing declaration dates with ratification dates'],
        predictions: ['Ratification info is usually condensed into one short sentence']
      },
      {
        title: 'Outcome Statistics',
        content: `[QUICK FOCUS] To find reported outcomes, scan for percentages, targets, and numerical comparisons.`,
        tips: [
          'SCANNING TECHNIQUE #1: Focus on % signs and figures',
          'SCANNING TECHNIQUE #2: Read the immediate clause to ensure the number matches the asked target'
        ],
        mistakes: ['Mixing projected targets with actual reported outcomes'],
        predictions: ['Outcome statistics are typically summarised in executive-summary sentences']
      }
    ]
  }
};
