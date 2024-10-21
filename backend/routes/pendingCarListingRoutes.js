const express = require('express');
const router = express.Router();
const pendingcarListingController = require('../controllers/pendingcarListingController');
const pending = require('../models/pendingcarlistings');
const carListingControllerid = require('../controllers/carListingController');
const carListingSedan = require('../controllers/carListingController');
const carListingsuv = require('../controllers/carListingController');
const carListingsports = require('../controllers/carListingController');
const upload = require('../middleware/upload');
const Car = require('../models/CarListing'); 
const carListingController = require('../controllers/carListingController');
router.get('/pending-cars', pendingcarListingController.getPendingCarListings);
router.get('/pending-cars/:id', pendingcarListingController.getPendingCarById);

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




router.post('/pending-cars', upload.array('images', 5), carListingController.createCarListing);
router.get('/approved', carListingController.getApprovedListings);
router.get('/user/:userId', carListingController.getUserCarListings);
router.get('/carid/:id', carListingControllerid.getUserCarListingsid);
router.get('/category/sedan', carListingSedan.getUserCarListingsSedan);
router.get('/category/suv', carListingsuv.getUserCarListingssuv);
router.get('/category/sports', carListingsports.getUserCarListingssports);
module.exports = router;
