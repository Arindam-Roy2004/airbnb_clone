const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    errors: [],
    oldInput: {}
  });
}

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({email: email});
    
    if(!user){
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        errors: ["User doesn't exist. Please sign up first."],
        oldInput: { email }
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid){
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        errors: ["Invalid password. Please try again."],
        oldInput: { email }
      });
    }

    // Login successful
    req.session.isLoggedIn = true;
    req.session.user = user;
    
    // Save session before redirect to ensure it persists
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).render("auth/login", {
          pageTitle: "Login",
          currentPage: "login",
          errors: ["An error occurred. Please try again."],
          oldInput: { email }
        });
      }
      res.redirect("/");
    });
  } catch(err) {
    console.error("Login error:", err);
    return res.status(500).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      errors: ["An error occurred. Please try again."],
      oldInput: { email }
    });
  }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
    res.redirect("/login");
  });
}


exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    errors: [],
    oldInput: {}
  });
}

exports.postSignup = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .isAlpha()
    .withMessage('First name must contain only letters'),

  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .isAlpha()
    .withMessage('Last name must contain only letters'),

  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character')
    .trim(),

  check('confirmPassword')
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ,
  (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const role = req.body.role || 'guest';
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        errors: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, password, role }
      });
    }
    
    // Check if user already exists
    User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          errors: ["Email already exists. Please use a different email or login."],
          oldInput: { firstName, lastName, email, password, role }
        });
      }
      return bcrypt.hash(password, 12);
    })
    .then(hashPassword => {
      if (!hashPassword) return; // User already exists, response already sent
      const newUser = new User({ firstName, lastName, email, password: hashPassword, role });
      return newUser.save();
    })
    .then((result) => {
      if (result) {
        res.redirect("/login");
      }
    })
    .catch(err=>{
      console.error("Signup error:", err);
      res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        errors: [err.message],
        oldInput: { firstName, lastName, email, password, role }
      });
    });
  }
];