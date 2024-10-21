


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaMountain } from 'react-icons/fa';

const High = ({ items }) => {
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/detailPage`);
  };

  return (
    <section className="bg-[#e6edf1] py-12 px-7 rounded-xl">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-4xl font-bold text-primary text-center"> <span>4x4</span> مركبات الدفع الرباعي </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {items.map(item => (
            item.type == 4 && 
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              key={item.id}
              onClick={() => handleDetailsClick(item.id)}
            >
              <div className="relative">
                <img className="w-full h-56 object-cover" src={item.image} alt="سيارة" />
                <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                  <FaMountain className="mr-1" />4x4
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-primary mb-2">تويوتا</h2>
                <p className="text-gray-600 mb-4">وارد كندي</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-secondary">الموديل: 2022 XYZ</p>
                  <div className="flex items-center text-gray-500">
                    <FaClock className="mr-1" />
                    <span>23:45:30</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">المزايدة الحالية</p>
                    <p className="text-2xl font-bold text-primary">20,000 $</p>
                  </div>
                  <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors duration-300">
                    مزايدة الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default High;