// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

storeRouter.get("/homes/:homeId", storeController.getHomesDetails);

storeRouter.post("/favourites", storeController.postFavouriteList);
storeRouter.post("/favourites/delete/:homeId", storeController.postDeleteFavourite);

module.exports = storeRouter;
