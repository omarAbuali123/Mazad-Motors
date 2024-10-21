


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaMountain } from 'react-icons/fa';

const High = ({ items }) => {
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/detailPage`);
  };

  return (

    <main className="main">
      <Header />
    <section className="bg-[#e6edf1] py-12 px-7 rounded-xl">
      <div className="container mx-auto px-4">
      {items.length > 0 ? (
        <><h1 className="mb-12 text-4xl font-bold text-primary text-center"> <span>4x4</span> مركبات الدفع الرباعي </h1>
        
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {items.map(item => (
                          <div
                              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                              key={item.id}
                              onClick={() => handleCardClick(item.id)}
                          >
                          <div className="relative">
                  <img 
                    className="w-full h-[400px] object-cover rounded-lg"
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
                      {item.images.length} / {currentImageIndex[item.id] + 1}
                    </div>
                  </div>
                </div>
                              <div className="p-5">
                                  <h2 className="text-2xl font-semibold text-primary mb-2">{item.title}</h2>
                                  <p className="text-gray-600 mb-4">وارد كندي</p>
                                  <div className="flex items-center justify-between mb-4">
                                      <p className="text-sm font-bold text-secondary">{item.description.year}</p>
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
                  </div></>
        ):
        (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-center text-2xl">لا توجد مركبات لعرضها.</p>
            </div>
          )
        }
      </div>
    </section>
    </main>
  );
};

export default High;