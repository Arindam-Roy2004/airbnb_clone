
exports.getLogin = (req,res,next)=>{
  res.render("auth/login",{
    pageTitle:"Login",
    currentPage:"login",
    isLoggedIn: req.isLoggedIn
  });
}

exports.postLogin = (req,res,next)=>{
  // const email = req.body.email;
  // const password = req.body.password;
  // res.cookie("isLoggedIn",true);
  req.session.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req,res,next)=>{
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
    res.redirect("/login");
  });
}