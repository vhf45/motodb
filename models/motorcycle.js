
var mongoose = require("mongoose");

// create new Schema
var motoSchema = new mongoose.Schema({
    brand:  String,
    model: String,
    imageurl: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }]
});

// compile Schema into model
// Model name in quotes ("Moto"), should be the singular version of model
// var Moto = mongoose.model("Moto", motoSchema);

module.exports = mongoose.model("Moto", motoSchema);