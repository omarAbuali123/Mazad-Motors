

import React from 'react';
import { FaCalendarAlt, FaAngleRight } from 'react-icons/fa';


const cardClasses = "bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105";
const titleClasses = "text-2xl font-semibold mb-3 text-primary";
const dateClasses = "text-gray-500 mb-4 text-sm flex items-center";
const contentClasses = "text-gray-700 mb-4";
const readMoreClasses = "text-secondary font-semibold flex items-center hover:text-secondary-dark transition-colors duration-300";

const NewsCard = ({ title, date, content }) => {
  return (
    <div className={cardClasses}>
      <h3 className={titleClasses}>{title}</h3>
      <p className={dateClasses}>
        <FaCalendarAlt className="mr-2" />
        {date}
      </p>
      <p className={contentClasses}>{content.substring(0, 150)}...</p>
      <a href="#" className={readMoreClasses}>
        اقرأ المزيد <FaAngleRight className="ml-1" />
      </a>
    </div>
  );
};

const NewsSection = () => {
  return (
    <section className="py-16 bg-[#e6edf1]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">الأخبار والمقالات</h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <NewsCard
            title="نتائج مزاد أغسطس 2024: أرقام قياسية جديدة"
            date="1/8/2024"
            content="في أحدث مزاد للسيارات الذي أقيم في أغسطس 2024، تم بيع العديد من السيارات النادرة بأسعار تفوق التوقعات. حقق المزاد رقمًا قياسيًا جديدًا لأعلى سعر مدفوع مقابل سيارة كلاسيكية نادرة..."
          />
          <NewsCard
            title="تغييرات جديدة في سياسة المزاد: ما تحتاج إلى معرفته"
            date="25/7/2024"
            content="أعلنت إدارة المزاد عن تغييرات جديدة في سياسات المزاد بدءًا من سبتمبر 2024. تشمل التغييرات الجديدة رسوم التسجيل وإجراءات الدفع وأوقات المزاد..."
          />
          <NewsCard
            title="كيفية اختيار السيارة المناسبة في المزادات؟"
            date="20/7/2024"
            content="اختيار السيارة المثالية من المزاد يمكن أن يكون عملية معقدة. تعلم كيفية تقييم حالة السيارة وقراءة تقارير الفحص والتحقق من تاريخ السيارة قبل اتخاذ قرار الشراء..."
          />
          <NewsCard
            title="نصائح للمشترين الجدد في عالم المزادات"
            date="15/7/2024"
            content="إذا كنت تخطط للمشاركة في مزاد للمرة الأولى، فقد تحتاج إلى بعض النصائح لضمان تجربة ناجحة. تعلم كيفية الاستعداد للمزاد والتحضير الذهني والتفاوض بذكاء..."
          />
          <NewsCard
            title="الأخطاء الشائعة التي يرتكبها المبتدئون في المزادات"
            date="10/7/2024"
            content="قد يرتكب المبتدئون العديد من الأخطاء عند المشاركة في المزادات، مما قد يؤثر سلبًا على تجربتهم. تعرف على الأخطاء الشائعة وكيفية تجنبها لضمان نجاحك في عالم المزادات..."
          />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;