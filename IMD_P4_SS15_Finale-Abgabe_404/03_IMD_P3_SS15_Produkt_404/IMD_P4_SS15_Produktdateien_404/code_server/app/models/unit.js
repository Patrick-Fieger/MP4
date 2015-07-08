/*
	Schema zur Abspeicherung einer Einheit
 */
var mongoose = require('mongoose'),
	uuid = require('uuid')

var UnitSchema = mongoose.Schema({
    id : {type: String, required: true},
    unit : {type: String, required: true, unique: true, dropDups: true}
});

var Unit = mongoose.model('Unit', UnitSchema);
module.exports = Unit;