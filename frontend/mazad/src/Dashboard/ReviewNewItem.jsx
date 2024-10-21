
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import Header from '../Component/HeaderAdmin';


const AdminPage = () => {
    const [pendingCars, setPendingCars] = useState([]);
    const [users, setUsers] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState({}); 
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
        const fetchPendingCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pending-cars');
                const data = await response.json();
                setPendingCars(data);
       
                const initialIndices = {};
                data.forEach(car => {
                    initialIndices[car._id] = 0;
                });
                setCurrentImageIndex(initialIndices);
            } catch (error) {
                console.error('حدث خطأ أثناء جلب السيارات المعلقة:', error);
            }
        };

        fetchPendingCars();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users');
                const data = await response.json();
                const userObject = data.reduce((acc, user) => {
                    acc[user._id] = user.name;
                    return acc;
                }, {});
                setUsers(userObject);
            } catch (error) {
                console.error('حدث خطأ أثناء جلب المستخدمين:', error);
            }
        };

        fetchUsers();
    }, []);
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm('هل أنت متأكد أنك تريد حذف هذه السيارة؟');
        
        if (!confirmDelete) {
            return;
        }
        
        try {
            console.log("Deleting user with id = ", id); 
            const response = await fetch(`http://localhost:3000/api/pending-cars/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                const errorData = await response.json(); 
                console.error(`Error deleting user: ${errorData.message || response.statusText}`);
                throw new Error('Error deleting user');
            }
            
            console.log("User deleted successfully");
            

            setPendingCars(prevUsers => prevUsers.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const deleteUserAfteerAdd = async (id) => {
   
        try {
            console.log("Deleting user with id = ", id); 
            const response = await fetch(`http://localhost:3000/api/pending-cars/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error deleting user: ${errorData.message || response.statusText}`);
                throw new Error('Error deleting user');
            }
            
            console.log("User deleted successfully");
            
 
            setPendingCars(prevUsers => prevUsers.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    const addCarToApprovedList = async (carData) => {
     
        try {
            const response = await fetch('http://localhost:3000/api/car-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Car added to approved list:', data);
        } catch (error) {
            console.error('Error adding car to approved list:', error);

        }
    };

    const handleApproveClick = async (car) => {
        const confirmDelete = window.confirm('هل أنت متأكد أنك تريد اضافة هذه السيارة؟');
        
        if (!confirmDelete) {
            
            return;
        }
        
        const carData = {
            brand: car.brand,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            condition: car.condition,
            category: car.category,
            images: car.images,
            userId: car.userId,
            isApproved: true,
            startingBidPrice: car.startingBidPrice,
            auctionStartTime: car.auctionStartTime, 
            auctionEndTime: car.auctionEndTime, 
        };

        await addCarToApprovedList(carData);
        await deleteUserAfteerAdd(car._id);
    };

    const rejectCar = async (carId) => {
        try {
            await axios.delete(`/api/cars-listings/${carId}`);
            setPendingCars(pendingCars.filter(car => car._id !== carId));
        } catch (error) {
            console.error('حدث خطأ أثناء رفض السيارة:', error);
        }
    };

    const handlePrevImage = (carId) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [carId]: prev[carId] > 0 ? prev[carId] - 1 : pendingCars.find(car => car._id === carId).images.length - 1,
        }));
    };

    const handleNextImage = (carId) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [carId]: (prev[carId] + 1) % pendingCars.find(car => car._id === carId).images.length,
        }));
    };

    return (
        <main className="main">
      <Header/>
        <div  className="max-w-full bg-gray-100 min-h-screen">
  
            {pendingCars.map(car => {
                return (
                    <div key={car._id} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                        <h1 className="text-3xl font-bold text-center p-6 bg-[#7c9cb4] text-white">السيارات المعلقة</h1>
                        
                        <div className="flex mt-4 p-4">
                            <div className="flex-shrink-0">
                                {car.images && car.images.length > 0 ? (
                                    <div className="relative">
                                        <img
                                            src={`http://localhost:3000/uploads/${car.images[currentImageIndex[car._id]]}`}
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-96 h-64 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <button className="bg-gradient-to-l from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300" onClick={() => handlePrevImage(car._id)}>
                                                &#8592;
                                            </button>
                                            <button className="bg-gradient-to-r from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300" onClick={() => handleNextImage(car._id)}>
                                                &#8594; 
                                            </button>
                                        </div>
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
                                            <span>{currentImageIndex[car._id] + 1}</span> / <span>{car.images.length}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">لا توجد صور متاحة</p>
                                )}
                            </div>
                            <div className="flex-grow ml-4">
                                <table className="min-w-full" dir='rtl'>
                                    <tbody>
                                        <tr>
                                            <td className="py-2">اسم السيارة: {car.brand} {car.model}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">الفئة: {car.category}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">سنة الصنع: {car.year}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">المسافة المقطوعة: {car.mileage}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">الحالة: {car.condition}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">مالك السيارة: {users[car.userId] || 'جارٍ التحميل...'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">
                                                <button 
                                                    onClick={() => handleApproveClick(car)}
                                                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
                                                >
                                                    اعتماد
                                                </button>
                                                <button 
                                                    onClick={() => deleteUser(car._id)} 
                                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 ml-2"
                                                >
                                                    رفض
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        </main>
    );
};

export default AdminPage;
