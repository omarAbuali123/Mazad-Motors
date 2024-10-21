


import React from 'react';
import { FaCar, FaUsers, FaHandshake, FaAward } from 'react-icons/fa';

const AboutUs = () => {
  const features = [
    { icon: <FaCar />, title: "مجموعة واسعة من السيارات", description: "نقدم مجموعة متنوعة من السيارات لتلبية جميع الأذواق والميزانيات" },
    { icon: <FaUsers />, title: "خدمة عملاء متميزة", description: "فريقنا متاح دائمًا لمساعدتك في جميع مراحل عملية المزاد" },
    { icon: <FaHandshake />, title: "عمليات آمنة وشفافة", description: "نضمن الشفافية والأمان في جميع معاملاتنا" },
    { icon: <FaAward />, title: "خبرة واسعة", description: "نتمتع بسنوات من الخبرة في مجال مزادات السيارات" },
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-300 to-[#000000] text-white py-12 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">من نحن</h1>
          <p className="text-xl">اكتشف قصة Mazad Motors وما يميزنا</p>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4">مرحبًا بكم في Mazad Motors</h2>
          <p className="text-lg mb-4">
            في Mazad Motors، نحن ملتزمون بتقديم تجربة مزاد سيارات سلسة ومثيرة. مع مجموعة واسعة من السيارات ومنصة سهلة الاستخدام، نضمن تجربة سلسة ومرضية لكل من المشترين والبائعين.
          </p>
          <p className="text-lg mb-4">
            هدفنا هو تسهيل عملية شراء وبيع السيارات، وتقديم منصة متطورة وموثوقة لمساعدتك في العثور على السيارة المثالية أو بيع سيارتك الحالية بأفضل الأسعار. نحن نؤمن بتوفير بيئة آمنة وشفافة لعملائنا ونفخر بخدمة عملائنا بتفانٍ واحترافية.
          </p>
          <p className="text-lg">
            انضم إلينا الآن واستمتع بتجربة مزاد لا مثيل لها حيث نسعى باستمرار لتحسين خدماتنا وتلبية احتياجاتك بأقصى قدر من التفاني.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl text-[#677f8e] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">؟Mazad Motors لماذا تختار </h2>
          <ul className="list-disc list-inside text-lg">
            <li className="mb-2">خبرة واسعة في مجال مزادات السيارات</li>
            <li className="mb-2">مجموعة متنوعة من السيارات لجميع الأذواق والميزانيات</li>
            <li className="mb-2">عملية مزايدة شفافة وعادلة</li>
            <li className="mb-2">دعم العملاء على مدار الساعة</li>
            <li>ضمان الجودة لجميع السيارات المعروضة</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;