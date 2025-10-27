const Home = require("../models/home");
const Favourites = require("../models/favourites");

exports.getIndex = (req, res, next) => {
  Home.find()
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
  Home.find()
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
  Home.findById(homeId)
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
  Favourites.find()
  .populate('homeId')
  .then(fv=>{
    console.log(fv);
    const favHomes = fv.map(f=>f.homeId);
    res.render("store/favourite-list", {
      pageTitle: "My Favourites",
      currentPage: "favourites",
      favHomes: favHomes
    });
  })
}

exports.postFavouriteList = (req,res,next)=>{
  console.log(req.body);
  const homeId = req.body.homeId;
  Favourites.findOne({ homeId: homeId })
  .then(favHome=>{
    if(!favHome){
      const favourite = new Favourites({ homeId: homeId });
      favourite.save()
      .then(()=>{
        console.log("Added to favourites");
      })
      .catch(err=>{
        console.log("Error adding to favourites:", err);
      })
      .finally(()=>{
        res.redirect("/favourites");
      })
    } else {
      console.log("Already in favourites");
      res.redirect("/favourites");
    }
  })
  .catch(err=>{
    console.log("Error finding favourite:", err);
    res.status(500).send("Error processing favourite");
  });
};

exports.postDeleteFavourite = (req,res,next)=>{
  const homeId = req.params.homeId;
  console.log(homeId);
  Favourites.findOneAndDelete({ homeId: homeId })
  .then(()=>{
    console.log("Deleted from favourites");
  })
  .catch(err=>{
    console.log("Error deleting from favourites:", err);
  })
  .finally(()=>{
    res.redirect("/favourites");
  })
};
