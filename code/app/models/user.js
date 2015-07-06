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



// var user_data = {
//   Info: {
//     id : uuid.v4(),
//     name : "Patrick Fieger",
//     tel : "017678883900",
//     avatar : 'avatar/ich.jpg',
//     adress : 'Breitgasse 1',
//     zip : '69493',
//     geo : [49.5125390,8.6568010]
//   },
//   Food : {
//     fav : [],
//     athome : [],
//     offered : []
//   }
// }

// User.create(user_data,function(){
//   console.log('user added')
// })