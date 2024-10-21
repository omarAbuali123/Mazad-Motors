import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../Component/Header';

const MyCars = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get('id');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [countdownTime, setCountdownTime] = useState("المزاد لم يبدأ بعد"); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isDepositPaid, setIsDepositPaid] = useState(false);
  const [submittedBids, setSubmittedBids] = useState([]);
  const [userId] = useState(sessionStorage.getItem("userId")); 
  const [userName, setUserName] = useState("");
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [count, setCount] = useState(0); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isInsurancePaid, setIsInsurancePaid] = useState(false);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/car-listings/carid/${carId}`);
        const car = response.data;
  

        setSelectedCar({
          id: car._id,
          type: car.category,
          image: car.images.length > 0 ? `${car.images[0]}` : '',
          title: car.model,
          brand: car.brand,
          year: car.year,
          mileage: car.mileage,
          condition: car.condition,
          minBidIncrement: car.minBidIncrement,
          currentPrice: car.startingBidPrice, 
          imageUrls: car.images,
          startingBidPrice: car.startingBidPrice,
          auctionStartTime: car.auctionStartTime,
          auctionEndTime: car.auctionEndTime,
        });
  
       
        setBidAmount(""); 
        setCurrentImageIndex(0);
      } catch (error) {
        console.error('Error fetching car details:', error.response ? error.response.data : error.message);
      }
    };
  
    if (carId) {
      fetchCarDetails(); 
    }
  }, [carId]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`); 
        const user = response.data; 
        if (user && user.name) {
          setUserName(user.name); 
        } else {
          console.error('User data is missing or incorrect');
        }
      } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  useEffect(() => {
    const updateRemainingTime = () => {
      if (selectedCar && selectedCar.auctionStartTime) {
        const auctionStartTime = new Date(selectedCar.auctionStartTime);
        const now = new Date();
        const timeDifference = auctionStartTime.getTime() - now.getTime();

        if (timeDifference > 0) {
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          setRemainingTime(`${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية`);
        } else {
          setRemainingTime('المزاد قد بدأ');
          setIsAuctionStarted(true); 
          fetchSubmittedBids();
        }
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000); 

    return () => clearInterval(interval); 
  }, [selectedCar]);

  useEffect(() => {
    const updateCountdownTime = () => {
      if (selectedCar && selectedCar.auctionEndTime) {
        const auctionEndTime = new Date(selectedCar.auctionEndTime); 
        const now = new Date();
        const timeDifference = auctionEndTime.getTime() - now.getTime(); 
        if (timeDifference > 0 && isAuctionStarted) {
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          setCountdownTime(`${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية`); 
        } else if (timeDifference <= 0) {
          setCountdownTime('المزاد قد انتهى'); 
          setIsAuctionStarted(false);
          setIsAuctionEnded(true);
        }
      }
    };
    updateCountdownTime();
    const interval = setInterval(updateCountdownTime, 1000); 
    return () => clearInterval(interval); 
  }, [selectedCar, isAuctionStarted]);
  const fetchSubmittedBids = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/bids?carId=${carId}`);
      setSubmittedBids(response.data);
    } catch (error) {
      console.error('Error fetching submitted bids:', error);
    }
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedCar.imageUrls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedCar.imageUrls.length) % selectedCar.imageUrls.length);
  };
  const handleEndAuction = async () => {
    try {
        const response = await axios.post('/api/bids/endAuction', { carId: 'معرف السيارة' });
        console.log(response.data.message); 
    } catch (error) {
        console.error('خطأ في إنهاء المزاد:', error);
    }
};

  useEffect(() => {
    const savedCount = sessionStorage.getItem('bidCount');
    if (savedCount) {
        setCount(Number(savedCount));
    }
}, []);

let Price_and_first_deel_car = 0;
let updatedPrice = 0;

const handleBidSubmit = async () => {
    if (!userName) {
        alert('يرجى التأكد من تسجيل الدخول قبل تقديم العرض.');
        return;
    }

    try {
        let pricecar = selectedCar.startingBidPrice; 
        let newBidAmount = bidAmount; 

        if(bidAmount==0 || bidAmount==""){
          setErrorMessage('يجب الا يكون الحقل فارغ');

          return;
        }
        if(bidAmount>=100 && (bidAmount% 100 === 0)){
         
        

        
        const response = await axios.get(`http://localhost:3000/api/bids?carId=${selectedCar.id}`);
        const previousBids = response.data;

        if (previousBids.length === 0) {
   
            Price_and_first_deel_car = pricecar + newBidAmount; 
            updatedPrice = Price_and_first_deel_car;

            console.log("Price_and_first_deel_car = ", Price_and_first_deel_car);
            console.log("updatedPrice = ", updatedPrice);
        } else {
          
            const lastBid = previousBids[previousBids.length - 1];
            
            if (lastBid && lastBid.bidAmount !== undefined) {
                updatedPrice = updatedPrice + newBidAmount; 
                console.log("مزايدة سابقة موجودة، السعر المحدث هو:", updatedPrice);
            } else {
                console.error("لا توجد مزايدة سابقة صالحة أو bidAmount غير معرف.");
                return;
            }
        }

        const newBid = {
            carId: selectedCar.id,
            userId: userId,
            bidAmount: updatedPrice,
            name: userName,
        };


        await axios.post(`http://localhost:3000/api/bids`, newBid);
        setSubmittedBids((prevBids) => [
            ...prevBids,
            { name: userName, bidAmount: updatedPrice },
        ]);

        setCount(previousBids.length + 1); 
        setBidAmount(''); 
      }
      else{
        setErrorMessage("يجب ان تكون من مضاعفات ال 100")
      }
    } catch (error) {
        console.error('Error submitting bid:', error.response ? error.response.data : error.message);
    }
};




