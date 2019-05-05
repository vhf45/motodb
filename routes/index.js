
var express = require("express");
var router = express.Router();
var passport = require("passport");

var User        = require("../models/user");

// ROUTES

// LANDING PAGE
router.get("/", function(req, res){
    res.render("landing");
});

// REGISTER
router.get("/register", function(req, res){
    res.render("register");
});

// REGISTER - POST
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", "Error: " + err.message);
            console.log(err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the Motorcycle Database, " + user.username);
            res.redirect("/motorcycles");

        });
    });
});



// LOGIN
router.get("/login", function(req, res){
   res.render("login");
});


// LOGIN - POST - uses (/route, middleware, callback) format, callback isn't used in this case
router.post("/login", passport.authenticate("local",
    {
    successRedirect: "/motorcycles",
    failureRedirect: "/login"
    }),
    function(req, res){}
);        

// LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});



// isLoggedIn is a function that we will pass as middleware, ie. it will be execute said function immediately before continuing
// we want to add it to the new comments route so that users can only comment when signed in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){      // if true
        return next();              // continue to next part of route, such as the callback etc.
    }
    res.redirect("/login");
}

module.exports = router;