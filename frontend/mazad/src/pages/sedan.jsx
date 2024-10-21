import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Component/Header';
import Logocar from '../Component/Partners';
import Hero from '../Component/Hero';

const MyCars = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null); 
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email'); 
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserId(storedEmail); 
    } else {
      
      navigate('/login'); 
    }
  }, [navigate]); 
  
  const fetchUserId = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users?email=${email}`); 
      if (response.data && response.data.length > 0) {
        setUserId(response.data[0]._id); 
      }
    } catch (error) {
      console.error('Error fetching user ID:', error.response ? error.response.data : error.message);
    }
  };

  const handleCategoryChange = (category) => {
    console.log("فئة جديدة:", category);
  };

  useEffect(() => {
    const fetchsedanCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/car-listings/category/sedan');
        const sedanCars = response.data.map(car => {
          return {
            id: car._id,
            _id:car._id,
            userid:car.userId,
            type: car.category,
            images: car.images.length > 0 ? car.images.map(image => `${image}`) : ['http://localhost:3000/uploads/default-image.png'],
            title: car.model,
            description: {
              brand: car.brand,
              year: car.year,
              mileage: car.mileage,
              condition: car.condition,
              startingBidPrice: car.startingBidPrice,
              auctionStartTime: car.auctionStartTime,
            },
            auctionStarted: false,
          };
        });

        setItems(sedanCars);
        const initialImageIndexes = sedanCars.reduce((acc, car) => {
          acc[car.id] = 0;
          return acc;
        }, {});
        setCurrentImageIndex(initialImageIndexes);

      } catch (error) {
        console.error('Error fetching sedan cars:', error.response ? error.response.data : error.message);
      }
    };

    fetchsedanCars();
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems(prevItems =>
        prevItems.map(item => {
          const auctionStartTime = new Date(item.description.auctionStartTime);
          return {
            ...item,
            auctionStarted: auctionStartTime <= new Date()
          };
        })
      );
    }, 0.000);

    return () => clearInterval(intervalId);
  }, [items]);

  const handleDeleteCar = async (carId) => {
    const confirmDelete = window.confirm('هل أنت متأكد أنك تريد حذف هذه السيارة؟');

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/car-listings/${carId}`);
      console.log('Car deleted successfully:', response.data);
      setItems((prevItems) => prevItems.filter(item => item.id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error.response ? error.response.data : error.message);
    }
  };

  const handleCardClick = (itemId,iid) => {
    
    navigate(`/detailPage2?id=${itemId}&_id=${iid}`);
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
      <Hero />
      <Logocar />
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">مرحبا بك، {email}</h2>
        {userId && <p className="text-lg">معرف المستخدم: {userId}</p>}
      </div>
      <section className="bg-[#e6edf1] py-12 px-7 rounded-xl mt-10 mb-10">
        <h1 className="mb-12 text-4xl font-bold text-primary text-center"> <span>(سيدان)</span>سيارات اكثر شعبية </h1>
        <div className="container mx-auto px-4 mt-10 mb-4 flex items-center justify-center mb-[100px]" dir='rtl'>
          {items.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {items.map(item => (
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                  key={item.id}
                  onClick={() => handleCardClick(item.id,item.userid)}
                >
                  <div className="relative group">
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
                        {currentImageIndex[item.id] + 1} / {item.images.length}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">اسم السيارة : {item.title}</h2>
                    <p className="text-gray-600 mb-2">السنة : {item.description.year}</p>
                    <p className="text-gray-600 mb-2">المسافة المقطوعة : {item.description.mileage} km</p>
                    <p className="text-gray-600 mb-2">وقت المزاودة : 
                      <span>
                        {item.auctionStarted 
                          ? 'المزاد قد بدأ'
                          : new Date(item.description.auctionStartTime).toLocaleString('ar-EG', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                        }
                      </span>
                    </p>
                    <p className="text-gray-600">بداية المزاد : {item.description.startingBidPrice} $</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-center text-2xl">لا توجد مركبات لعرضها.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyCars;