const handleCategoryChange = (category) => {
  console.log("فئة جديدة:", category);
};








useEffect(() => {

  const insuranceStatus = sessionStorage.getItem('insurancePaid');
  if (insuranceStatus === 'true') {
      setIsInsurancePaid(true);
  }
}, []);

const handleDepositPayment = async () => {
  try {
    
      alert('تم دفع التأمين بنجاح!');
      setIsInsurancePaid(true);
    
      sessionStorage.setItem('insurancePaid', 'true');
  } catch (error) {
      console.error('Error processing deposit:', error.message);
      alert('فشل في دفع التأمين.');
  }
};


  if (!selectedCar) {
    return <div>Loading...</div>; 
  }

  return (

    <main className="main">
    {/* <Header/> */}
    <Header onCategoryChange={handleCategoryChange} />

    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#677f8e] to-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">{selectedCar.brand} {selectedCar.title} {selectedCar.year}</h1>
          <p className="text-xl" dir='rtl'>يبدأ السعر من : {selectedCar.startingBidPrice}$</p>
          <p className="text-lg" dir='rtl'>الوقت المتبقي لبداية المزاد: {remainingTime}</p>
          <p className="text-lg" dir='rtl'>الوقت المتبقي لنهاية المزاد: {countdownTime}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="relative">
            {selectedCar.imageUrls.length > 0 ? (
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
              <button className="bg-gradient-to-l from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300" onClick={handlePrevImage}>
                &#8592;
              </button>
              <button className="bg-gradient-to-r from-transparent to-black text-white p-2 rounded-full hover:from-black transition duration-300" onClick={handleNextImage}>
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
<div>
  <p className="text-gray-800 font-semibold mb-4">عليك دفع تأمين بقيمة 1000 دولار قبل تقديم العرض.</p>
{!isInsurancePaid && (
               <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleDepositPayment}>دفع التأمين</button>
              )}
            {isInsurancePaid && <p>تم دفع التأمين!</p>}
              </div>
      {errorMessage && <p className="text-red-500 text-3xl">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-3xl">{successMessage}</p>}

       
            {isAuctionStarted && isInsurancePaid && (
              <div className="mt-6">
                <p className="text-lg font-semibold mb-2">قدم عرضك:</p>
                <input
                  type="number"
                  className="border border-gray-400 p-2 rounded-lg w-full mb-4"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleBidSubmit}
                >
                  تقديم العرض
                </button>
              </div>
            )}
{isAuctionEnded ? (
  <div className="mt-6">
    <h3 className="text-[35px] font-semibold mb-4 text-center"> مبروك للفائز!</h3>
    <p className='text-2xl'><strong>اسم الفائز:  {submittedBids.length > 0 ? submittedBids[submittedBids.length - 1].name : "لا يوجد عروض"}</strong></p>
    <p className='text-2xl'><strong>المبلغ المقدم: {submittedBids.length > 0 ? submittedBids[submittedBids.length - 1].bidAmount : 0}$</strong></p>
  </div>
) : (
  submittedBids.length > 0 && (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">العروض المقدمة:</h3>
      <div className="space-y-4">
        {submittedBids.map((bid, index) => (
          <div key={index} className="border border-gray-400 p-4 rounded-lg bg-gray-100">
            <p><strong>اسم المستخدم:</strong> {bid.name}</p>
            <p><strong>المبلغ المقدم:</strong> ${bid.bidAmount}</p>
            
          </div>
          
        ))}
      </div>
      
    </div>
  )
)}




          </div>
        </div>
      </div>
    </div>
  </main>
  );
};

export default MyCars;










