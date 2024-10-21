import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import Header from '../Component/HeaderAdmin';


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {

    const deleteUsers = window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟');
  
    if (!deleteUsers) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`); 
      setUsers(users.filter(user => user._id !== id));
    }
     catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditForm(true); 
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const EditUser = window.confirm('هل أنت متأكد أنك تريد التعديل على هذا المستخدم؟');
  
    if (!EditUser) {
      return;
    }
    
    try {

      const response = await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, selectedUser);
        console.log(response.status)
        console.log(selectedUser._id)
      if (response.status === 200) {
        alert('User updated successfully');
        setShowEditForm(false);

        const updatedUsers = users.map(user =>
          user._id === selectedUser._id ? selectedUser : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  return (
    
    <main className="main">
      <Header/>
    <div className=" bg-gray-100 min-h-screen max-w-full">
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
        <h1 className="text-2xl font-bold text-gray-800 p-6 bg-gray-200 text-center">جميع المستخدمين</h1>
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">اسم المستخدم</th>
                <th className="py-3 px-6 text-left">البريد الإلكتروني</th>
                <th className="py-3 px-6 text-left">رقم الهاتف</th>
                <th className="py-3 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map(user => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user._id}</td>
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.phone}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 ml-3 text-base"
                      onClick={() => deleteUser(user._id)} 
                    >
                      حذف
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700 ml-3 text-base"
                      onClick={() => handleEdit(user)} 
                    >
                      تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditForm && (
          <div className="edit-form p-4">
            <h2 className="text-lg font-semibold">تعديل المستخدم</h2>
            <form onSubmit={handleUpdateUser}>
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                placeholder="اسم المستخدم"
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                placeholder="البريد الإلكتروني"
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                value={selectedUser.phone}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                placeholder="رقم الهاتف"
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="password"
                onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                placeholder="تعديل كلمة المرور"
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <button type="submit" className="bg-green-500 text-white p-2 rounded">تحديث</button>
              <button type="button" onClick={() => setShowEditForm(false)} className="bg-red-500 text-white p-2 rounded ml-2">إلغاء</button>
            </form>
          </div>
        )}
      </div>
    </div>
    </main>
  );
};


export default AllUsers;
