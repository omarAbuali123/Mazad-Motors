const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startPrice: {
        type: Number,
        required: true
    },
    minBidIncrement: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    }
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
