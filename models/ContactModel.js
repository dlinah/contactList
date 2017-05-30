var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contacts = new Schema({
    email : String,
    mobile:String,
    firstName:String,
    lastName:String,
    userId : {type:Schema.Types.ObjectId, ref:"users"},
    createdAt: {type:Date,default:Date.now},
    relationId:String,
    })

mongoose.model("contacts",contacts);
