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
const errorsController = require("./controllers/errors");

const app = express();

// Trust proxy for production (Vercel, Heroku, etc.)
app.set('trust proxy', 1);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
})

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // true in production, false in development
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax' // 'lax' works better for same-site navigation
  }
}));
// Middleware to check login status from SESSION
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
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

app.use(express.static(path.join(__dirname, 'public')))

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3000;
// mongoConnect((client) => {
//   console.log(client);
//   app.listen(PORT, () => {
//     console.log(`Server running on address http://localhost:${PORT}`);
//   });
// });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('MONGODB_URI:', process.env.MONGODB_URI ? 'Set (hidden for security)' : 'NOT SET!');
  });

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
