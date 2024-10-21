






import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaSearch, FaPhoneAlt, FaFileContract, FaUserCircle } from 'react-icons/fa';

const Header = ({ onCategoryChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/Login', { replace: true });
    } else {
      navigate('/Login', { replace: true });
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    const id = localStorage.getItem('userId');
    if (option === 'carListingForm') {
      navigate(`/carListingForm?userId=${id}`);
    } else if (option === 'mycars') {
      navigate(`/mycars?userId=${id}`);
    } else {
      navigate(`/${option}`);
    }
    setDropdownOpen(false);
  };

  const handleCategorySuvChange = (event) => {
    const selectedCategory = event.target.value;
    console.log("Selected Category:", selectedCategory);
    localStorage.setItem('category', selectedCategory);
    onCategoryChange(selectedCategory);
    navigate(`/${selectedCategory}`);
  };
  const handleCategorySedanChange = (event) => {
    const selectedCategory = event.target.value;
    console.log("Selected Category:", selectedCategory);
    localStorage.setItem('category', selectedCategory);
    onCategoryChange(selectedCategory);
    navigate(`/${selectedCategory}`);
  };

  return (
    <header className="bg-gradient-to-r bg-[#758e9d] text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaCar className="text-3xl" />
            <span className="text-2xl font-bold">Mazad Motors</span>
          </Link>

          <nav className="hidden md:flex space-x-6 items-center">
            <select className="bg-white text-blue-800 px-3 py-2 rounded-md" onChange={handleCategorySuvChange}>
              <option value="sedan">سيارات سيدان</option>
              <option value="suv">سيارات الدفع الرباعي</option>
              <option value="sports">سيارات رياضية</option>
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="Search auctions..."
                className="pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <Link to="/AboutUs" className="hover:text-blue-200 transition">معلومات عنا</Link>
            <Link to="/ContactPage" className="hover:text-blue-200 transition flex items-center">
              <FaPhoneAlt className="mr-1" /> اتصل بنا
            </Link>
            <Link to="/TermsAndConditions" className="hover:text-blue-200 transition flex items-center">
              <FaFileContract className="mr-1" /> شروط
            </Link>
          </nav>

          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition"
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {isLoggedIn ? (
                    <>
                      <button onClick={() => handleOptionClick('carListingForm')} className="block px-4 py-2 text-sm hover:bg-blue-100">
                        إضافة سيارة
                      </button>
                      <button onClick={() => handleOptionClick('mycars')} className="block px-4 py-2 text-sm hover:bg-blue-100">
                        مركباتي
                      </button>
                      <button onClick={() => handleOptionClick('settings')} className="block px-4 py-2 text-sm hover:bg-blue-100">
                        الإعدادات
                      </button>
                      <button onClick={handleAuthAction} className="block px-4 py-2 text-sm hover:bg-blue-100">
                        تسجيل الخروج
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleOptionClick('login')} className="block px-4 py-2 text-sm hover:bg-blue-100">
                      تسجيل الدخول
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="md:hidden text-2xl">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;









































