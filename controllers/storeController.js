const Home = require("../models/home");
const Booking = require("../models/booking");
// const Favourites = require("../models/favourites");
const user = require("../models/user");

exports.getIndex = async (req, res, next) => {
  console.log("storeController -> session", req.session);
  try {
    const registeredHomes = await Home.find();
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index"
    });
  }
  catch (err) {
    console.log("Error fetching homes:", err);
    res.status(500).send("Error loading homes");
  }
  // Home.find()
  //   .then(registeredHomes => {
  //     res.render("store/index", {
  //       registeredHomes: registeredHomes,
  //       pageTitle: "airbnb Home",
  //       currentPage: "index"
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error fetching homes:", err);
  //     res.status(500).send("Error loading homes");
  //   });
};

exports.getHomes = async (req, res, next) => {
  // Home.find()
  //   .then(registeredHomes => {
  //     res.render("store/home-list", {
  //       registeredHomes: registeredHomes,
  //       pageTitle: "Homes List",
  //       currentPage: "Home"
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error fetching homes:", err);
  //     res.status(500).send("Error loading homes");
  //   });
  try {
    const registeredHomes = await Home.find();
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home"
    });
  }
  catch (err) {
    console.log("Error fetching homes:", err);
    res.status(500).send("Error loading homes");
  }
};


exports.getBookings = async (req, res, next) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
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
    console.log("User Data with Bookings:", userData);

    // Filter out cancelled bookings (optional - remove filter to show all)
    const activeBookings = userData.bookings.filter(b => b.status !== 'cancelled');

    console.log("User bookings:", activeBookings);

    res.render("store/bookings", {
      pageTitle: "My Bookings",
      currentPage: "bookings",
      bookings: activeBookings
    });

  } catch (err) {
    console.log("Error fetching bookings:", err);
    res.render("store/bookings", {
      pageTitle: "My Bookings",
      currentPage: "bookings",
      bookings: []
    });
  }
};

exports.getHomesDetails = async (req, res, next) => {
  // const homeId = req.params.homeId;
  // Home.findById(homeId)
  //   .then(home => {
  //     if (!home) {
  //       return res.status(404).render("store/404", {
  //         pageTitle: "Home Not Found",
  //         currentPage: ""
  //       });
  //     }
  //     res.render("store/home-detail", {
  //       home: home,
  //       pageTitle: "Home Details",
  //       currentPage: "Home"
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error fetching home:", err);
  //     res.status(500).send("Error loading home");
  //   });
  const hId = req.params.hId;

  try {
    const home = await Home.findOne({ hId: hId });
    if (!home) {
      return res.status(404).render("store/404", {
        pageTitle: "Home Not Found",
        currentPage: ""
      });
    }
    else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home"
      });
    }
  }
  catch (err) {
    console.log("Error fetching home:", err);
    res.status(500).send("Error loading home").render("store/404", {
      pageTitle: "Home Not Found",
      currentPage: ""
    });
  }
}
exports.getFavouriteList = async (req, res, next) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  const userId = req.session.user._id;
  // console.log("User ID in favourites:", userId);
  // 
  try {
    const User = await user.findById(userId).populate('favourites');
    if (!User) {
      return res.status(404).render("store/404", {
        pageTitle: "User Not Found",
        currentPage: ""
      });
    }
    const FavHomes = User.favourites;
    return res.render("store/favourite-list", {
      pageTitle: "My Favourites",
      currentPage: "favourites",
      favHomes: FavHomes
    });
  }
  catch (err) {
    console.log("Error fetching favourites:", err);
    res.status(500).send("Error loading favourites");
  }
}

exports.postFavouriteList = async (req, res, next) => {
  // console.log(req.body);
  // const homeId = req.body.homeId;
  // const userId = req.session.user._id;
  // const User = await user.findById(userId);
  // if (User) {
  //   User.favourites.push(homeId);
  //   await User.save();
  // }
  // res.redirect("/favourites");
  try {
    if (!req.body.homeId) return res.status(400).send("Home ID is required");
    const homeId = req.body.homeId;
    if (!req.session.user) return res.status(401).send("User not authenticated");
    const userId = req.session.user._id;

    const User = await user.findById(userId);
    if (!User) return res.status(404).send("User not found");

    if (!User.favourites.includes(homeId)) {
      User.favourites.push(homeId);
      await User.save();
      return res.redirect("/favourites");
    }
    else {
      return res.status(400).send("Home already in favourites");
    }
  }
  catch (err) {
    console.log("Error adding to favourites:", err);
    res.status(500).send("Error adding to favourites");
  }
};

exports.postDeleteFavourite = async (req, res, next) => {
  const hId = req.params.hId;
  // console.log(homeId);
  // const userId = req.session.user._id;
  // const User = await user.findById(userId)
  // if(User){
  //   User.favourites.pull(homeId);
  //   await User.save();
  // }
  // res.redirect("/favourites");
  try {
    if (!hId) return res.status(400).send("Home hId is required");
    
    // Find home by hId to get its _id for favourites array
    const home = await Home.findOne({ hId: hId });
    if (!home) return res.status(404).send("Home not found");
    
    const userId = req.session.user._id;
    if (!userId) return res.status(401).send("User not authenticated");
    const User = await user.findById(userId);

    if (!User) return res.status(404).send("User not found");

    if (User.favourites.includes(home._id)) {
      User.favourites.pull(home._id);
      await User.save();
      return res.redirect("/favourites");
    }
    else {
      return res.status(400).send("Home not in favourites");
    }
  }
  catch (err) {
    console.log("Error removing from favourites:", err);
    res.status(500).send("Error removing from favourites");
  }
};


exports.getBookingPage = async (req, res, next) => {
  try {
    const hId = req.params.hId;
    const home = await Home.findOne({ hId: hId });

    if (!home) {
      return res.status(404).render("store/404", {
        pageTitle: "Home Not Found",
        currentPage: ""
      });
    }

    // Get today's date for min date validation
    const today = new Date().toISOString().split('T')[0];

    res.render("store/reserve", {
      home: home,
      pageTitle: "Book " + home.houseName,
      currentPage: "bookings",
      minDate: today
    });
  } catch (err) {
    console.log("Error loading booking page:", err);
    res.status(500).send("Error loading booking page");
  }
};


exports.postCreateBooking = async (req, res, next) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
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
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  try {
    const bookingId = req.params.bookingId;
    const userId = req.session.user._id;


    await Booking.findByIdAndDelete(bookingId);
    const UserId = await user.findById(userId);


    if (UserId) {
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
