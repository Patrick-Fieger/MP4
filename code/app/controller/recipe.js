/**
 * Recipe-Controller
 * Sucht dem User Inspirationen
 * Findet Rezepte bei ihrer ID und zeigt sie an
 */

var Recipe = require('../models/recipe')
,	User = require('../models/user')
, 	id = require('../../config/id')

function inspiration (req,res){
	Recipe.find({},function(err,recipes){
		User.findById(id,function(err,user){
			
			var r = recipes
			var back = {
				favs : user.Food.fav,
				recipes : []
			};
			var randomInt = makeUniqueRandom(recipes.length)

			for (var i = 0; i < 10; i++) {
				back.recipes.push(r[randomInt[i]])
			};

			res.send(back).status(200).end();
		})
		
	});
}

function makeUniqueRandom(number) {
	var uniqueRandoms = [];
	for (var i = 0; i < number; i++) {
	    uniqueRandoms.push(i);
	}
    
    return shuffle(uniqueRandoms);
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function rezeptById(req,res){
	var id = req.query.id
	Recipe.findOne({rezept_show_id : id},function(err,recipe){
		if(!err){
			res.send(recipe).status(200).end();
		}else{
			res.status(500).end();
		}
	})
}



module.exports = {
	inspiration : inspiration,
	rezeptById : rezeptById
}