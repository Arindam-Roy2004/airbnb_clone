// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const favDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourites {
  constructor(homeId) {
    this.homeId = homeId;
  }

  static getAllFavs(callback) {
    fs.readFile(favDataPath, (err, data) => {
      if (err) {
        return callback([]);
      }
      else {
        return callback(JSON.parse(data));
      }
    });
  }

  static addToFavourites(homeId, callback) {
    this.getAllFavs((favouritesHomes) => {
      let flag = favouritesHomes.some(fv => fv.homeId == homeId);
      if (!flag) {
        favouritesHomes.push({ homeId: homeId });
        fs.writeFile(favDataPath, JSON.stringify(favouritesHomes),
          (err) => {
            if (err) {
              console.log("Error in adding to favourites", err);
              return callback("Error adding to favourites");
            }
            callback("Added to Favourites");
          });
      }
      else {
        callback("Already in Favourites"); // This executes immediately
      }
    });
  }
  static deleteFromFavourites(homeId,callback){
    this.getAllFavs((favouritesHomes)=>{
      const updatedFavs = favouritesHomes.filter(fv=>fv.homeId!=homeId);
      fs.writeFile(favDataPath,JSON.stringify(updatedFavs),
      (err)=>{
        if (err) {
          console.log("Error deleting from favourites:", err);
        } else {
          console.log("Deleted from favourites successfully");
        }
        callback();
      });
    });
  }
};
