const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    default: null,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  sites: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  activities: {
    type: [String],
    required: true,
  },
  pets: {
    type: Boolean,
    required: true,
  },
},
{ 
    timestamps: true 
});

const Ground = mongoose.model('Ground', groundSchema);

module.exports = Ground;