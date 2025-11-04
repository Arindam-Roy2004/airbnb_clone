// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/hostController");
const upload = require("../utils/fileUpload");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", upload.single('photo'),hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);

hostRouter.get("/edit-home/:homeId",hostController.getEditHome);
hostRouter.post("/edit-home/:homeId",upload.single('photo'),hostController.postEditHome);
hostRouter.post("/delete-home/:homeId",hostController.postDeleteHome);

module.exports = hostRouter;
