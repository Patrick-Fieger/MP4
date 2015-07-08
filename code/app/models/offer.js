/*
	Schema zur Abspeicherung eines Angebotes
 */
var mongoose = require('mongoose'),
	uuid = require('uuid')

var OfferSchema = mongoose.Schema({
    id : {type: String, required: true, unique: true}
    userid : {type: String, required: true},
    food : {type: Array},
    geo : {type: Array}
});

var Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;