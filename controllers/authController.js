const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn,
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
        isLoggedIn: false,
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
        isLoggedIn: false,
        errors: ["Invalid password. Please try again."],
        oldInput: { email }
      });
    }

    // Login successful
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect("/");
  } catch(err) {
    console.error("Login error:", err);
    return res.status(500).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
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
    isLoggedIn: req.isLoggedIn,
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
  check('role')
    .optional()
    .isIn(['host', 'guest'])
    .withMessage('Role must be either host or guest')
    .custom((value, { req }) => {
      if (!value || value.trim() === '') {
        throw new Error('Please select an account type');
      }
      return true;
    })
  ,
  check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and conditions')
    .custom(value => {
      if (value !== 'on') {
        throw new Error('You must accept the terms and conditions');
      }
      return true;
    })
  ,
  (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: req.isLoggedIn,
        errors: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, password, role }
      });
    }
    bcrypt.hash(password, 12)
    .then(hashPassword=>{
      const newUser = new User({ firstName, lastName, email, password: hashPassword, role });
      return newUser.save()
    })
    .then(()=>{
      res.redirect("/login");
    })
    .catch(err=>{
      res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: req.isLoggedIn,
        errors: [err.message],
        oldInput: { firstName, lastName, email, password, role }
      });
    });
  }
];