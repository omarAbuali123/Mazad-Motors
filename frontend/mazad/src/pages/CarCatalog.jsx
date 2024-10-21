import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CarCatalog = () => {
  const [carListings, setCarListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchApprovedListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/car-listings/approved');
        setCarListings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching car listings:', err);
        setError('Error fetching car listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchApprovedListings();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Car Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carListings.map((car) => (
          <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={car.images && car.images.length > 0 ? car.images[0] : '/placeholder-car-image.jpg'}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                console.error('Error loading image:', car.images[0]);
                e.target.src = '/placeholder-car-image.jpg';
              }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.brand} {car.model}</h2>
              <p className="text-gray-600 mb-2">Year: {car.year}</p>
              <p className="text-gray-600 mb-2">Mileage: {car.mileage} km</p>
              <p className="text-gray-600 mb-2">Condition: {car.condition}</p>
              <p className="text-gray-600">Category: {car.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CarCatalog;