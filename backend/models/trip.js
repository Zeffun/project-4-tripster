const mongoose = require("mongoose");

// // placeSchema
// const placeSchema = new mongoose.Schema({
//   name: {
//       type: String,
//       required: true,
//   },
//   location: { 
//     type: String, 
//     required: true ,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: { type: Number },
//   contact: { type: Number },
//   website: { type: String },
// });

// // daySchema
// const daySchema = new mongoose.Schema({
//   date: {
//       type: Date,
//       required: true,
//   },
//   accomodation: placeSchema,
//   places: [placeSchema]
// });

// activitySchema
const activitySchema = new mongoose.Schema({
  activityName: {
    type: String, 
    required: true,
  },
  activityAddress: {
    type: String, 
    required: true,
  },
  activitySummary: {
    type: String
  }
});

// accomodationSchema
const accomodationSchema = new mongoose.Schema({
  accomodationName: {
    type: String, 
    required: true,
  },
  accomodationAddress: {
    type: String, 
    required: true,
  },
  accomodationSummary: {
    type: String
  }
});

// tripSchema
const tripSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tripName: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true
    },
    activities: [activitySchema],
    accomodation: [accomodationSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);