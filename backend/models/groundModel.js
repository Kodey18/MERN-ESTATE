const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema(
  {
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
    pets: {
      type: Boolean,
      required: true,
    },
    tours: {
      type: Boolean,
      required: true,
    },
    rentalEquip: {
      type: Boolean,
      required: true,
    },
    foodService: {
      type: Boolean,
      required: true,
    },
    accommodation: {
      type: String,
      required: true,
    },
    intake: {
      type: Number,
      required: true,
    },
    sites: {
      type: Number,
      required: true,
    },
    Rprice: {
      type: Number,
      required: true,
    },
    Dprice: {
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
    lat: {
      type :Number,
      required:true,
    },
    lng: {
      type :Number,
      required:true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ground = mongoose.model('Ground', groundSchema);

module.exports = Ground;