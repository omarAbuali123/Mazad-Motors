import React from 'react';
import { FaGavel, FaCar, FaShieldAlt, FaFileContract } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#7c9cb4] mb-8">الشروط والأحكام</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaGavel className="text-3xl text-[#7c9cb4] mr-3" />
            <h2 className="text-2xl font-semibold">مقدمة</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            نحيطك علماً بأن اللوائح والقوانين التي تتضمنها هذه الاتفاقية لا يمكن استخدامها ضد "Mazad Motors"، بل يُرجع إليها كاتفاقية تحكم العلاقة بين جميع الأطراف ذات العلاقة بالموقع. تنصح "Mazad Motors" كافة المشتركين والأعضاء بقراءة اللوائح والقوانين التي تحكم علاقتها بعملاءها.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaCar className="text-3xl text-[#7c9cb4] mr-3" />
            <h2 className="text-2xl font-semibold">الشروط العامة</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>على جميع المشتركين فحص السيارة المراد شراؤها جيداً والتأكد من مطابقة المواصفات المعروضة قبل المزاودة عليها.</li>
            <li>على الراغبين بالمشاركة في مزادات شراء المركبات إيداع مبلغ تأمين.</li>
            <li>يجب على كل راغب في الشراء القيام بتسجيل بياناته واختيار اسم مستخدم وكلمة مرور خاصة به.</li>
            <li>أي مزايدة تتم على أي مركبة في آخر 5 دقائق من وقت انتهاء المزاد سوف تؤدي إلى زيادة وقت المزاد بمعدل 5-1 دقائق في كل مرة.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-3xl text-[#7c9cb4] mr-3" />
            <h2 className="text-2xl font-semibold">التعليمات والقيود</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>عدم انتهاك أية قوانين أو حقوق أو اتفاقيات أي طرف من الأطراف.</li>
            <li>إتمام عملية دفع قيمة المركبات التي قمت بشرائها.</li>
            <li>عدم التلاعب بما يخص المزاد من أسعار أو لوائح، والالتزام بعدم التحايل على سير المزادات.</li>
            <li>عدم نشر معلومات مغلوطة أو غير صحيحة أو مضللة.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaFileContract className="text-3xl text-[#7c9cb4] mr-3" />
            <h2 className="text-2xl font-semibold">سياسة الخصوصية والاسترجاع</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            تخضع كافة معلوماتك لدى "Mazad Motors" للخصوصية. لا يجوز استرجاع النقود مقابل إرجاع المركبات المشتراة.
          </p>
          <p className="text-gray-700 leading-relaxed">
            للمزيد من المعلومات أو للتواصل معنا، يرجى زيارة صفحة "اتصل بنا".
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;