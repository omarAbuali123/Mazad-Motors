
const PendingCarListing = require('../models/pendingcarlistings'); 
const CarListing = require('../models/CarListing');

exports.getPendingCarListings = async (req, res) => {
    try {
        const pendingCars = await PendingCarListing.find({});
        res.status(200).json(pendingCars);
    } catch (error) {
        console.error('Error fetching pending car listings:', error);
        res.status(500).json({ message: 'Error fetching pending car listings' });
    }
};







exports.deleteCarListing = async (req, res) => {
    const carId = req.params.carId; 
    try {
      const result = await CarListing.findByIdAndDelete(carId); 
  
      if (!result) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting car', error: error.message });
    }
  };




exports.getPendingCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await PendingCarListing.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).json({ message: 'Error fetching car by ID' });
    }
};

