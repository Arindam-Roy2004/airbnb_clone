
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
  res.cookie("isLoggedIn",true);
  res.redirect("/");
}