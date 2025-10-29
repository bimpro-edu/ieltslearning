import React, { useState } from 'react';

const educationData = [
  {
    title: 'Example 1: The Role of Technology in Education',
    example: `
      <p>The integration of technology in education has revolutionized the learning process. For instance, online learning platforms now offer a plethora of courses, making education accessible to a global audience. Interactive whiteboards and tablets have replaced traditional blackboards, fostering a more engaging and dynamic classroom environment. Furthermore, educational software and applications provide personalized learning experiences, catering to individual student needs and paces. This technological shift not only enhances the delivery of information but also equips students with essential digital literacy skills for the future.</p>
    `,
    tips: [
      "Start with a clear topic sentence that introduces the main idea.",
      "Use specific examples to support your points (e.g., online platforms, interactive whiteboards).",
      "Vary your sentence structure to make the text more engaging.",
      "Conclude with a summary of the main points and a look towards the future."
    ],
    mistakes: [
      "Overusing technical jargon without explanation.",
      "Lack of clear connection between the examples and the main argument.",
      "Poor paragraph structure, with multiple ideas in one paragraph.",
      "Grammatical errors and typos that detract from the quality of the writing."
    ],
    predictions: [
      "The use of AI-powered tutors will become more widespread.",
      "Virtual and augmented reality will be used to create immersive learning experiences.",
      "The curriculum will need to be constantly updated to keep pace with technological advancements.",
      "There will be a greater emphasis on teaching critical thinking and problem-solving skills."
    ]
  },
  {
    title: 'Example 2: The Importance of Early Childhood Education',
    example: `
      <p>Early childhood education plays a crucial role in the cognitive and social development of children. Preschool programs, for example, provide a structured environment where children can learn foundational skills such as literacy and numeracy. Moreover, interacting with peers and teachers helps them develop social skills like sharing, cooperation, and empathy. Studies have shown that children who attend high-quality preschool programs are more likely to succeed in school and have better long-term life outcomes. Therefore, investing in early childhood education is not just beneficial for individual children, but for society as a whole.</p>
    `,
    tips: [
      "Clearly state the importance of the topic in the introduction.",
      "Use evidence or research findings to support your claims.",
      "Focus on both cognitive and social aspects of development.",
      "End with a strong concluding statement that summarizes the main argument."
    ],
    mistakes: [
      "Making generalizations without providing specific examples.",
      "Failing to explain the long-term benefits of early childhood education.",
      "Using emotional language instead of objective arguments.",
      "Ignoring the role of parents and family in a child's development."
    ],
    predictions: [
      "There will be a greater push for universal access to preschool.",
      "The curriculum will become more play-based and child-centered.",
      "There will be an increased focus on training and professional development for early childhood educators.",
      "Technology will be used to supplement, but not replace, traditional teaching methods."
    ]
  },
  {
    title: 'Example 3: The Pros and Cons of Homeschooling',
    example: `
      <p>Homeschooling, a growing educational trend, offers both advantages and disadvantages. On one hand, it provides a flexible and personalized learning environment. Parents can tailor the curriculum to their child's interests and learning style, and the schedule can be adapted to fit the family's needs. On the other hand, homeschooling can lead to social isolation, as children may have limited opportunities to interact with their peers. Additionally, parents may not have the expertise or resources to teach all subjects effectively. Therefore, the decision to homeschool should be made after careful consideration of both the potential benefits and drawbacks.</p>
    `,
    tips: [
      "Present both sides of the argument in a balanced way.",
      "Use transition words and phrases to clearly signal the shift between pros and cons.",
      "Provide specific examples for both advantages and disadvantages.",
      "Conclude with a neutral statement that summarizes the complexity of the issue."
    ],
    mistakes: [
      "Showing a clear bias towards one side of the argument.",
      "Not providing enough detail or examples to support the points.",
      "Poor organization, making it difficult to follow the argument.",
      "Failing to address the potential challenges of homeschooling for parents."
    ],
    predictions: [
      "The number of families choosing to homeschool will continue to grow.",
      "There will be more resources and support networks available for homeschooling families.",
      "Hybrid models, combining homeschooling with part-time attendance at a traditional school, will become more popular.",
      "There will be ongoing debate about the regulation and oversight of homeschooling."
    ]
  }
];

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const activeContent = educationData[activeTab];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Education</h1>

      <div className="flex border-b">
        {educationData.map((item, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${activeTab === index ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {`Example ${index + 1}`}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">{activeContent.title}</h2>
        <div className="mt-2" dangerouslySetInnerHTML={{ __html: activeContent.example }} />

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Tips</h3>
          <ul className="list-disc list-inside">
            {activeContent.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Mistakes</h3>
          <ul className="list-disc list-inside">
            {activeContent.mistakes.map((mistake, index) => (
              <li key={index}>{mistake}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Predictions</h3>
          <ul className="list-disc list-inside">
            {activeContent.predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
