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
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.editing === 'true';

  Home.findbyId(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      res.redirect("/host/host-home-list");
    }
    else {
      console.log("Home found for editing", home);
      res.render("host/edit-home", {
        pageTitle: "Edit Home",
        currentPage: "editHome",
        editMode: editMode,
        homeId: homeId,
        home: home
      });
    }
  })
}

exports.postEditHome = (req, res, next) => {
  console.log(req.body);
  const homeId = req.params.homeId;
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = homeId;
  home.save();

  return res.redirect("/host/host-home-list");
}

exports.postDeletHome = (req,res,next)=>{

  const homeId = req.params.homeId;

  Home.deleteById(homeId);

  res.redirect("/host/host-home-list");
}
