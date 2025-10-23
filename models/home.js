// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() { // post add-home call this method
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) { // read homes from homes.json
    fs.readFile(homeDataPath, (err, data) => {
      if(err){
        return callback([]);
      }
      return callback(JSON.parse(data));
    });
  }

  static findbyId(id,callback){
    this.fetchAll((registeredHomes)=>{
      const home = registeredHomes.find(h=>h.id==id);
      callback(home);
    });
  }
};
