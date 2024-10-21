
import React, { useState } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API_URL = 'http://localhost:3000';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      console.log('Form submitted:', response.data);
      toast.success(response.data.message || 'تم إرسال رسالتك بنجاح');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      let errorMessage = 'حدث خطأ أثناء إرسال الرسالة';
      if (error.response) {
        errorMessage = `خطأ من الخادم: ${error.response.status} ${error.response.data.message || ''}`;
      } else if (error.request) {
        errorMessage = 'لم يتم استلام رد من الخادم. تأكد من تشغيل الخادم وإمكانية الوصول إليه.';
      } else {
        errorMessage = `خطأ في إعداد الطلب: ${error.message}`;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#7c9cb4] mb-8">اتصل بنا</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          <div className="md:w-1/2 p-8 bg-[#7c9cb4] text-white">
            <h2 className="text-3xl font-semibold mb-4">Mazad Motors</h2>
            <p className="mb-6 text-blue-100">نحن هنا لمساعدتك في جميع استفساراتك حول مزادات السيارات.</p>
            
            <div className="flex items-center mb-4">
              <FaPhone className="ml-4 text-xl" />
              <p>+962 1234 5678</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="ml-4 text-xl" />
              <p>info@mazadmotors.com</p>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="ml-4 text-xl" />
              <p>المنطقه الحره، الزرقاء، الأردن</p>
            </div>
            
            <div className="mt-8">
              <FaCar className="text-6xl opacity-50" />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold mb-4">أرسل لنا رسالة</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">الاسم</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">الموضوع</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">الرسالة</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="font-sans text-lg bg-gradient-to-b from-[#4dc7d9] to-[#66a6ff] text-white py-2 px-4 flex items-center justify-center rounded-full shadow-md transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-lg active:scale-95 active:shadow-sm"
              disabled={isSubmitting}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 ml-2 transition-all duration-300 hover:bg-opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="transition-transform duration-300 hover:rotate-45">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div>
              <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال'}</span>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" rtl={true} />
    </div>
  );
};

export default ContactPage;
