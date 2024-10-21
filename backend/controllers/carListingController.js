const CarListing = require('../models/CarListing');
const pendingCares = require('../models/pendingcarlistings');






exports.createCarListing = async (req, res) => {
  try {
    const pendingcarListing = new pendingCares({
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      mileage: req.body.mileage,
      condition: req.body.condition,
      category: req.body.category,
      userId: req.body.userId,
      startingBidPrice: req.body.startingBidPrice, 
      auctionStartTime: req.body.auctionStartTime,
      auctionEndTime: req.body.auctionEndTime, 
      images: req.files.map(file => file.filename) 
    });

    await pendingcarListing.save();
    res.status(201).json(pendingcarListing);
  } catch (error) {
    console.error('خطأ في حفظ السيارة:', error);
    res.status(400).json({ message: 'خطأ في إدراج السيارة', error });
  }
};




exports.createCarListingFoeCarlistings = async (req, res) => {
  try {
    const car = new CarListing({
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      mileage: req.body.mileage,
      condition: req.body.condition,
      category: req.body.category,
      userId: req.body.userId,
      startingBidPrice: req.body.startingBidPrice, 
      auctionStartTime: req.body.auctionStartTime,
      auctionEndTime: req.body.auctionEndTime, 
      images: req.files.map(file => file.filename) 
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error('خطأ في حفظ السيارة:', error);
    res.status(400).json({ message: 'خطأ في إدراج السيارة', error });
  }
};













exports.getUserCarListings = async (req, res) => {
  try {
    const { userId } = req.params; 
    console.log('Fetching listings for userId:', userId); 

    const userListings = await CarListing.find({ userId, isApproved: true }).sort({ createdAt: -1 });
    console.log('User Listings:', userListings);

    const listingsWithImageUrls = userListings.map(listing => {
      const images = listing.images.map(image => `http://localhost:3000/uploads/${image}`);
      return { ...listing.toObject(), images };
    });

    res.status(200).json(listingsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserCarListingsid = async (req, res) => {
  const { id } = req.params; 

  try {
    const carListing = await CarListing.findById(id); 
    if (!carListing) {
      return res.status(404).json({ message: 'Car not found' }); 
    }

    const images = carListing.images.map(image => `http://localhost:3000/uploads/${image}`); 
    const listingWithImageUrls = { ...carListing.toObject(), images }; 

    res.status(200).json(listingWithImageUrls); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); 
  }
};
exports.getUserCarListingsSedan = async (req, res) => {
  try {
    const category = 'sedan';
    console.log('Fetching listings for category:', category); 

    const userListings = await CarListing.find({ category }).sort({ createdAt: -1 });
    console.log('User Listings:', userListings); 

    const listingsWithImageUrls = userListings.map(listing => {
      const images = listing.images.map(image => `http://localhost:3000/uploads/${image}`);
      return { ...listing.toObject(), images };
    });

    res.status(200).json(listingsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUserCarListingssuv = async (req, res) => {
  try {
    const category = 'suv';
    console.log('Fetching listings for category:', category); 

    const userListings = await CarListing.find({ category }).sort({ createdAt: -1 });
    console.log('User Listings:', userListings); 

    const listingsWithImageUrls = userListings.map(listing => {
      const images = listing.images.map(image => `http://localhost:3000/uploads/${image}`);
      return { ...listing.toObject(), images };
    });

    res.status(200).json(listingsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUserCarListingssports = async (req, res) => {
  try {
    const category = 'sports'; 
    console.log('Fetching listings for category:', category); 

    const userListings = await CarListing.find({ category }).sort({ createdAt: -1 });
    console.log('User Listings:', userListings);

    const listingsWithImageUrls = userListings.map(listing => {
      const images = listing.images.map(image => `http://localhost:3000/uploads/${image}`);
      return { ...listing.toObject(), images };
    });

    res.status(200).json(listingsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
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


exports.getApprovedListings = async (req, res) => {
  try {
    const approvedListings = await CarListing.find({ isApproved: true }).sort({ createdAt: -1 });
    

    const listingsWithImageUrls = approvedListings.map(listing => {
      const images = listing.images.map(image => `http://localhost:3000/uploads/${image}`);
      return { ...listing.toObject(), images };
    });

    res.status(200).json(listingsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
