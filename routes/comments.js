
var express = require("express");
var router = express.Router({mergeParams: true});

var Moto        = require("../models/motorcycle");
var Comment     = require("../models/comment");

// don't need to put ../middleware/index as index is the default file that node will try and open
var middleware = require("../middleware");

// NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res){
    Moto.findById(req.params.id, function(err, motorcycle){
        if(err){
            console.log(err);
            res.redirect("/motorcycles/" + req.params.id);
        } else {
            res.render("comments/newcomment", {motorcycle: motorcycle});            
        }
    });
});

// POST COMMENT
router.post("/", middleware.isLoggedIn, function(req, res){
        Moto.findById(req.params.id, function(err, motorcycle){
        if(err){
            console.log(err);
            res.redirect("/motorcycles/" + req.params.id);
        } else {
            console.log(req.body.comment);
            // DON'T NEED TO DO VAR = BLAH BLAH BLAH IF YOU USE AN ARRAY
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);            
                } else {
                    // add username and ID to comment
                    // there will always be a req.user here as we must successfully run isLoggedIn() function on this route to get here
                    console.log(req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    motorcycle.comments.push(comment);
                    motorcycle.save();
                    req.flash("success", "Comment added to Database");
                    res.redirect("/motorcycles/" + req.params.id);
                }
            });
        }
    });
});

// EDIT COMMENT - GET
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/editcomment", {motorcycle_id: req.params.id, comment: foundComment}); 
        }
    });
});

// EDIT COMMENT - POST
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment update successfull!");
            res.redirect("/motorcycles/" + req.params.id);   

        }
        });
});

// DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");  
        } else {
            req.flash("success", "Comment delete successfull!");
            res.redirect("/motorcycles/" + req.params.id);            
        }
    });
});

module.exports = router;



// DON'T NEED TO DO VAR = BLAH BLAH BLAH IF YOU USE AN ARRAY
/* 
    var brand = req.body.brand;
    var model = req.body.model;
    var imageurl = req.body.imageurl;
    var description = req.body.description;
    var newMotorcycle = {
        brand:          brand,
        model:          model,
        imageurl:       imageurl,
        description:    description
    };
    Moto.create(newMotorcycle, function(err, newlyCreated){
        if(err){
            console.log(err);            
        } else {
            res.redirect("/motorcycles");
        }*/

