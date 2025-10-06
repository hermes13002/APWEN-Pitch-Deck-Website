import { useState } from 'react';

const faqData = [
  {
    question: 'Can I register alone or do I need a team?',
    answer: 'You need a team of at least 2 and a maximum of 4 LASU students to register.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, registration and participation are completely free.',
  },
  {
    question: 'Who can participate in the competition?',
    answer: 'Only current students of Lagos State University (LASU) from the engineering faculty are eligible.',
  },
  {
    question: 'What should the proposal include?',
    answer: 'Your proposal must include: Title, Aim & Objectives, Problem Statement, Proposed Solution, Project Type, Expected Impact, and Project Importance (100 words max).',
  },
  {
    question: 'What are the judging criteria for the proposal stage?',
    answer: 'Proposals will be judged on clarity, innovation, feasibility, impact, relevance to theme, and presentation quality.',
  },
  {
    question: 'What happens after the proposal is submitted?',
    answer: 'Proposals will be reviewed, and at least 5 teams will be shortlisted for the online judging phase.',
  },
  {
    question: 'Will there be check-ins?',
    answer: 'Yes, selected teams will have check-ins and support before the final presentation.',
  }
];


const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="FAQ" className="px-4 py-10 md:px-20 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold font-orbitron text-center mb-3">FAQs</h2>
      <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md p-4 cursor-pointer transition-all duration-300 hover:shadow"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold font-orbitron">{faq.question}</h3>
              <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-200 font-ubuntu">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
