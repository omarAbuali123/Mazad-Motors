import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaSearch, FaPhoneAlt, FaFileContract, FaUserCircle } from 'react-icons/fa';
const Header = ({ onCategoryChange }) => {
  const navigate = useNavigate();








const handleLogout = () => {
  const status = window.confirm('هل أنت متأكد أنك تريد الخروج؟');
  
    if (!status) {
      return;
    }

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('adminId');

  navigate('/AdminLoginPage'); 
};






  return (
    <header className="bg-gradient-to-r from-[#758e9d] to-[rgb(62,122,157)] text-white shadow-lg sticky top-0 z-[1000]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/admin" className="flex items-center space-x-2">
            <FaCar className="text-3xl" />
            <span className="text-2xl font-bold">Admin Page</span>
          </Link>

          <nav className="hidden md:flex space-x-6 items-center">




            <Link to="/ReviewNewItem" className="hover:text-blue-200 transition">الموافقة على السيارات الجديدة</Link>
            <Link to="/allusers" className="hover:text-blue-200 transition">جميع المستخدمين</Link>
            <Link to="/allcars" className="hover:text-blue-200 transition">جميع السيارات</Link>
            <Link to="/userlist" className="hover:text-blue-200 transition">عرض/حذف المستخدمين</Link>
            <Link to="/admin" className="hover:text-blue-200 transition">الصفحة الرئيسية</Link>
            <div className="">
      <button className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-700" onClick={handleLogout}>تسجيل الخروج</button>
    </div>
          </nav>


          <button className="md:hidden text-2xl">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
