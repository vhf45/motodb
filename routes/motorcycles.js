var express = require("express");
var router = express.Router();

var Moto = require("../models/motorcycle");

// don't need to put ../middleware/index as index is the default file that node will try and open
var middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
    Moto.find({}, function(err, allMotorcycles){
        if(err){
            console.log(err);
        } else {
            res.render("motorcycles/index", {motorcycles : allMotorcycles});
            }
    });
});

// NEW - POST
router.post("/", middleware.isLoggedIn, function(req, res){
    // res.send("Post Request is Functioning");
    var brand = req.body.brand;
    var model = req.body.model;
    var imageurl = req.body.imageurl;
    var description = req.body.description;


    console.log("REQUEST.USER HERE: " + req.user);
    var author = {
        id:         req.user._id,
        username:   req.user.username
    };

    var newMotorcycle = {
        brand:          brand,
        model:          model,
        imageurl:       imageurl,
        description:    description,
        author:         author
    };

    Moto.create(newMotorcycle, function(err, newlyCreated){
        if(err){
            console.log(err);            
        } else {
            res.redirect("/motorcycles");
            req.flash("success", "Motorcycle added to Database!");
        }
    });
   // motorcycles.push(newMotorcycle);
});

// NEW - GET
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("motorcycles/new");
});

// SHOW
router.get("/:id", function(req, res){
    Moto.findById(req.params.id).populate("comments").exec(function(err, foundMoto){
        if(err){
            console.log(err);
        } else {
            console.log(foundMoto);
            res.render("motorcycles/show", {foundMoto: foundMoto});            
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkSubmissionOwnership, function(req, res){
    // user can only edit their own submissions, so check if user authorised
    // logged in users ID will be compared to Motorcycle submission author ID
    // start by checking if user logged in, (not using isLoggedIn here)

    Moto.findById(req.params.id, function(err, editMoto){
        res.render("motorcycles/edit", {editMoto: editMoto}); 
    });
    // If user logged in, does user ID == Motorcycle submission author ID
    // If not, redirect
});

// UPDATE - html forms don't support put requests so need to do method override
router.put("/:id", middleware.checkSubmissionOwnership, function(req,res){
        Moto.findByIdAndUpdate(req.params.id, req.body, function(err, updatedMoto){
        if(err){
            console.log("UPDATE FAILED");
            console.log(err);
            res.redirect("/motorcycles/" + req.params.id + "/edit");
        } else {
            req.flash("success", "Motorcycle Submission updated!");
            res.redirect("/motorcycles/" + req.params.id);   

        }
        });
});

// DELETE
router.delete("/:id", middleware.checkSubmissionOwnership, function(req, res){
    Moto.findByIdAndRemove(req.params.id, function(err, foundMoto){
        if(err){
            console.log("DELETE FAILED");
            console.log(err);
            res.redirect("/motorcycles/" + req.params.id);  
        } else {
            req.flash("success", "Motorcycle Deleted");
            res.redirect("/motorcycles");            
        }
    });
});

module.exports = router;