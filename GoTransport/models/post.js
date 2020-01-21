var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   }
});

module.exports = mongoose.model("Post", postSchema);