const mongoose = require("mongoose");

// tripSchema
const tripSchema = new mongoose.Schema({
  tripName: {
    type: String,
    required: true,
  },
  travellerCount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  days: [daySchema]
});

// daySchema
const daySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    accomodation: placeSchema,
    places:  [placeSchema]
});

// placeSchema
const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: { 
      type: String, 
      required: true ,
    },
    description: {
      type: String,
      required: true,
    },
    price: { type: Number },
    contact: { type: Number },
    website: { type: String },
});

module.exports = mongoose.model("Trip", tripSchema);