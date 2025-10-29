const Home = require("../models/home");
// const Favourites = require("../models/favourites");
const user = require("../models/user");
exports.getIndex = (req, res, next) => {
  console.log("storeController -> session", req.session);
  Home.find()
    .then(registeredHomes => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "index",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null
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
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null
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
    isLoggedIn: req.isLoggedIn,
    user: req.session.user || null
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
          isLoggedIn: req.isLoggedIn,
          user: req.session.user || null
        });
      }
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null
      });
    })
    .catch(err => {
      console.log("Error fetching home:", err);
      res.status(500).send("Error loading home");
    });
}
exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  // console.log("User ID in favourites:", userId);
  const userData = await user.findById(userId).populate('favourites');
  console.log("User Data with Favourites:", userData);
  const favHomes = userData.favourites;
  res.render("store/favourite-list", {
    pageTitle: "My Favourites",
    currentPage: "favourites",
    favHomes: favHomes,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user || null
  });
}

exports.postFavouriteList = async (req, res, next) => {
  console.log(req.body);
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const User = await user.findById(userId);
  if (User) {
    User.favourites.push(homeId);
    await User.save();
  }
  res.redirect("/favourites");
};

exports.postDeleteFavourite = async(req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  const userId = req.session.user._id;
  const User = await user.findById(userId)
  if(User){
    User.favourites.pull(homeId);
    await User.save();
  }
  res.redirect("/favourites");
};
