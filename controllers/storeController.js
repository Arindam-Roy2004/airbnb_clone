const Home = require("../models/home");
const Favourites = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then(registeredHomes => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch(err => {
      console.log("Error fetching homes:", err);
      res.status(500).send("Error loading homes");
    });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then(registeredHomes => {
      res.render("store/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Homes List",
        currentPage: "Home",
      });
    })
    .catch(err => {
      console.log("Error fetching homes:", err);
      res.status(500).send("Error loading homes");
    });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findbyId(homeId)
    .then(home => {
      if (!home) {
        return res.status(404).render("store/404", {
          pageTitle: "Home Not Found",
          currentPage: "",
        });
      }
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    })
    .catch(err => {
      console.log("Error fetching home:", err);
      res.status(500).send("Error loading home");
    });
}
exports.getFavouriteList = (req,res,next)=>{
  Favourites.getAllFavs((favourites)=>{
    Home.fetchAll((registeredHomes)=>{
      const favHomes = registeredHomes.filter(h=>favourites.some(fv=>fv.homeId==h._id));
      res.render("store/favourite-list", {
        favHomes: favHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
}

exports.postFavouriteList = (req,res,next)=>{
  console.log(req.body);
  Favourites.addToFavourites(req.body.homeId,(msg)=>{
    console.log(msg);
    res.redirect("/favourites");
  });
};

exports.postDeleteFavourite = (req,res,next)=>{
  const homeId = req.params.homeId;
  Favourites.deleteFromFavourites(homeId,()=>{
    res.redirect("/favourites");
  });
};
