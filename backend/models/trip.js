const mongoose = require("mongoose");

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

// daySchema
const daySchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
  },
  accomodation: placeSchema,
  places: [placeSchema]
});

// tripSchema
const tripSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tripName: {
      type: String,
      required: true,
    },
    travellerCount: {
      type: Number,
      required: true,
    },
    days: [daySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);