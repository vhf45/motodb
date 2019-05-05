// put all middleware functions in here

// to call middleware functions, you need to use dot notation, but with
// the name of the variable you give your 'require(./middleware/index.js) variable
// NOT the name of the object (middlewareObject) in this file

var middlewareObject = {};
var Moto        = require("../models/motorcycle");
var Comment     = require("../models/comment");

middlewareObject.checkSubmissionOwnership = function(req, res, next){
        if(req.isAuthenticated()){
        Moto.findById(req.params.id, function(err, editMoto){
            if(err){
                req.flash("error", "Error finding Motorcycle Submission, please try again.");
                res.redirect("back");
            } else {
                if(editMoto.author.id.equals(req.user._id)){
                    // res.render("motorcycles/edit", {editMoto: editMoto});
                    // we don't always want to edit as we are reusing this function so we use next()
                    next();
                } else {
                    req.flash("error", "You can't change someone else's Submission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in first");
        res.redirect("back");
    }
};


middlewareObject.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Error finding Motorcycle Submission, please try again.");
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)){
                // res.render("motorcycles/edit", {editMoto: editMoto});
                // we don't always want to edit as we are reusing this function so we use next()
                next();
            } else {
                req.flash("error", "You can't change someone else's Comment");
                res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in first");
        res.redirect("back");
    }
};


middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){      // if true
        return next();              // continue to next part of route, such as the callback etc.
    }

    req.flash("error", "Please log in first");
    res.redirect("/login");
};

module.exports = middlewareObject;
