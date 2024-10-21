const mongoose = require('mongoose');

const carListingSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: {
    type: Number,
    min: [1900, 'سنة السيارة يجب أن تكون أكبر من 1900'],
    max: [new Date().getFullYear(), 'سنة السيارة يجب ألا تتجاوز السنة الحالية']
  },
  mileage: {
    type: Number,
    min: [0, 'المسافة المقطوعة لا يمكن أن تكون سلبية']
  },
  condition: String,
  category: { type: String, required: true },
  images: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  isApproved: { type: Boolean, default: true },
  startingBidPrice: { type: Number, min: [0, 'سعر بداية المزايدة لا يمكن أن يكون سالباً'] }, 
  auctionStartTime: { type: Date, required: true } ,
  auctionEndTime: { type: Date, required: true } 
}, { timestamps: true });

const CarListing = mongoose.model('CarListing', carListingSchema);

module.exports = CarListing;










