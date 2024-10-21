
const Bid = require('../models/payments'); 

exports.submitBid = async (req, res) => {
  try {
    const { carId, bidAmount, userId } = req.body; 

   
    if (!carId || !bidAmount || !userId) {
      return res.status(400).json({ message: 'Car ID, bid amount, and user ID are required.' });
    }


    const newBid = new Bid({
      carId,
      userId,
      bidAmount
    });

 
    await newBid.save();

    res.status(201).json({ message: 'Bid submitted successfully', bid: newBid });
  } catch (error) {
    console.error('Error submitting bid:', error);
    res.status(500).json({ message: 'Error submitting bid', error: error.message });
  }
};
