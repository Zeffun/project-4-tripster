// controllers/hoots.js

const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Trip = require("../models/trip.js");
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

// Create a new trip
router.post("/", async (req, res) => {
    try {
        req.body.user = req.user._id; //the user field for the Trip is the id of the current user
        const trip = await Trip.create(req.body); //create a new trip using the info in req.body
        trip._doc.user = req.user; //before sending back the res, we append a whole user to the user field
        res.status(201).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get all trips created and saved by current user
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id}).sort({ createdAt: "desc" });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add days to a trip
router.put("/:tripId", async (req, res) => {
  try {
      //Find the trip:
      const trip = await Trip.findById(req.params.tripId);
      //Check permissions:
      if (!trip.user.equals(req.user._id)) {
          return res.status(403).send("You're not allowed to do that!");
      };
      // Update trip:
      const updatedTrip = await Trip.findByIdAndUpdate(
          req.params.tripId,
          req.body,
          { new: true }
      );
      // Append req.user to the user property:
      updatedTrip._doc.user = req.user;
      // Issue JSON response:
      res.status(200).json(updatedTrip);
  } catch (error) {
      res.status(500).json(error);
  }
});

// Get specific trip created and saved by current user
router.get("/:tripId", async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.tripId);
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Delete a specific trip created and saved by current user
router.delete("/:tripId", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId);
    
        if (!trip.user.equals(req.user._id)) {
          return res.status(403).send("You're not allowed to do that!");
        }
    
        const deletedTrip = await Trip.findByIdAndDelete(req.params.tripId);
        res.status(200).json(deletedTrip);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;