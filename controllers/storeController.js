const Home = require("../models/home");
const Booking = require("../models/booking");
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

// 👇 REPLACE YOUR EXISTING getBookings METHOD WITH THIS
exports.getBookings = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    
    // Get user with populated bookings and home details
    const userData = await user.findById(userId)
      .populate({
        path: 'bookings',
        populate: {
          path: 'home',
          model: 'Home'
        }
      });
    
    // Filter out cancelled bookings (optional - remove filter to show all)
    const activeBookings = userData.bookings.filter(b => b.status !== 'cancelled');
    
    console.log("User bookings:", activeBookings);
    
    res.render("store/bookings", {
      pageTitle: "My Bookings",
      currentPage: "bookings",
      bookings: activeBookings,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user || null
    });
    
  } catch (err) {
    console.log("Error fetching bookings:", err);
    res.render("store/bookings", {
      pageTitle: "My Bookings",
      currentPage: "bookings",
      bookings: [],
      isLoggedIn: req.isLoggedIn,
      user: req.session.user || null
    });
  }
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


exports.getBookingPage = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.findById(homeId);
    
    if (!home) {
      return res.status(404).render("store/404", {
        pageTitle: "Home Not Found",
        currentPage: "",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null
      });
    }
    
    // Get today's date for min date validation
    const today = new Date().toISOString().split('T')[0];
    
    res.render("store/reserve", {
      home: home,
      pageTitle: "Book " + home.houseName,
      currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user || null,
      minDate: today
    });
  } catch (err) {
    console.log("Error loading booking page:", err);
    res.status(500).send("Error loading booking page");
  }
};


exports.postCreateBooking = async (req, res, next) => {
  try {
    const { homeId, checkIn, checkOut } = req.body;
    const userId = req.session.user._id;
    
    // Fetch the home to get price
    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).send("Home not found");
    }
    
    // Calculate number of nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    // Calculate total price (price per night × number of nights)
    const totalPrice = nights * home.price;
    
    // Create new booking
    const booking = new Booking({
      home: homeId,
      user: userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice: totalPrice,
      status: 'confirmed'
    });
    
    // Save booking
    await booking.save();
    
    // Add booking reference to user
    const User = await user.findById(userId);
    if (User) {
      User.bookings.push(booking._id);
      await User.save();
    }
    
    console.log("Booking created successfully:", booking);
    res.redirect("/bookings");
    
  } catch (err) {
    console.log("Error creating booking:", err);
    res.status(500).send("Error creating booking");
  }
};


exports.postCancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.session.user._id;
    

    await Booking.findByIdAndDelete(bookingId);
    const UserId = await user.findById(userId);


    if(UserId){
      UserId.bookings.pull(bookingId);
      await UserId.save();
    }
    
    console.log("Booking cancelled:", bookingId);
    res.redirect("/bookings");
    
  } catch (err) {
    console.log("Error cancelling booking:", err);
    res.status(500).send("Error cancelling booking");
  }
};
