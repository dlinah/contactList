var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var users = new Schema({
    email : {type: String, unique: true },
    username: String,
    firstName:String,
    lastName:String,
    password: String,
    authorization: String,
    deviceToken: String,
    fingerPrint: String,
});

mongoose.model("users",users);
