const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const Car = require('../models/CarListing');


module.exports = (io) => {
router.post('/', async (req, res) => {
    const { carId, userId, bidAmount, name } = req.body;
  
    try {

      let currentBid = await Bid.findOne({ carId });
  
      if (currentBid) {
     
        currentBid.bidAmount += bidAmount;
        console.log("bidAmount = ",bidAmount)
        console.log("currentBid.bidAmount = ",currentBid.bidAmount)
        currentBid.name = name;
        const updatedBid = await currentBid.save();
        io.emit('newBid', updatedBid); 
  
     
        await Car.updateOne({ _id: carId }, { $set: { currentPrice: currentBid.bidAmount } });
  
        return res.status(200).json(updatedBid);
      } else {

        const newBid = new Bid({
          carId,
          userId,
          bidAmount,
          name
        });
  
        const savedBid = await newBid.save();
        io.emit('newBid', savedBid); 
        await Car.updateOne({ _id: carId }, { $set: { currentPrice: savedBid.bidAmount } });
  
        return res.status(201).json(savedBid);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
    router.get('/:carId', async (req, res) => {
        const { carId } = req.params;

        try {
            const bids = await Bid.find({ carId });
            res.json(bids);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.get('/total/:carId', async (req, res) => {
        const { carId } = req.params;

        try {
            const currentBid = await Bid.findOne({ carId });

            if (currentBid) {
                res.json({
                    totalAmount: currentBid.bidAmount,
                    lastBidder: currentBid.name
                });
            } else {
                res.json({
                    totalAmount: 0,
                    lastBidder: null
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });






        

    return router; 
};
