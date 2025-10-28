// Core Module
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
// const {mongoConnect} = require('./utils/databaseUtil');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
// Middleware to check login status
app.use((req, res, next) => {
  console.log(req.get('Cookie'));
  req.isLoggedIn = req.get('Cookie')?.includes('isLoggedIn=true');
  next(); 
})
// Routers
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  }
  else {
    res.redirect("/login");
  }
}
);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
// mongoConnect((client) => {
//   console.log(client);
//   app.listen(PORT, () => {
//     console.log(`Server running on address http://localhost:${PORT}`);
//   });
// });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    })
  })
  .catch(err => console.log(err));
