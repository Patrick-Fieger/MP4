/*
  Schema zur Abspeicherung eines Users
 */
var mongoose = require('mongoose'),
	uuid = require('uuid')

var UserSchema = mongoose.Schema({
  Info: {
    id : {type: String, required: true, unique: true},
    name : {type: String, required: true},
    tel : {type: String},
    avatar : {type: String},
    adress : {type: String},
    zip : {type: String},
    geo : {type : Array}
  },
  Food : {
    fav : {type: Array},
    athome : {type: Array},
    offered : {type : Array}
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;