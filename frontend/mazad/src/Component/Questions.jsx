


import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg">
      <button
        className="w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-primary">{question}</h2>
        {isOpen ? <FaChevronUp className="text-secondary" /> : <FaChevronDown className="text-secondary" />}
      </button>
      {isOpen && (
        <p className="mt-4 text-gray-700 animate-fadeIn">
          {answer}
        </p>
      )}
    </div>
  );
};

const Questions = () => {
  const faqs = [
    {
      question: 'ما هو مزاد مزاد؟ كيف يعمل؟',
      answer: 'وجهتك الشاملة لمزادات السيارات في السوق. ابحث عن السيارات المعروضة للبيع، شاهد العروض، وقم بالمزايدة على السيارات حتى تصبح ملكك 100%. منصة مزاد مفتوحة لجميع أنواع المركبات، من السيدان والدفع الرباعي والشاحنات والمركبات الثقيلة. نعتبر أنفسنا الخيار الأفضل.',
    },
    {
      question: 'هل أحتاج إلى رخصة تاجر للانضمام إلى مزاد "مزاد"؟',
      answer: 'لا تحتاج إلى رخصة تاجر سيارات للانضمام إلى مزاد "مزاد" وبدء المزايدة على مخزون مزاد السيارات الشامل من Copart.',
    },
    {
      question: 'ما هي أنواع السيارات التي يبيعها مزاد "مزاد"؟',
      answer: 'هناك أكثر من 30,000 مركبة معروضة للبيع يوميًا، اعثر على شيء للجميع.',
    },
    {
      question: 'كيف يمكنني المزايدة على السيارات في مزادات مزاد؟',
      answer: 'اجعل المزايدة سهلة. ابدأ المزايدة على سيارات المزاد اليوم.',
    },
    {
      question: 'كيف تعمل المزادات المباشرة عبر الإنترنت في مزاد مزاد؟',
      answer: 'أكثر من 240 مزادًا مفتوحًا أسبوعيًا للعملاء.',
    },
    {
      question: 'هل يمكنني معاينة السيارات قبل المزايدة في مزاد مزاد؟',
      answer: 'نريدك أن تشتري السيارات المستعملة بثقة.',
    },
  ];

  return (
    <section className="py-16 bg-[#e6edf1]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center text-primary">الأسئلة الشائعة حول شراء سيارات المزاد</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;