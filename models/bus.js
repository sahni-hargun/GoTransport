var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var busSchema = new mongoose.Schema({
    number: Number,
    seats: {
        totalSeats: Number,
        availableSeats: Number,
        seatsInfo: [
            {
                available: Boolean
            }
        ]
    },
    start: {
        location: String,
        time: String
    },
    end: {
        location: String,
        time: String
    },
    via: []
});

// busSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Bus", busSchema);