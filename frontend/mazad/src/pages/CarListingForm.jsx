// import React, { useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import Header from '../Component/Header';

// const CarListingForm = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const userId = queryParams.get('userId');
//   const [carDetails, setCarDetails] = useState({
//     brand: '',
//     model: '',
//     year: '',
//     mileage: '',
//     condition: '',
//     category: '',
//     images: []
//   });
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCarDetails({ ...carDetails, [name]: value });
//   };
//   const handleImageChange = (e) => {
//     const newImages = Array.from(e.target.files);
//     const updatedImages = [...carDetails.images];
  
//     newImages.forEach((image) => {
//       if (!updatedImages.some((img) => img.name === image.name)) {
//         updatedImages.push(image);
//       }
//     });
  
//     setCarDetails(prevDetails => ({
//       ...prevDetails,
//       images: updatedImages 
//     }));
//   };
//   const handleImageRemove = (index) => {
//     console.log(`حذف الصورة عند الفهرس: ${index}`); 
//     setCarDetails(prevDetails => {
//       const updatedImages = prevDetails.images.filter((_, i) => i !== index);
//       return { ...prevDetails, images: updatedImages }; 
//     });
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const currentYear = new Date().getFullYear();
//   if (carDetails.mileage < 0) {
//       setErrorMessage('المسافة المقطوعة لا يمكن أن تكون سالبة.');
//       return;
//   }
//   if (carDetails.year < 1886 || carDetails.year > currentYear) {
//       setErrorMessage(`السنة يجب أن تكون بين 1886 والسنة الحالية (${currentYear}).`);
//       return;
//   }
//   if (carDetails.startingBidPrice < 0) {
//       setErrorMessage('سعر بداية المزايدة لا يمكن أن يكون سالباً.');
//       return;
//   }
//   const currentTime = new Date();
//   const auctionStartTime = new Date(carDetails.auctionStartTime);
//   const auctionEndTime = new Date(carDetails.auctionEndTime);

//   if (auctionStartTime < currentTime) {
//       setErrorMessage('وقت بدء المزادية يجب أن يكون بعد الوقت الحالي.');
//       return;
//   }
//   const durationInHours = (auctionEndTime - auctionStartTime) / (1000 * 60 * 60);
//   const formData = new FormData();
//   Object.keys(carDetails).forEach(key => {
//       if (key === 'images') {
//           carDetails.images.forEach((image) => {
//               formData.append('images', image);
//           });
//       } else {
//           formData.append(key, carDetails[key]);
//       }
//   });


//   formData.append('userId', userId);

//   try {
//       const response = await axios.post('http://localhost:3000/api/pending-cars', formData, {
//           headers: {
//               'Content-Type': 'multipart/form-data',
//           },
//       });
//       setSuccessMessage('تم إدراج السيارة بنجاح!');
//       setCarDetails({
//           brand: '',
//           model: '',
//           year: '',
//           mileage: '',
//           condition: '',
//           category: '',
//           images: [],
//           startingBidPrice: '',
//           auctionStartTime: '',
//           auctionEndTime: '',
//       });
//       setErrorMessage('');
//   } catch (error) {
//       console.error('خطأ في إدراج السيارة:', error);
//       setErrorMessage('حدث خطأ أثناء إدراج السيارة.');
//   }
// };



// const handleCategoryChange = (category) => {
//   console.log("فئة جديدة:", category);
// };

//   return (
//     <main className="main">
//       <Header onCategoryChange={handleCategoryChange} />
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">إدراج سيارة للبيع</h2>
//       {successMessage && <p className="text-green-500">{successMessage}</p>}
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">الماركة</label>
//           <input
//             type="text"
//             name="brand"
//             value={carDetails.brand}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">اسم السيارة</label>
//           <input
//             type="text"
//             name="model"
//             value={carDetails.model}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">السنة</label>
//           <input
//             type="number"
//             name="year"
//             value={carDetails.year}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">المسافة المقطوعة (كم)</label>
//           <input
//             type="number"
//             name="mileage"
//             value={carDetails.mileage}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">الحالة</label>
//           <input
//             type="text"
//             name="condition"
//             value={carDetails.condition}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">سعر بداية المزايدة</label>
//           <input
//             type="number"
//             name="startingBidPrice"
//             value={carDetails.startingBidPrice}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div>
//         <label className="block text-sm font-medium text-gray-700">وقت بدء المزاد:</label>
//         <input
//             type="datetime-local"
//             value={carDetails.auctionStartTime}
//             onChange={(e) => setCarDetails({ ...carDetails, auctionStartTime: e.target.value })}
//             required
//         />
//     </div>

//     <div>
//         <label className="block text-sm font-medium text-gray-700">وقت انتهاء المزاد:</label>
//         <input
//             type="datetime-local"
//             value={carDetails.auctionEndTime}
//             onChange={(e) => setCarDetails({ ...carDetails, auctionEndTime: e.target.value })}
   
