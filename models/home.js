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
    //this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        const existingHomeIndex = registeredHomes.findIndex(h => h.id == this.id);
        registeredHomes[existingHomeIndex] = this;
      }
      else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) { // read homes from homes.json
    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        return callback([]);
      }
      return callback(JSON.parse(data));
    });
  }

  static findbyId(id, callback) {
    this.fetchAll((registeredHomes) => {
      const home = registeredHomes.find(h => h.id == id);
      callback(home);
    });
  }

  static deleteById(id){
    this.fetchAll((registeredHomes)=>{
      const updatedHomes = registeredHomes.filter(h=>h.id!=id);
      fs.writeFile(homeDataPath,JSON.stringify(updatedHomes),(err)=>{
        console.log("Home Deleted",err);
      })
    });
  }
};
