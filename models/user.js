var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    dob: {type: Date, default: Date.now},
    email: String,
    bio: String,
    coins: {type: Number, default: 0},
    image: String,
    phoneNumber: Number,
    Post: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
    ]
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);