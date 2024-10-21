
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    const data = {
      email: email,     
      password: password  
  };
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', data);

            if (response.status === 200) {

        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('adminId', response.data._id); 
        sessionStorage.setItem('email', email); 


        navigate('/admin');
      }

        setMessage('Login successful!');
    } catch (error) {
        console.error('Error:', error.response ? error.response.data.message : error.message);
        setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
};








  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">تسجيل دخول المشرف</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
                      onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="أدخل كلمة المرور"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            تسجيل الدخول
          </button>
   {message && <p>{message}</p>}

        </form>
      </div>
    </div>
  );





};

export default AdminLoginPage;
