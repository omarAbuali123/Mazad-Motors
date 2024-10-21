
import React, { useState, useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import Header from '../Component/HeaderAdmin';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pending-users'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []); 
  




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




const deleteUser = async (id) => {
  const confirmDelete = window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟');
  
    if (!confirmDelete) {
      return;
    }
  try {
    console.log("Deleting user with id = ", id);
    const response = await fetch(`http://localhost:3000/api/pending-users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error(`Error deleting user: ${errorData.message || response.statusText}`);
      throw new Error('Error deleting user');
    }

    console.log("User deleted successfully");

 
    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};



const deleteUserAfterAdd = async (id) => {
  

  try {
    console.log("Deleting user with id = ", id);
    const response = await fetch(`http://localhost:3000/api/pending-users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error(`Error deleting user: ${errorData.message || response.statusText}`);
      throw new Error('Error deleting user');
    }

    console.log("User deleted successfully");


    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}






const addUserToApprovedList = async (id) => {
  const confirmDelete = window.confirm('هل أنت متأكد أنك تريد اضافه هذا المستخدم؟');
  
    if (!confirmDelete) {
      return;
    }
  try {
    const userToAdd = users.find(user => user._id === id);

    if (!userToAdd) {
      console.error("User not found in pending users");
      return;
    }

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userToAdd.name,
        email: userToAdd.email,
        phone: userToAdd.phone,
        password: userToAdd.password, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error adding user to approved list: ${errorData.message || response.statusText}`);
      throw new Error('Error adding user to approved list');
    }

    console.log("User added to approved list successfully");

    await deleteUserAfterAdd(id);

    await fetchUsers();

    
  } catch (error) {
    console.error('Error adding user to approved list:', error);
  }
};










  return (

<main className="main">
      <Header/>
    <div className="max-w-full bg-gray-100 min-h-screen ">

     
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
<h1 className="text-2xl font-bold text-gray-800 p-6 bg-gray-200 text-center"> قائمة انتظار المستخدمين</h1>
<div className="overflow-x-auto">
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
               className="text-red-500 hover:text-red-700"
               onClick={() => deleteUser(user._id)} 
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path
                   fillRule="evenodd"
                   d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                   clipRule="evenodd"
                 />
               </svg>
             </button>
             <button
className="text-green-500 hover:text-green-700"
onClick={() => addUserToApprovedList(user._id)} 
>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
<path
  fillRule="evenodd"
  d="M7 10l3 3 7-7-1.414-1.414L10 10.586 8.414 9 7 10z"
  clipRule="evenodd"
/>
</svg>
</button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


</div> 





   
    </div>
    </main>
  );
};

export default UserList;




