





import React from 'react';
import { FaCar, FaGavel, FaClock, FaShieldAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#677f8e] to-[#8d9aa2] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="footer-section">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaCar className="mr-2" /> مزاد السيارات
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center"><FaGavel className="mr-2" /> مزادات حية</li>
            <li className="flex items-center"><FaClock className="mr-2" /> مزادات على مدار الساعة</li>
            <li className="flex items-center"><FaShieldAlt className="mr-2" /> ضمان الجودة</li>
          </ul>
        </div>
        <div className="footer-section">
          <h2 className="text-xl font-bold mb-4">روابط سريعة</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-300 transition duration-300">الصفحة الرئيسية</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">المزادات الحالية</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">كيفية المزايدة</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">بيع سيارتك</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">الأسئلة الشائعة</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2 className="text-xl font-bold mb-4">خدمات المزاد</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-300 transition duration-300">فحص السيارات</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">التمويل والتأمين</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">خدمة النقل</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">الضمان الممتد</a></li>
            <li><a href="#" className="hover:text-blue-300 transition duration-300">تقييم السيارات</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2 className="text-xl font-bold mb-4">تابعنا</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><FaFacebookF /></a>
            <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><FaTwitter /></a>
            <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><FaInstagram /></a>
            <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><FaLinkedinIn /></a>
          </div>
          <h2 className="text-xl font-bold mt-6 mb-2">اشترك في النشرة الإخبارية</h2>
          <div className="flex">
            <input type="email" placeholder="بريدك الإلكتروني" className="p-2 rounded-l-md w-full text-gray-800" />
            <button className="bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-r-md hover:bg-yellow-400 transition duration-300">اشترك</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-blue-400 pt-6">
        <div className="flex flex-wrap justify-between items-center">
          <p>&copy; 2024 مزاد موتورز. جميع الحقوق محفوظة.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-300 transition duration-300"> الشروط والأحكام </a>
            <a href="#" className="hover:text-blue-300 transition duration-300"> سياسة الخصوصية </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
