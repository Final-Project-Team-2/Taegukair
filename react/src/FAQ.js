// src/components/FAQ.js
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: '1. 여름 할인 프로모션은 언제까지 진행되나요?',
      answer: '여름 할인 프로모션은 2024년 8월 31일까지 진행됩니다.'
    },
    {
      question: '2. 새로운 항공편은 언제 추가되나요?',
      answer: '새로운 항공편은 2024년 7월 15일부터 추가됩니다.'
    },
    {
      question: '3. 고객의 말씀 게시판은 어떻게 이용하나요?',
      answer: '고객의 말씀 게시판은 로그인 후 이용하실 수 있습니다. 로그인 후 "고객의 말씀" 메뉴에서 작성 및 조회가 가능합니다.'
    }
  ];

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h2>자주 묻는 질문</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => handleClick(index)}>
            {faq.question}
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
