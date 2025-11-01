// Core Module
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
// const {mongoConnect} = require('./utils/databaseUtil');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
})

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: false // Set to true in production with HTTPS
  }
}));
// Middleware to check login status from SESSION
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  // console.log("Session:", req.session);
  // console.log("isLoggedIn:", req.isLoggedIn);
  next();
})
// Routers
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  if (req.session.user.role !== 'host') {
    return res.redirect("/"); // Redirect guests away from host pages
  }
  next();
});
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
