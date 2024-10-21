import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Component/Header';

import { useLocation, useNavigate } from 'react-router-dom';
const MyCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId'); 
  const [items, setItems] = useState([]); 
  const [selectedCar, setSelectedCar] = useState(null); 
  const [bidAmount, setBidAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/car-listings/user/${userId}`);
        const userCars = response.data.map(car => ({
          id: car._id,
          type: car.category,
          image: car.images.length > 0 ? `${car.images[0]}` : '',
          title: car.model,
          brand: car.brand,
          year: car.year,
          mileage: car.mileage,
          condition: car.condition,
          minBidIncrement: car.minBidIncrement,
          currentPrice: car.currentPrice,
          imageUrls: car.images,
        }));
        setItems(userCars); 

        if (userCars.length > 0) {
          
          setSelectedCar(userCars[0]);
          setBidAmount(userCars[0].currentPrice + userCars[0].minBidIncrement);
        }
      } catch (error) {
        console.error('Error fetching user cars:', error.response ? error.response.data : error.message);
      }
    };

    if (userId) {
      fetchUserCars();
    }
  }, [userId]);

  if (!selectedCar) {
    return <div>Loading...</div>;
  }

  const handleCategoryChange = (category) => {
    console.log("فئة جديدة:", category);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedCar.imageUrls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedCar.imageUrls.length) % selectedCar.imageUrls.length);
  };

  return (
    <main className="main">
      <Header onCategoryChange={handleCategoryChange} />
    <div className="bg-gray-100 min-h-screen p-4" >
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#677f8e] to-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">{selectedCar.brand} {selectedCar.title} {selectedCar.year}</h1>
          <p className="text-xl">السعر الحالي: ${selectedCar.currentPrice?.toLocaleString()}</p>
          <p className="text-lg">الوقت المتبقي للمزاد: {timeLeft}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="relative">
            {selectedCar.imageUrls && selectedCar.imageUrls.length > 0 ? (
              <img 
                src={selectedCar.imageUrls[currentImageIndex]} 
                alt={`${selectedCar.brand} ${selectedCar.title}`} 
                className="w-full h-[400px] object-cover rounded-lg" 
              />
            ) : (
              <div className="bg-gray-200 rounded-lg p-2 mb-4 h-[400px] w-full flex items-center justify-center">
                <p className="text-gray-500">لا توجد صورة متاحة</p>
              </div>
            )}

     
            <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-gradient-to-l from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                &#8592; 
              </button>

              <button
                className="bg-gradient-to-r from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                &#8594; 
              </button>
            </div>

      
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
              <span>{currentImageIndex + 1}</span> / <span>{selectedCar.imageUrls.length}</span>
            </div>
          </div>
          
          <div dir='rtl'>
            <h2 className="text-2xl font-semibold mb-4">تفاصيل المركبة</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <p className="text-gray-600">الماركة: <span className="font-semibold">{selectedCar.brand}</span></p>
              <p className="text-gray-600">الموديل: <span className="font-semibold">{selectedCar.title}</span></p>
              <p className="text-gray-600">السنة: <span className="font-semibold">{selectedCar.year}</span></p>
              <p className="text-gray-600">المسافة المقطوعة: <span className="font-semibold">{selectedCar.mileage} كم</span></p>
              <p className="text-gray-600">الحالة: <span className="font-semibold">{selectedCar.condition}</span></p>
              <p className="text-gray-600">التصنيف: <span className="font-semibold">{selectedCar.type}</span></p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="font-semibold mb-2">قم بوضع عرضك</p>
              <p  className="text-sm text-gray-600 mb-2">الحد الأدنى للمزايدة: ${selectedCar.minBidIncrement?.toLocaleString()}</p>
              <div className="flex items-center">
                <span dir='' className="text-2xl mr-2">$</span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                  step={selectedCar.minBidIncrement}
                  min={selectedCar.currentPrice + selectedCar.minBidIncrement}
                />
              </div>
            </div>
            
            <button className="w-full bg-green-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors">
              تقديم العرض
            </button>
          </div>
        </div>
     
      </div>
    </div>
    </main>
  );
};

export default MyCars;
