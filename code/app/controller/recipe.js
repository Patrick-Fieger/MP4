var Recipe = require('../models/recipe.js');

function inspiration (req,res){
	Recipe.find({},function(err,recipes){
		var back = [];
		var randomInt = makeUniqueRandom(recipes.length)

		for (var i = 0; i < 10; i++) {
			back.push(recipes[randomInt[i]])
		};

		res.send(back).status(200).end();
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

module.exports = {
	inspiration : inspiration
}