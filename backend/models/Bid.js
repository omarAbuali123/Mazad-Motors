const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bidAmount: { type: Number, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
