const express = require('express');
const router = express.Router();
const carListingController = require('../controllers/carListingController');
const pendingcarListingController = require('../controllers/pendingcarListingController');
const carListingControllerid = require('../controllers/carListingController');
const carListingSedan = require('../controllers/carListingController');
const carListingsuv = require('../controllers/carListingController');
const carListingsports = require('../controllers/carListingController');
const upload = require('../middleware/upload');
const Car = require('../models/CarListing'); 
const pendincarListingController = require('../controllers/pendingcarListingController');

router.get('/pending-cars', pendingcarListingController.getPendingCarListings);
router.get('/car-listings', async (req, res) => {
    const category = req.query.category;
    try {
        const cars = await Car.find({ category }); 
        res.json(cars); 
    } catch (error) {
        console.error('خطأ في جلب السيارات:', error);
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});
router.get('/car-listings/suv', async (req, res) => {
  try {
      const suvCars = await Car.find({ category: 'suv' });
      res.status(200).json(suvCars);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching suv cars', error });
  }
});
router.get('/car-listings/sports', async (req, res) => {
  try {
      const sportsCars = await Car.find({ category: 'sports' });
      res.status(200).json(sportsCars);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching sports cars', error });
  }
});
router.get('/car-listings/sedan', async (req, res) => {
  try {
      const sedanCars = await Car.find({ category: 'sedan' });
      res.status(200).json(sedanCars);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching sedan cars', error });
  }
});











router.get('/car-listings', async (req, res) => {
    try {
      const users = await Car.find();
      res.status(200).json(users); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });





  router.post('/api/car-listings', async (req, res) => {
    const { brand, model, year, mileage, condition, category, images, userId, startingBidPrice, auctionStartTime, auctionEndTime } = req.body;

    try {
        const newPendingCarListing = new Car({
            brand,
            model,
            year,
            mileage,
            condition,
            category,
            images,
            userId,
            startingBidPrice,
            auctionStartTime,
            auctionEndTime,

        });

        await newPendingCarListing.save();
        res.status(201).json({ message: 'Pending car listing added successfully', car: newPendingCarListing });
    } catch (error) {
        console.error('Error adding pending car listing:', error);
        res.status(500).json({ message: 'Error adding pending car listing', error: error.message });
    }
});






module.exports = router;

