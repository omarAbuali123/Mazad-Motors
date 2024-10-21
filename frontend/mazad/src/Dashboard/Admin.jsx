

import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';

import Header from '../Component/HeaderAdmin';




const Admin = () => {
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
    <main className="main">
      <Header/>
    <div className="flex bg-gray-100 min-h-screen">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">نظرة عامة على اليوم</h2>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">هذا الأسبوع</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">الأرشيف</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">إحصائيات المزاد</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-100 p-4 rounded">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-600">المزادات النشطة</p>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <p className="text-2xl font-bold">$123,456</p>
                <p className="text-sm text-gray-600">إجمالي العروض</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">المهام المعلقة</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>مراجعة تسجيلات المستخدمين الجديدة</span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">عاجل</span>
              </li>
              <li className="flex items-center justify-between">
                <span>الموافقة على قوائم المركبات الجديدة</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">معلق</span>
              </li>
              <li className="flex items-center justify-between">
                <span>تحديث المزادات المميزة</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">قيد التنفيذ</span>
              </li>
            </ul>
          </div>
        </div>


        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/userList" className="bg-blue-500 text-white p-3 rounded text-center hover:bg-blue-600">عرض/حذف المستخدمين</Link>
            <Link to="/categoryManagement" className="bg-green-500 text-white p-3 rounded text-center hover:bg-green-600">إضافة/حذف الفئات</Link>
            <Link to="/itemManagement" className="bg-yellow-500 text-white p-3 rounded text-center hover:bg-yellow-600">إدارة عناصر المستخدمين</Link>
            <Link to="/ReviewNewItem" className="bg-purple-500 text-white p-3 rounded  hover:bg-purple-600">مراجعة العناصر الجديدة</Link>
          </div>
        </div>
      </main>
    </div>
    </main>
  );
};

export default Admin;

