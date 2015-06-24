var mongoose = require('mongoose'),
	uuid = require('uuid')

var RecipeSchema = mongoose.Schema({
	rezept_id : { type : String , unique: true},
	rezept_show_id : { type : String },
	rezept_name : { type : String },
	rezept_name2 : { type : String },
	rezept_zubereitung : { type : String },
	rezept_portionen : { type : String },
	rezept_preparation_time : { type : Number },
	rezept_cooking_time : { type : Number },
	rezept_resting_time : { type : Number },
	rezept_schwierigkeit : { type : String },
	rezept_kcal : { type : String },
	rezept_zutaten : { type : Object },
	rezept_tags : { type : Object },
	rezept_user_portionen : { type : String },
	rezept_votes : { type : Object },
	rezept_statistik : { type : Object },
	rezept_bilder : { type : Object }
});

var Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;