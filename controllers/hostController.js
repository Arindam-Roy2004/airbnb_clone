const Home = require("../models/home");
const user = require("../models/user");
const deleteImage = require("../utils/fileHelper");


exports.getHostHomes = async (req, res, next) => {
  // Home.find()
  // .then(registeredHomes => {
  //   res.render("host/host-home-list", {
  //     registeredHomes: registeredHomes,
  //     pageTitle: "Host Homes List",
  //     currentPage: "host-homes"
  //   });
  // })
  // .catch(err => {
  //   console.log("Error fetching homes:", err);
  //   res.status(500).send("Error loading homes");
  // });
  try {
    const registeredHomes = await Home.find();
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes"
    });
  }
  catch (err) {
    console.log("Error fetching homes:", err);
    res.status(500).send("Error loading homes");
  }
};

exports.getAddHome = async (req, res, next) => {
  // res.render("host/edit-home", {
  //   pageTitle: "Add Home to airbnb",
  //   currentPage: "addHome",
  //   editMode: false,
  //   home: null,
  //   homeId: null,
  // });
  try {
    res.render("host/edit-home", {
      pageTitle: "Add Home to airbnb",
      currentPage: "addHome",
      editMode: false,
      home: null,
      homeId: null,
    });
  }
  catch (err) {
    console.log("Error loading add home page:", err);
    res.status(500).send("Error loading page");
  }
};

exports.postAddHome = async (req, res, next) => {
  const { houseName, price, location, rating, description, id } = req.body;
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).send("No file Uploaded");
  }

  const photoPath = '/uploads/' + req.file.filename;
  console.log("file uploaded at:", photoPath);
  const home = new Home({ houseName, price, location, rating, photoPath, description });
  // home.save()
  //   .then(() => {
  //     console.log("Home added successfully");
  //     res.render("host/home-added", {
  //       pageTitle: "Home Added Successfully",
  //       currentPage: "homeAdded"
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error adding home:", err);
  //     res.status(500).send("Error adding home");
  //   });
  try {
    await home.save();
    console.log("Home added successfully");
    res.render("host/home-added", {
      pageTitle: "Home Added Successfully",
      currentPage: "homeAdded"
    });
  }
  catch (err) {
    console.log("Error adding home:", err);
    res.status(500).send("Error adding home");
  }
};

exports.getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.editing === 'true';

  // Home.findById(homeId)
  //   .then(home => {
  //     if (!home) {
  //       console.log("Home not found for editing");
  //       return res.redirect("/host/host-home-list");
  //     }
  //     console.log("Home found for editing", home);
  //     res.render("host/edit-home", {
  //       pageTitle: "Edit Home",
  //       currentPage: "editHome",
  //       editMode: editMode,
  //       homeId: homeId,
  //       home: home,
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error fetching home:", err);
  //     res.status(500).send("Error loading home");
  //   });
  try {
    const home = await Home.findById(homeId);
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
      home: home,
    });
  }
  catch (err) {
    console.log("Error fetching home:", err);
    res.status(500).send("Error loading home");
  }
}

exports.postEditHome = async (req, res, next) => {
  console.log(req.body);
  const id = req.params.homeId;
  const { houseName, price, location, rating, description } = req.body;
  // Home.findById(id)
  //   .then(home => {
  //     if (!home) {
  //       console.log("Home not found for updating");
  //       return res.redirect("/host/host-home-list");
  //     }
  //     home.houseName = houseName;
  //     home.price = price;
  //     home.location = location;
  //     home.rating = rating;
  //     if (req.file) {
  //       home.photoPath = '/uploads/' + req.file.filename;
  //       console.log("Home photo updated to:", home.photoPath);
  //     }
  //     home.description = description;
  //     return home.save()
  //       .then((result) => {
  //         console.log(result + " Home updated successfully");
  //       })
  //       .catch(err => console.log("Error updating home:", err))
  //     res.redirect("/host/host-home-list");
  //   })
  //   .catch((err) => console.log("Error finding home for update:", err));
  try {
    const home = await Home.findById(id);
    if (!home) {
      console.log("Home not found for updating");
      return res.redirect("/host/host-home-list");
    }
    if(req.file){
      console.log('New file uploaded for home update');

      const oldImagePath = home.photoPath;
      if(oldImagePath){
        await deleteImage(oldImagePath);
      }

      home.photoPath = '/uploads/' + req.file.filename;
      console.log("Home photo updated to:", home.photoPath);
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description = description;
    await home.save();
    console.log("Home updated successfully");
    res.redirect("/host/host-home-list");
  }
  catch (err) {
    console.log("Error updating home:", err);
    res.status(500).send("Error updating home");
  }
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;

  // Home.findByIdAndDelete(homeId)
  //   .then(() => {
  //     console.log("Home deleted successfully");
  //     res.redirect("/host/host-home-list");
  //   })
  //   .catch(err => {
  //     console.log("Error deleting home:", err);
  //     res.status(500).send("Error deleting home");
  //   });
  try{
    const home = await Home.findById(homeId);
    if(!home){
      console.log("Home not found for deletion");
      return res.redirect("/host/host-home-list");
    }
    if(home.photoPath){
      await deleteImage(home.photoPath);
    }
    const deletedhome = await Home.findByIdAndDelete(homeId);
    console.log("Home deleted successfully");
    res.redirect("/host/host-home-list");
  }
  catch(err){
    console.log("Error deleting home:", err);
    res.status(500).send("Error deleting home");
  }
};
