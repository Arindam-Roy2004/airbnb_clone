const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editMode: false,
    home: null,
    homeId: null
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll()
    .then(registeredHomes => {
      res.render("host/host-home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Host Homes List",
        currentPage: "host-homes",
      });
    })
    .catch(err => {
      console.log("Error fetching homes:", err);
      res.status(500).send("Error loading homes");
    });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl,description, id } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description,id);
  home.save()
    .then(() => {
      console.log("Home added successfully");
      res.render("host/home-added", {
        pageTitle: "Home Added Successfully",
        currentPage: "homeAdded",
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

  Home.findbyId(homeId)
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
  const home = new Home(houseName, price, location, rating, photoUrl, description,id);
  
  home.save()
    .then(() => {
      console.log("Home updated successfully");
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Error updating home:", err);
      res.status(500).send("Error updating home");
    });
};

exports.postDeletHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.deleteById(homeId)
    .then(() => {
      console.log("Home deleted successfully");
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Error deleting home:", err);
      res.status(500).send("Error deleting home");
    });
};
