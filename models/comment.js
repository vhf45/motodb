var mongoose = require("mongoose");

// create new Schema
var commentSchema = new mongoose.Schema({
    text:  String,
    // author: String, author now changed to object so that user is associated with comment and doesn't have to manually enter name each time
    author: {
        id: {
            type:       mongoose.Schema.Types.ObjectId,
            ref:        "User"
        },
        username:       String
    }
});

// compile Schema into model
// Model name in quotes ("Moto"), should be the singular version of model
// var Moto = mongoose.model("Moto", motoSchema);


module.exports = mongoose.model("Comment", commentSchema);