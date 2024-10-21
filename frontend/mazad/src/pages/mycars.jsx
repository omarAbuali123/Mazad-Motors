import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Header from '../Component/Header';
const MyCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);  
  const userId = queryParams.get('userId'); 
  const [items, setItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({}); 

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/car-listings/user/${userId}`);
        const userCars = response.data.map(car => ({
          id: car._id,
          type: car.category,
          images: car.images.length > 0 ? car.images.map(image => `${image}`) : ['http://localhost:3000/uploads/default-image.png'],
          title: car.model,
          description: {
            brand: car.brand,
            year: car.year,
            mileage: car.mileage,
            condition: car.condition,
          },
        }));
        setItems(userCars);
        const initialImageIndexes = userCars.reduce((acc, car) => {
          acc[car.id] = 0; 
          return acc;
        }, {});
        setCurrentImageIndex(initialImageIndexes);

      } catch (error) {
        console.error('Error fetching user cars:', error.response ? error.response.data : error.message);
      }
    };

    if (userId) {
      fetchUserCars();
    }
  }, [userId]);



  const handleCategoryChange = (category) => {
    console.log("فئة جديدة:", category);
  };










  
  const handleDeleteCar = async (id) => {
    const confirmDelete = window.confirm('هل أنت متأكد أنك تريد حذف هذه السيارة؟');
    
    if (!confirmDelete) {
        return;
    }
    
    try {
        console.log("Deleting user with id = ", id); 
        const response = await fetch(`http://localhost:3000/api/car-listings/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error deleting user: ${errorData.message || response.statusText}`);
            throw new Error('Error deleting user');
        }
        
        console.log("User deleted successfully");
        

        window.location.reload(); 
    

    } catch (error) {
        console.error('Error deleting user:', error);
    }
};



  const handleCardClick = (itemId) => {
    const id = localStorage.getItem('userId'); 
    navigate(`/detailPage?userId=${id}`); 
  };
  const handleNextImage = (carId) => {
    setCurrentImageIndex(prevIndex => ({
      ...prevIndex,
      [carId]: (prevIndex[carId] + 1) % items.find(item => item.id === carId).images.length
    }));
  };

  const handlePrevImage = (carId) => {
    setCurrentImageIndex(prevIndex => ({
      ...prevIndex,
      [carId]: (prevIndex[carId] - 1 + items.find(item => item.id === carId).images.length) % items.find(item => item.id === carId).images.length
    }));
  };

  return (
    <main className="main">
      <Header onCategoryChange={handleCategoryChange} />
      <div className="container mx-auto px-4 mt-10 mb-4  min-h-screen flex items-center justify-center mb-[10px]" dir='rtl'>
        {items.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {items.map(item => (
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer group relative w-[320px]"
                  key={item.id}
                  onClick={() => handleCardClick(item.id)} 
                >
                  <div className="relative">
                    <img 
                      className="w-full h-[250px] object-cover rounded-lg"
                      src={item.images[currentImageIndex[item.id]]} 
                      alt={item.title} 
                    />
                    <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="bg-gradient-to-l from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handlePrevImage(item.id);
                        }}
                      >
                        &#8592; 
                      </button>

               
                      <button
                        className="bg-gradient-to-r from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage(item.id); 
                        }}
                      >
                        &#8594; 
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
                      {item.images.length}   /   {currentImageIndex[item.id] + 1} 
                    </div>
                    </div>         
                  </div>
                  
                  <div dir='rtl' className="p-6">
                    <h2 className="text-2xl font-semibold text-primary mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-1">العلامة: {item.description.brand}</p>
                    <p className="text-gray-600 mb-1">السنة: {item.description.year}</p>
                    <div className="flex justify-between mt-4">
                      <button 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCar(item.id);
                        }}
                      >
                        حذف
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        تعديل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-center text-2xl">لا توجد مركبات لعرضها.</p>
          </div>
        )}
      </div>
      <br /><br /><br /><br />
    </main>
  );
};

export default MyCars;
