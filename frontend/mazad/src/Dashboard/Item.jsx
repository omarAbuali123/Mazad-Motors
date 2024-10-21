


import React, { useState } from 'react';

const ItemManagement = () => {
  const [cars, setCars] = useState([
    { id: 1, make: 'تويوتا', model: 'كامري', year: 2020, status: 'قيد الانتظار' },
    { id: 2, make: 'هوندا', model: 'سيفيك', year: 2019, status: 'معتمد' },
    { id: 3, make: 'فورد', model: 'موستانج', year: 2021, status: 'قيد الانتظار' },
  ]);

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const approveCar = (id) => {
    setCars(cars.map(car => 
      car.id === id ? { ...car, status: 'معتمد' } : car
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-center p-6 bg-gray-200">إدارة سيارات المستخدمين</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-right">الشركة المصنعة</th>
                <th className="py-3 px-6 text-right">الموديل</th>
                <th className="py-3 px-6 text-right">السنة</th>
                <th className="py-3 px-6 text-right">الحالة</th>
                <th className="py-3 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {cars.map((car) => (
                <tr key={car.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-right">{car.make}</td>
                  <td className="py-3 px-6 text-right">{car.model}</td>
                  <td className="py-3 px-6 text-right">{car.year}</td>
                  <td className="py-3 px-6 text-right">
                    <span className={`py-1 px-3 rounded-full text-xs ${
                      car.status === 'معتمد' ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'
                    }`}>
                      {car.status === 'معتمد' ? 'معتمد' : 'قيد الانتظار'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      {car.status === 'قيد الانتظار' && (
                        <button onClick={() => approveCar(car.id)} className="transform hover:text-green-500 hover:scale-110 mx-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      <button onClick={() => deleteCar(car.id)} className="transform hover:text-red-500 hover:scale-110 mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemManagement;
