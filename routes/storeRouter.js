// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

// MIDDLEWARE FOR LOGIN PROTECTION
const requireLogin = (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

// Existing routes
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/homes/:homeId", storeController.getHomesDetails);

// ADD NEW BOOKING ROUTES
storeRouter.get("/homes/:homeId/book", requireLogin, storeController.getBookingPage);
storeRouter.post("/bookings/create", requireLogin, storeController.postCreateBooking);
storeRouter.post("/bookings/delete/:bookingId", requireLogin, storeController.postCancelBooking);

// Existing routes
storeRouter.get("/bookings", requireLogin, storeController.getBookings); 
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.post("/favourites", storeController.postFavouriteList);
storeRouter.post("/favourites/delete/:homeId", storeController.postDeleteFavourite);

module.exports = storeRouter;