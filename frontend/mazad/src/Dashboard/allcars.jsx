import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import Header from '../Component/HeaderAdmin';


const AllCars = () => {
  const [cars, setCars] = useState([]); 
  const [selectedCar, setSelectedCar] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({}); 
  const [users, setUsers] = useState({});
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
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/car-listings'); 
        const dataimage = await response.data;
        
        setCars(response.data);
        const initialIndices = {};
        dataimage.forEach(car => {
            initialIndices[car._id] = 0; 
        });
        setCurrentImageIndex(initialIndices);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
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
  // حذف سيارة
  const deleteCar = async (id) => {
    const deleteConfirmation = window.confirm('هل أنت متأكد أنك تريد حذف هذه السيارة؟');
    if (!deleteConfirmation) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/car-listings/${id}`); 
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };


  const handleEdit = (car) => {
    setSelectedCar(car); 
    setShowEditForm(true);
  };


  const handleUpdateCar = async (e) => {
    e.preventDefault();
    const editConfirmation = window.confirm('هل أنت متأكد أنك تريد التعديل على هذه السيارة؟');
    if (!editConfirmation) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/car-listings/${selectedCar._id}`, selectedCar); // تعديل رابط API للتحديث
      if (response.status === 200) {
        alert('تم تعديل السيارة بنجاح');
        setShowEditForm(false); 
     
        const updatedCars = cars.map(car =>
          car._id === selectedCar._id ? selectedCar : car
        );
        setCars(updatedCars);
      }
    } catch (error) {
      console.error('Error updating car:', error);
      alert('فشل تعديل السيارة');
    }
  };





  const handlePrevImage = (carId) => {
    setCurrentImageIndex((prev) => ({
        ...prev,
        [carId]: prev[carId] > 0 ? prev[carId] - 1 : cars.find(car => car._id === carId).images.length - 1,
    }));
};

const handleNextImage = (carId) => {
    setCurrentImageIndex((prev) => ({
        ...prev,
        [carId]: (prev[carId] + 1) % cars.find(car => car._id === carId).images.length,
    }));
};






  return (
    <main className="main">
      <Header/>
    <div className="max-w-full bg-gray-100 min-h-screen">

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
       
        <h1 className="text-2xl font-bold text-gray-800 p-6 bg-gray-200 text-center">جميع السيارات</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">مالك السيارة</th>
                <th className="py-3 px-6 text-left">الاسم</th>
                <th className="py-3 px-6 text-left">الموديل</th>
                <th className="py-3 px-6 text-left">السعر</th>
                <th className="py-3 px-6 text-center">الصور</th>
                <th className="py-3 px-6 text-center">الاجراء</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light ">
              {cars.map(car => (
                <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100 space-y-2">
                  {/* <td className="py-3 px-6 text-left whitespace-nowrap">{car._id}</td> */}
                  <td className="py-3 px-6 text-left whitespace-nowrap"> {users[car.userId] }</td>

                  <td className="py-3 px-6 text-left">{car.brand}</td>
                  <td className="py-3 px-6 text-left">{car.model}</td>
                  <td className="py-3 px-6 text-left">{car.startingBidPrice}</td>
                <td>
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
                </td>
                  <td className="py-3 px-6 text-center">
                    <button
                     className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 ml-2"
                      onClick={() => deleteCar(car._id)} 
                    >
                      حذف
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

export default AllCars;
