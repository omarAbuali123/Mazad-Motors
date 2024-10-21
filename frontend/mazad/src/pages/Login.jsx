import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import omarrImage from '../assets/omarr.webp'; 

const SocialButton = ({ icon }) => (
  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mr-2">
    {icon}
  </button>
);

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 mb-4 bg-gray-100 rounded"
  />
);

const ActionButton = ({ children, onClick, color, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full p-2 rounded text-white ${color} hover:opacity-90 transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.userId); 
        sessionStorage.setItem('email', email); 
        navigate('/sedan'); 
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'حدث خطأ ما. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
        <h1 className="text-3xl font-bold mb-6">تسجيل الدخول</h1>
        
        <div className="flex mb-4">
          <SocialButton icon="f" />
          <SocialButton icon="G+" />
          <SocialButton icon="in" />
        </div>
        
        <p className="mb-4 text-sm text-gray-600">أو استخدم حسابك</p>
        
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        
        <form onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mb-4 text-sm text-blue-600 cursor-pointer hover:underline">
            نسيت كلمة السر؟
          </p>
          <ActionButton color="bg-[#8EABBF]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'جاري المعالجة...' : 'تسجيل الدخول'}
          </ActionButton>
        </form>
        
        <p className="mt-4 text-sm text-center">
          ليس لديك حساب؟{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            إنشاء حساب
          </span>
        </p>
      </div>
      
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center"
        style={{
          backgroundImage: `url(${omarrImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">مرحباً، صديقي!</h2>
          <p className="mb-8">أدخل تفاصيلك الشخصية وابدأ رحلتك معنا</p>
          <ActionButton color="bg-transparent border border-white" onClick={() => navigate('/register')}>
            إنشاء حساب
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;