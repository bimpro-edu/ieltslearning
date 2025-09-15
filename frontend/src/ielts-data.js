const IELTS = {
  Task1: {
    Academic: {
      LineGraph: {
        Intro: "The line graph illustrates/compares [what the data shows] from [start year] to [end year].",
        Overview: "Overall, it is clear that [the main trend or most significant feature]. Another key feature is that [a second main trend].",
        Body1: "Looking at the details, [feature A] started at [value] in [year] and [describe its trend, e.g., rose/fell significantly] to [value] in [year].",
        Body2: "In contrast, [feature B] followed an opposite pattern, beginning at [value] and [describe its trend] to end the period at [value]."
      },
      PieChart: {
        Intro: "The pie charts provide information on/compare [what the data shows] in [location/year].",
        Overview: "Overall, the largest proportion of [category] was [the biggest slice], whereas the smallest was [the smallest slice].",
        Body1: "Specifically, [category A] accounted for [percentage] of the total. This was followed by [category B] with [percentage].",
        Body2: "Meanwhile, the remaining categories, [C and D], made up a smaller portion of the total, at [percentage] and [percentage] respectively."
      },
      BarChart: {
        Intro: "The bar chart illustrates/compares [what the data shows] across [several categories or time periods].",
        Overview: "Overall, [the highest category/value] stands out, while [the lowest category/value] is also noticeable. All other categories fall in between these two extremes.",
        Body1: "Focusing on [category A], its value was [number], which was significantly higher/lower than [category B] at [number].",
        Body2: "Furthermore, [category C] and [category D] had similar figures, at [number] and [number] respectively."
      },
      Table: {
        Intro: "The table provides data on/compares [what the data shows] in [number] different [countries/categories].",
        Overview: "Overall, the table highlights that [the most significant piece of information]. It is also evident that [a secondary significant point].",
        Body1: "Regarding [category A], the figure for [item 1] was [value], compared to only [value] for [item 2].",
        Body2: "Another key point is that [item 3] had the highest/lowest [metric] across all categories, with a figure of [value]."
      },
      ProcessDiagram: {
        Intro: "The diagram illustrates the process by which [the end product] is produced / the stages involved in [the process].",
        Overview: "Overall, the process consists of [number] main stages, beginning with [the first stage] and culminating in [the final stage].",
        Body1: "The process begins when [describe the first stage]. Following this, [describe the second stage, using sequencers like 'next', 'then', 'after that'].",
        Body2: "In the subsequent stage, [describe the next steps]. The final stage of the process involves [describe the last stage and the end result]."
      },
      Map: {
        Intro: "The two maps illustrate the changes that have taken place in the town/area of [place name] between [year 1] and [year 2].",
        Overview: "Overall, the area has undergone significant transformation, with the most notable changes being [the most obvious change, e.g., the addition of new facilities] and [a second major change, e.g., the removal of green spaces].",
        Body1: "Looking at the map from [year 1], the area was predominantly [residential/rural/industrial]. To the north/south/east/west, there was a [key feature, e.g., large park].",
        Body2: "By [year 2], this area had been transformed. For example, the [feature from Body 1] was replaced by a [new feature]. Additionally, a new [building/road] was constructed in the [location]."
      }
    },
    General: {
      Letter: {
        Formal: {
          Greeting: "Dear Sir or Madam,",
          Opening: "I am writing to [state purpose, e.g., inquire about, report an issue with...].",
          Body1: "Firstly, I would like to draw your attention to [the first point with details].",
          Body2: "Secondly, it is important to mention that [the second point with details].",
          ClosingAction: "I would appreciate it if you could [state desired action, e.g., look into this matter]. I look forward to hearing from you.",
          SignOff: "Yours faithfully,"
        },
        SemiFormal: {
          Greeting: "Dear Mr./Ms. [Last Name],",
          Opening: "I am writing to [state purpose, e.g., ask for some information about...]. I hope you are well.",
          Body1: "Regarding my first question, could you please tell me more about [the first point]?",
          Body2: "I was also wondering if you could provide some details about [the second point].",
          ClosingAction: "Thank you for your time and assistance. I look forward to your reply.",
          SignOff: "Best regards,"
        },
        Informal: {
          Greeting: "Hi [First Name],",
          Opening: "Hope you're doing well. I'm just writing to [state purpose, e.g., tell you about...].",
          Body1: "Guess what? [Share the first piece of news or detail]. It was so [adjective]!",
          Body2: "Also, I wanted to ask you about [ask a question or share more news].",
          ClosingAction: "Anyway, that's all for now. Let's catch up soon!",
          SignOff: "All the best,"
        }
      }
    }
  },

  Task2: {
    Opinion: {
      Intro: "It is often argued that [paraphrase the statement]. In my view, I completely agree/disagree with this proposition, and this essay will outline the reasons why.",
      Body1: "One of the primary reasons for my agreement/disagreement is that [first main idea]. For example, [provide a specific example or evidence].",
      Body2: "Another significant factor is [second main idea]. To illustrate this, [provide a specific example or evidence].",
      Body3_Optional: "Some might argue that [counter-argument], however, this perspective overlooks [rebuttal].",
      Conclusion: "In conclusion, for the reasons mentioned above, I firmly believe that [restate your thesis]. It is recommended that [provide a final thought or recommendation].",
      MindMapTopics: [
        {
          "topic": "Technology and Society",
          "thesis": "Although technology can isolate people, it also helps maintain connections.",
          "arguments": [
            {
              "side": "Isolation",
              "reason": "Time spent online reduces face-to-face interaction",
              "examples": ["Teenagers playing video games", "Social media addiction"],
              "connectors": ["Because", "This leads to"],
              "sample_sentences": [
                "Because teenagers spend hours playing online games, they often avoid meeting friends in person, which reduces their social skills.",
                "Social media addiction can lead to isolation as users prefer virtual interaction over real-life communication."
              ]
            },
            {
              "side": "Connection",
              "reason": "Technology enables communication across distances",
              "examples": ["Video calls with family", "Social media to connect friends"],
              "connectors": ["For example", "Thus"],
              "sample_sentences": [
                "For example, video calls allow families separated by distance to maintain close relationships, thus strengthening emotional bonds.",
                "Social media platforms help friends keep in touch, even when they live in different countries."
              ]
            }
          ]
        },
        {
          "topic": "Education – Online vs Traditional",
          "thesis": "While online education offers convenience, traditional classrooms provide better engagement.",
          "arguments": [
            {
              "side": "Online Education Advantages",
              "reason": "Flexible schedule and accessibility",
              "examples": ["Learn from home", "Global courses available"],
              "connectors": ["For instance", "Moreover"],
              "sample_sentences": [
                "For instance, students can attend lectures from home, which allows access to courses offered worldwide.",
                "Moreover, online education enables learners to study at their own pace, which suits different learning styles."
              ]
            },
            {
              "side": "Traditional Education Advantages",
              "reason": "Better interaction and engagement",
              "examples": ["Group discussions", "Immediate teacher feedback"],
              "connectors": ["However", "On the other hand"],
              "sample_sentences": [
                "However, traditional classrooms provide opportunities for group discussions that enhance critical thinking.",
                "On the other hand, immediate feedback from teachers helps students understand concepts more effectively."
              ]
            }
          ]
        },
        {
          "topic": "Working from Home",
          "thesis": "Although working from home increases flexibility, it can lead to isolation and blurred work-life boundaries.",
          "arguments": [
            {
              "side": "Positive",
              "reason": "Saves commuting time and increases efficiency",
              "examples": ["No travel time", "Personalized workspace"],
              "connectors": ["For example", "Thus"],
              "sample_sentences": [
                "For example, avoiding long commutes allows employees to dedicate more time to their work, thus increasing productivity.",
                "A personalized workspace at home can enhance comfort and focus, resulting in more efficient work."
              ]
            },
            {
              "side": "Negative",
              "reason": "Isolation and reduced social interaction",
              "examples": ["Less colleague communication", "Difficulty separating work and personal life"],
              "connectors": ["However", "This leads to"],
              "sample_sentences": [
                "However, working remotely may isolate employees from colleagues, reducing opportunities for collaboration.",
                "This leads to blurred boundaries between work and personal life, which can increase stress."
              ]
            }
          ]
        },
        {
          "topic": "Environment and Climate Change",
          "thesis": "While industrialization brings economic growth, governments must take action to reduce environmental harm.",
          "arguments": [
            {
              "side": "Problem",
              "reason": "Pollution and resource depletion",
              "examples": ["Air pollution from factories", "Deforestation"],
              "connectors": ["Because of", "As a result"],
              "sample_sentences": [
                "Because of industrial emissions, air pollution levels have risen significantly in many cities.",
                "Deforestation for agriculture reduces biodiversity and damages ecosystems."
              ]
            },
            {
              "side": "Solution",
              "reason": "Government regulations and public awareness",
              "examples": ["Carbon tax", "Recycling programs"],
              "connectors": ["Therefore", "Thus"],
              "sample_sentences": [
                "Therefore, governments should implement carbon taxes to reduce emissions and promote sustainable practices.",
                "Recycling programs help reduce waste, thus conserving natural resources."
              ]
            }
          ]
        },
        {
          "topic": "Health and Lifestyle",
          "thesis": "Although individuals are responsible for their health, governments should encourage healthy living.",
          "arguments": [
            {
              "side": "Government role",
              "reason": "Promotes public health",
              "examples": ["Anti-smoking campaigns", "Subsidized gyms or healthy food"],
              "connectors": ["For instance", "Moreover"],
              "sample_sentences": [
                "For instance, anti-smoking campaigns raise awareness about the dangers of tobacco.",
                "Moreover, providing subsidies for gyms encourages people to exercise regularly."
              ]
            },
            {
              "side": "Individual responsibility",
              "reason": "Personal choices determine health outcomes",
              "examples": ["Diet habits", "Exercise routine"],
              "connectors": ["However", "Nevertheless"],
              "sample_sentences": [
                "However, individuals who maintain poor diets risk developing health problems.",
                "Nevertheless, adopting a balanced diet and regular exercise routine can improve overall well-being."
              ]
            }
          ]
        },
        {
          "topic": "Crime and Punishment",
          "thesis": "While stricter punishments may reduce crime rates, preventive social programs are often more effective.",
          "arguments": [
            {
              "side": "Punishment",
              "reason": "Deters crime through fear of consequences",
              "examples": ["Longer prison sentences", "Heavy fines"],
              "connectors": ["Because", "As a result"],
              "sample_sentences": [
                "Because criminals fear severe punishment, they may think twice before committing a crime.",
                "As a result, stricter laws can reduce certain types of criminal activity."
              ]
            },
            {
              "side": "Social Programs",
              "reason": "Address root causes of crime",
              "examples": ["Youth mentorship", "Job training"],
              "connectors": ["Therefore", "Thus"],
              "sample_sentences": [
                "Therefore, providing youth with mentorship and educational programs can prevent criminal behavior.",
                "Thus, social programs can be more effective in reducing long-term crime rates."
              ]
            }
          ]
        },
        {
          "topic": "Globalization",
          "thesis": "Although globalization increases trade and cultural exchange, it can also lead to cultural homogenization and inequality.",
          "arguments": [
            {
              "side": "Advantages",
              "reason": "Economic growth and cultural exchange",
              "examples": ["Access to international markets", "Exposure to foreign cultures"],
              "connectors": ["For example", "Moreover"],
              "sample_sentences": [
                "For example, companies can sell products worldwide, boosting economic growth.",
                "Moreover, exposure to foreign cultures enriches local traditions and knowledge."
              ]
            },
            {
              "side": "Disadvantages",
              "reason": "Cultural loss and inequality",
              "examples": ["Small local businesses struggle", "Western culture dominates local traditions"],
              "connectors": ["However", "On the other hand"],
              "sample_sentences": [
                "However, small local businesses may struggle to compete with global brands.",
                "On the other hand, some local cultural practices may be overshadowed by Western influence."
              ]
            }
          ]
        },
        {
          "topic": "Youth and Society",
          "thesis": "Although modern youth face different challenges, society must adapt to support their development.",
          "arguments": [
            {
              "side": "Causes",
              "reason": "Technology and social media influence behavior",
              "examples": ["Online distractions", "Cyberbullying"],
              "connectors": ["Because of", "As a result"],
              "sample_sentences": [
                "Because of online distractions, some young people struggle to focus on studies.",
                "As a result, cyberbullying has become a serious social problem affecting youth."
              ]
            },
            {
              "side": "Solutions",
              "reason": "Education and guidance",
              "examples": ["Life skills classes", "Mentorship programs"],
              "connectors": ["Therefore", "Thus"],
              "sample_sentences": [
                "Therefore, schools should include life skills programs to prepare students for challenges.",
                "Thus, mentorship programs can guide youth to make responsible decisions."
              ]
            }
          ]
        },
        {
          "topic": "Media and Advertising",
          "thesis": "While advertising informs consumers, it often encourages unnecessary spending.",
          "arguments": [
            {
              "side": "Positive",
              "reason": "Provides product information",
              "examples": ["New product launches", "Promotional campaigns"],
              "connectors": ["For example", "Moreover"],
              "sample_sentences": [
                "For example, advertisements introduce new products and inform consumers about their features.",
                "Moreover, promotional campaigns can help customers find better deals."
              ]
            },
            {
              "side": "Negative",
              "reason": "Promotes consumerism",
              "examples": ["Impulse buying", "Focus on luxury items"],
              "connectors": ["However", "This leads to"],
              "sample_sentences": [
                "However, advertisements often encourage impulse buying, leading people to spend unnecessarily.",
                "This leads to a focus on luxury items rather than essential needs."
              ]
            }
          ]
        },
        {
          "topic": "Urbanization / City Life",
          "thesis": "Living in large cities offers convenience but also presents social and environmental challenges.",
          "arguments": [
            {
              "side": "Advantages",
              "reason": "Access to jobs and amenities",
              "examples": ["Better healthcare", "Cultural events"],
              "connectors": ["For instance", "Thus"],
              "sample_sentences": [
                "For instance, urban residents have access to advanced healthcare facilities.",
                "Thus, living in a city provides numerous professional and cultural opportunities."
              ]
            },
            {
              "side": "Disadvantages",
              "reason": "Pollution and overcrowding",
              "examples": ["Traffic congestion", "Air pollution"],
              "connectors": ["However", "On the other hand"],
              "sample_sentences": [
                "However, overcrowding can cause traffic congestion and stress.",
                "On the other hand, urban areas often suffer from higher levels of air pollution."
              ]
            }
          ]
        }
      ]
    },
    Discussion: {
      Intro: "The issue of whether [topic A] or [topic B] is more beneficial has sparked considerable debate. This essay will examine both perspectives before providing my own viewpoint.",
      Body1: "On the one hand, there are several reasons why people advocate for [View A]. The most prominent one is that [explain reason 1 for View A].",
      Body2: "On the other hand, those who support [View B] argue that [explain reason 1 for View B]. A compelling argument is that [explain reason 2 for View B].",
      Body3_Optional: "While both viewpoints have merit, it is important to consider [a third, nuanced perspective or a synthesis of ideas].",
      Conclusion: "In conclusion, while both sides of the argument have valid points, I am of the opinion that [your opinion]. This is because [briefly summarize your main reason].",
      MindMapTopics: [
        {
          "topic": "The benefits and drawbacks of globalization",
          "thesis": "Globalization presents both significant advantages in economic growth and cultural exchange, alongside notable disadvantages such as increased inequality and cultural homogenization.",
          "arguments": [
            {
              "side": "Benefits",
              "reason": "Promotes economic growth and efficiency",
              "examples": ["Access to wider markets", "Lower production costs"],
              "connectors": ["Firstly", "Moreover"]
            },
            {
              "side": "Drawbacks",
              "reason": "Leads to increased inequality and loss of local culture",
              "examples": ["Job displacement in developed countries", "Dominance of Western culture"],
              "connectors": ["However", "In contrast"]
            }
          ]
        }
      ]
    },
    ProblemSolution: {
      Intro: "In recent years, [the problem] has become a major issue affecting many people. This essay will explore the primary causes of this problem and propose some viable solutions.",
      Body1: "The main cause of [the problem] is undoubtedly [Cause 1]. This is because [explain the cause]. Another contributing factor is [Cause 2].",
      Body2: "To address this issue, several solutions can be implemented. Firstly, the government could [propose Solution 1]. Secondly, individuals have a role to play by [propose Solution 2].",
      Body3_Optional: "Beyond these, [an additional solution or a long-term implication] could also be considered to further alleviate the problem.",
      Conclusion: "In summary, [the problem] is a complex issue with multiple causes. However, by implementing the measures outlined above, it is possible to mitigate the situation effectively.",
      MindMapTopics: [
        {
          "topic": "Rising levels of plastic pollution",
          "thesis": "Plastic pollution is a severe environmental problem caused by excessive consumption and inadequate waste management, requiring both governmental regulation and individual responsibility as solutions.",
          "arguments": [
            {
              "side": "Causes",
              "reason": "Over-reliance on single-use plastics and poor recycling infrastructure",
              "examples": ["Plastic bags, bottles", "Lack of sorting facilities"],
              "connectors": ["Due to", "Consequently"]
            },
            {
              "side": "Solutions",
              "reason": "Governmental policies and individual behavioral changes",
              "examples": ["Bans on single-use plastics", "Promoting reusable alternatives"],
              "connectors": ["Therefore", "In addition"]
            }
          ]
        }
      ]
    },
    AdvantageDisadvantage: {
      Intro: "The trend towards [the topic] has both positive and negative aspects. This essay will discuss the main advantages and disadvantages of this development.",
      Body1: "The primary advantage of [the topic] is that [Advantage 1]. For instance, [provide an example]. Another benefit is that [Advantage 2].",
      Body2: "Despite these benefits, there are also significant drawbacks. The most serious disadvantage is that [Disadvantage 1]. Furthermore, [Disadvantage 2] is another point to consider.",
      Body3_Optional: "A further point to consider is [a third advantage/disadvantage or a balanced perspective on the overall impact].",
      Conclusion: "In conclusion, while [the topic] offers clear advantages in terms of [Advantage 1], the disadvantages, such as [Disadvantage 1], cannot be ignored. In my opinion, the benefits ultimately outweigh/do not outweigh the drawbacks.",
      MindMapTopics: [
        {
          "topic": "Working from home",
          "thesis": "While working from home offers significant advantages in flexibility and productivity, it also presents notable disadvantages concerning social isolation and work-life balance.",
          "arguments": [
            {
              "side": "Advantages",
              "reason": "Increased flexibility and reduced commuting stress",
              "examples": ["Better work-life balance", "Saving time and money"],
              "connectors": ["Firstly", "Moreover"]
            },
            {
              "side": "Disadvantages",
              "reason": "Potential for social isolation and blurred work-life boundaries",
              "examples": ["Lack of team interaction", "Difficulty disconnecting"],
              "connectors": ["However", "On the other hand"]
            }
          ]
        }
      ]
    },
    DoubleQuestion: {
      Intro: "The topic of [the general subject] raises several important questions. This essay will first address [the first question] and then discuss [the second question].",
      Body1: "Regarding the first question, [answer the first question directly]. The main reason for this is [provide a reason]. For example, [give an example].",
      Body2: "Turning to the second question, [answer the second question directly]. This is largely because [provide a reason]. A clear illustration of this is [give an example].",
      Conclusion: "In conclusion, the answers to these two questions are clear. [Briefly summarize answer 1], and [briefly summarize answer 2].",
      MindMapTopics: [
        {
          "topic": "Why are more people choosing to live alone, and what are the effects on society?",
          "thesis": "An increasing number of individuals are opting for solitary living due to changing social values and economic factors, which has both positive and negative effects on community structures and individual well-being.",
          "arguments": [
            {
              "side": "Reasons for living alone",
              "reason": "Increased personal freedom and career focus",
              "examples": ["Delayed marriage", "Higher disposable income"],
              "connectors": ["One reason is", "Furthermore"]
            },
            {
              "side": "Effects on society",
              "reason": "Reduced community engagement and potential for loneliness",
              "examples": ["Fewer family gatherings", "Increased demand for smaller housing units"],
              "connectors": ["Consequently", "In addition"]
            }
          ]
        }
      ]
    }
  }
};

export default IELTS;