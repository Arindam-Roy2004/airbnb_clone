const Home = require("../models/home");
const user = require("../models/user");


exports.getHostHomes = (req, res, next) => {
  Home.find()
  .then(registeredHomes => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes"
    });
  })
  .catch(err => {
    console.log("Error fetching homes:", err);
    res.status(500).send("Error loading homes");
  });
};

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editMode: false,
    home: null,
    homeId: null
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl,description, id } = req.body;
  const home = new Home({houseName, price, location, rating, photoUrl, description});
  home.save()
    .then(() => {
      console.log("Home added successfully");
      res.render("host/home-added", {
        pageTitle: "Home Added Successfully",
        currentPage: "homeAdded"
      });
    })
    .catch(err => {
      console.log("Error adding home:", err);
      res.status(500).send("Error adding home");
    });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.editing === 'true';

  Home.findById(homeId)
    .then(home => {
      if (!home) {
        console.log("Home not found for editing");
        return res.redirect("/host/host-home-list");
      }
      console.log("Home found for editing", home);
      res.render("host/edit-home", {
        pageTitle: "Edit Home",
        currentPage: "editHome",
        editMode: editMode,
        homeId: homeId,
        home: home
      });
    })
    .catch(err => {
      console.log("Error fetching home:", err);
      res.status(500).send("Error loading home");
    });
}

exports.postEditHome = (req, res, next) => {
  console.log(req.body);
  // const homeId = req.params.homeId;
  const { houseName, price, location, rating, photoUrl, description, id } = req.body;
  Home.findById(id)
  .then(home=>{
    if(!home){
      console.log("Home not found for updating");
      return res.redirect("/host/host-home-list");
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    home.save()
    .then((result)=>{
      console.log(result+" Home updated successfully");
    })
    .catch(err=>console.log("Error updating home:", err))
    res.redirect("/host/host-home-list");
  })
  .catch((err)=>console.log("Error finding home for update:", err));
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then(() => {
      console.log("Home deleted successfully");
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Error deleting home:", err);
      res.status(500).send("Error deleting home");
    });
};
