
import React, { useState } from 'react';

const CategoryManagement = () => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([
    { id: 1, name: 'السيدان' },
    { id: 2, name: 'السيارات الرياضية متعددة الأغراض' },
    { id: 3, name: 'السيارات الرياضية' },
    { id: 4, name: 'السيارات الفاخرة' },
  ]);

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory.trim() }]);
      setNewCategory('');
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">إضافة وحذف فئات السيارات</h1>
        
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">إضافة فئة جديدة:</h2>
          <div className="flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="أدخل اسم الفئة"
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addCategory}
              className="bg-[#A5CAE4] text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 transition duration-300"
            >
              إضافة الفئة
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">{category.name}</span>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">
            العودة
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
