// http://motodb-vhf45.c9users.io/
// https://2e551d96b2044107b6902a8410d14a5c.vfs.cloud9.eu-west-1.amazonaws.com/ 

// SETUP
var express     = require("express");
var app         = express();

var Moto        = require("./models/motorcycle");
var seedDB      = require("./seeds");
var Comment     = require("./models/comment");
var User        = require("./models/user");
var flash       = require('connect-flash');

// Storing routes in separate files, need to put app.use(routenamehere) for each route file, see bottom of  this .js file
var commentRoutes       = require("./routes/comments"),
    motorcycleRoutes    = require("./routes/motorcycles"),
    indexRoutes         = require("./routes/index");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require("mongoose");
// connection whilst on hosting db on cloud9
// mongoose.connect("mongodb://localhost:27017/motorcycles", { useNewUrlParser: true });
// development database url
//console.log(process.env.DATABASEURL);
// mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

// backup connection if no environment variable available
var url = process.env.DATABASEURL || "mongodb://localhost:27017/motorcycles";
// var url = "mongodb://localhost:27017/motorcycles"
mongoose.connect(url, { useNewUrlParser: true });

// connection using mongolab
// mongolab url: mongodb://<dbuser>:<dbpassword>@ds151586.mlab.com:51586/motodb
// mongoose.connect("mongodb://timbo:Skyer1.xxx@ds151586.mlab.com:51586/motodb", { useNewUrlParser: true });


// PASSPORT SETUP
// package imports for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local");
// passport-local-mongoose added in User Schema in models directory
app.use(require("express-session")({
    secret: "secret key can be any phrase you choose",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Tell app to use connect-flash
app.use(flash());

// Includes current user on all routes so that we don't need to include
// {currentUser: req.user} in every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


// Below means we don't have to include .ejs filetype on routes
app.set("view engine", "ejs");

// Tell app to use method-override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));



// seed database
// seedDB();

// create directory to store .css files
app.use(express.static(__dirname + "/public"));
// console.log(__dirname);

// Tells program to use required route files
// Can also add argument in below files to prefix route 
// app.use("/motorcycles", commentRoutes);
app.use("/motorcycles/:id/comments", commentRoutes);
app.use("/motorcycles", motorcycleRoutes);
app.use(indexRoutes);

/* 
function testDB(){
   
    Moto.remove({}, function(err){
        if(err){
        console.log(err);
        } else {
        console.log("MOTORCYCLES REMOVED");
        }
    });
    
    Comment.remove({}, function(err){
        if(err){
        console.log(err);
        } else {
        console.log("COMMENTS REMOVED");
        }
    });
    
    User.remove({}, function(err){
        if(err){
        console.log(err);
        } else {
        console.log("USERS REMOVED");
        }
    });

    Moto.find({}, function(err, allMotorcycles){
        if(err){
            console.log(err);
        } else {
            console.log("**************MOTORCYCLES******************");
            console.log(allMotorcycles);
        }
    });
    
    Comment.find({}, function(err, allComments){
        if(err){
            console.log(err);
        } else {
            console.log("**************COMMENTS*********************");
            console.log(allComments);
        }
    });
    
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            console.log("**************USERS************************");
            console.log(allUsers);
        }
    });
}

testDB();
*/

// LISTEN ON PORT 3000, REPLACED WITH process.env.PORT, process.env.IP AS ON C9
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});


// create new Schema
/*
var motoSchema = new mongoose.Schema({
    brand:  String,
    model: String,
    imageurl: String,
    description: String
});
*/

// compile Schema into model
// Model name in quotes ("Moto"), should be the singular version of model
// var Moto = mongoose.model("Moto", motoSchema);

// use Mongoose 'create' method to add initial entry to database, needs callback function passed in as 2nd argument after object
/*
Moto.create({
    brand:      "Honda",
    model:      "NC-750S",
    imageurl:   "https://www.honda.co.uk/content/dam/central/motorcycles/street/nc750s/nc750s%202016/honda-bikes-2016-street-nc750s-006-16x9.jpg/jcr:content/renditions/c4.jpg",
    description: "Great commuter bike, fuel economy in the 80-90 range. Superior low to mid-range torque, for a smooth, comfortable ride."
    
}, function(err, motoc){
    if(err){
        console.log(err);
    } else {
        console.log("Created new Motorcycle entry:");
        console.log(motoc);
    }
});
*/

// don't need hardcoded array as using db now

/*
var motorcycles = [
    
        {brand: "Honda", model: "CBR1000RR", imageurl: "https://photosforclass.com/download/flickr-432332907"},
        {brand: "Suzuki", model: "GSX-S750", imageurl: "https://photosforclass.com/download/flickr-5135049276"},
        {brand: "Kawasaki", model: "Z650", imageurl: "https://photosforclass.com/download/flickr-3603278371"}
        ]; 
*/