//             required
//         />
//     </div>
       
//         <div>
//           <label className="block text-sm font-medium text-gray-700">تصنيف السيارة</label>
//           <select
//             name="category"
//             value={carDetails.category}
//             onChange={handleChange}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             required
//           >
//             <option value="">اختر التصنيف</option>
//             <option value="sedan">سيارات سيدان</option>
//             <option value="suv">سيارات الدفع الرباعي</option>
//             <option value="sports">سيارات رياضية</option>
//           </select>
//         </div>
// <div>
//   <label className="block text-sm font-medium text-gray-700">تحميل صور السيارة</label>
//   <input
//     type="file"
//     multiple
//     onChange={handleImageChange}
//     className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300"
//   />
// </div>

// <div className="mt-4">
//   <h3 className="text-lg font-medium">الصور المضافة:</h3>
//   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
//     {carDetails.images.map((image, index) => (
//       <div key={index} className="relative">
//         <img
//           src={URL.createObjectURL(image)} 
//           alt={image.name}
//           className="w-full h-32 object-cover rounded-lg shadow-md"
//         />
//         <button
//           type="button"
//           onClick={() => handleImageRemove(index)}
//           className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
//         >
//           ×
//         </button>
//       </div>
//     ))}
//   </div>
// </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm"
//           >
//             إدراج السيارة
//           </button>
//         </div>
//       </form>
//     </div>
//     </main>
//   );
// };

// export default CarListingForm;







/////////////////////////





import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import { motion } from 'framer-motion';
import { Car, Upload, Clock, DollarSign, Camera } from 'lucide-react';

const CarListingForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  
  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    category: '',
    images: [],
    startingBidPrice: '',
    auctionStartTime: '',
    auctionEndTime: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    const updatedImages = [...carDetails.images];
  
    newImages.forEach((image) => {
      if (!updatedImages.some((img) => img.name === image.name)) {
        updatedImages.push(image);
      }
    });
  
    setCarDetails(prevDetails => ({
      ...prevDetails,
      images: updatedImages 
    }));
  };

  const handleImageRemove = (index) => {
    console.log(`حذف الصورة عند الفهرس: ${index}`);
    setCarDetails(prevDetails => {
      const updatedImages = prevDetails.images.filter((_, i) => i !== index);
      return { ...prevDetails, images: updatedImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentYear = new Date().getFullYear();
    if (carDetails.mileage < 0) {
      setErrorMessage('المسافة المقطوعة لا يمكن أن تكون سالبة.');
      return;
    }
    if (carDetails.year < 1886 || carDetails.year > currentYear) {
      setErrorMessage(`السنة يجب أن تكون بين 1886 والسنة الحالية (${currentYear}).`);
      return;
    }
    if (carDetails.startingBidPrice < 0) {
      setErrorMessage('سعر بداية المزايدة لا يمكن أن يكون سالباً.');
      return;
    }
    const currentTime = new Date();
    const auctionStartTime = new Date(carDetails.auctionStartTime);
    const auctionEndTime = new Date(carDetails.auctionEndTime);

    if (auctionStartTime < currentTime) {
      setErrorMessage('وقت بدء المزادية يجب أن يكون بعد الوقت الحالي.');
      return;
    }
    const durationInHours = (auctionEndTime - auctionStartTime) / (1000 * 60 * 60);
    const formData = new FormData();
    Object.keys(carDetails).forEach(key => {
      if (key === 'images') {
        carDetails.images.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, carDetails[key]);
      }
    });

    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:3000/api/pending-cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('تم إدراج السيارة بنجاح!');
      setCarDetails({
        brand: '',
        model: '',
        year: '',
        mileage: '',
        condition: '',
        category: '',
        images: [],
        startingBidPrice: '',
        auctionStartTime: '',
        auctionEndTime: '',
      });
      setErrorMessage('');
    } catch (error) {
      console.error('خطأ في إدراج السيارة:', error);
      setErrorMessage('حدث خطأ أثناء إدراج السيارة.');
    }
  };

  const handleCategoryChange = (category) => {
    console.log("فئة جديدة:", category);
  };


//   return (
// <>
//     <Header onCategoryChange={handleCategoryChange} />

//     <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">


//       {/* Decorative elements */}
//       <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
//       <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-300 rounded-full opacity-50 animate-bounce"></div>
//       <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 transform rotate-45 opacity-50 animate-spin"></div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl mt-10 relative z-10"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">إدراج سيارة للبيع</h2>
//         {successMessage && (
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-green-500 text-center mb-4"
//           >
//             {successMessage}
//           </motion.p>
//         )}
//         {errorMessage && (
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-500 text-center mb-4"
//           >
//             {errorMessage}
//           </motion.p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">الماركة</label>
//               <input
//                 type="text"
//                 name="brand"
//                 value={carDetails.brand}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">اسم السيارة</label>
//               <input
//                 type="text"
//                 name="model"
//                 value={carDetails.model}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </motion.div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">السنة</label>
//               <input
//                 type="number"
//                 name="year"
//                 value={carDetails.year}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">المسافة المقطوعة (كم)</label>
//               <input
//                 type="number"
//                 name="mileage"
//                 value={carDetails.mileage}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">الحالة</label>
//               <input
//                 type="text"
//                 name="condition"
//                 value={carDetails.condition}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </motion.div>
//           </div>
          
//           <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">سعر بداية المزايدة</label>
//             <div className="relative">
//               <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="number"
//                 name="startingBidPrice"
//                 value={carDetails.startingBidPrice}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </div>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">وقت بدء المزاد:</label>
//               <div className="relative">
//                 <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="datetime-local"
//                   name="auctionStartTime"
//                   value={carDetails.auctionStartTime}
//                   onChange={handleChange}
//                   className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">وقت انتهاء المزاد:</label>
//               <div className="relative">
//                 <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="datetime-local"
//                   name="auctionEndTime"
//                   value={carDetails.auctionEndTime}
//                   onChange={handleChange}
//                   className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//             </motion.div>
//           </div>
          
//           <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">تصنيف السيارة</label>
//             <div className="relative">
//               <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 name="category"
//                 value={carDetails.category}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               >
//                 <option value="">اختر التصنيف</option>
//                 <option value="sedan">سيارات سيدان</option>
//                 <option value="suv">سيارات الدفع الرباعي</option>
//                 <option value="sports">سيارات رياضية</option>
//               </select>
//             </div>
//           </motion.div>
          
//           <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">تحميل صور السيارة</label>
//             <div className="relative">
//               <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//                 className="mt-1 block w-full pl-10 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               />
//             </div>
//           </motion.div>

//           <div className="mt-6">
//             <h3 className="text-lg font-medium mb-2">الصور المضافة:</h3>
//             <motion.div 
//               className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ staggerChildren: 0.1 }}
//             >
//               {carDetails.images.map((image, index) => (
//                 <motion.div 
//                   key={index} 
//                   className="relative"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}

//                     whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
//                     >
//                       <img
//                         src={URL.createObjectURL(image)}
//                         alt={`صورة ${index + 1}`}
//                         className="w-full h-32 object-cover rounded-lg shadow-md"
//                       />
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         type="button"
//                         onClick={() => handleImageRemove(index)}
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
//                       >
//                         ×
//                       </motion.button>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </div>
    
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-sm hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
//               >
//                 إدراج السيارة
//               </motion.button>
//             </form>
//           </motion.div>
//         </main>
//         </>



//////////////////





return (
  <>
    <Header onCategoryChange={handleCategoryChange} />

    <main className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: "url('https://i.pinimg.com/736x/00/82/99/008299235810fe3bbf42f23ead40df20.jpg')"}}>
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 transform rotate-45 opacity-50 animate-spin"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl mt-10 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">إدراج سيارة للبيع</h2>
        {successMessage && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 text-center mb-4"
          >
            {successMessage}
          </motion.p>
        )}
        {errorMessage && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-4"
          >
            {errorMessage}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">الماركة</label>
              <input
                type="text"
                name="brand"
                value={carDetails.brand}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">اسم السيارة</label>
              <input
                type="text"
                name="model"
                value={carDetails.model}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">السنة</label>
              <input
                type="number"
                name="year"
                value={carDetails.year}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">المسافة المقطوعة (كم)</label>
              <input
                type="number"
                name="mileage"
                value={carDetails.mileage}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">الحالة</label>
              <input
                type="text"
                name="condition"
                value={carDetails.condition}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </motion.div>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">سعر بداية المزايدة</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="startingBidPrice"
                value={carDetails.startingBidPrice}
                onChange={handleChange}
                className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">وقت بدء المزاد:</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  name="auctionStartTime"
                  value={carDetails.auctionStartTime}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">وقت انتهاء المزاد:</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  name="auctionEndTime"
                  value={carDetails.auctionEndTime}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">تصنيف السيارة</label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="category"
                value={carDetails.category}
                onChange={handleChange}
                className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">اختر التصنيف</option>
                <option value="sedan">سيارات سيدان</option>
                <option value="suv">سيارات الدفع الرباعي</option>
                <option value="sports">سيارات رياضية</option>
              </select>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">تحميل صور السيارة</label>
            <div className="relative">
              <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full pl-10 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </motion.div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">الصور المضافة:</h3>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {carDetails.images.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`صورة ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                  >
                    ×
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-sm hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          >
            إدراج السيارة
          </motion.button>
        </form>
      </motion.div>
    </main>
    </>

///////////////
      );
    };
    
    export default CarListingForm;