var mongoose = require("mongoose");
var PassportLocalMongoose = require("passport-local-mongoose");

// create new Schema
var userSchema = new mongoose.Schema({
    username:  String,
    password: String,
});

//adds in user methods so you don't have to define them yourself
userSchema.plugin(PassportLocalMongoose);

// compile Schema into model
// Model name in quotes ("Moto"), should be the singular version of model
// var Moto = mongoose.model("Moto", motoSchema);

module.exports = mongoose.model("User", userSchema);
