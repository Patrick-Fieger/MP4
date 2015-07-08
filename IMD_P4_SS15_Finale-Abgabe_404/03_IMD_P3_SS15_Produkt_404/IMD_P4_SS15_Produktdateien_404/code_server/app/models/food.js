/*
	Schema zur Abspeicherung eines Lebensmittels
 */

var mongoose = require('mongoose'),
	uuid = require('uuid')

var FoodSchema = mongoose.Schema({
    id : {type: String, required: true},
    name : {type: String, required: true, unique: true},
    unit : {type: Array}
});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;