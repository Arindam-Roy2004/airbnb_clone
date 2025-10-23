const Home = require("../models/home");
const Favourites = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req,res,next) => {
  Home.fetchAll((registeredHomes)=>{
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  });
}

exports.getHomesDetails = (req,res,next)=>{
  const homeId = req.params.homeId;
  Home.findbyId(homeId,(home)=>{
    if(!home){
      return res.status(404).render("store/404",{
        pageTitle: "Home Not Found",
        currentPage: "",
      }); 
    }
    else{
      res.render("store/home-detail",{
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    }
  });
}

exports.postFavouriteList = (req,res,next)=>{
  console.log(req.body);
  Favourites.addToFavourites(req.body.homeId,(msg)=>{
    console.log(msg);
    res.redirect("/favourites");
  });
};
