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
storeRouter.get("/homes/:hId", storeController.getHomesDetails);

// ADD NEW BOOKING ROUTES
storeRouter.get("/homes/:hId/book", requireLogin, storeController.getBookingPage);
storeRouter.post("/bookings/create", requireLogin, storeController.postCreateBooking);
storeRouter.post("/bookings/delete/:bookingId", requireLogin, storeController.postCancelBooking);

// Existing routes
storeRouter.get("/bookings",requireLogin, storeController.getBookings); 
storeRouter.get("/favourites",requireLogin, storeController.getFavouriteList);
storeRouter.post("/favourites",requireLogin, storeController.postFavouriteList);
storeRouter.post("/favourites/delete/:hId",requireLogin,storeController.postDeleteFavourite);

module.exports = storeRouter;