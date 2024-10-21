const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
        required: true
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    bidTime: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
