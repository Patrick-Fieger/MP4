var Food = require('../models/food')
, Rezept = require('../models/recipe')

Rezept.find({},function(err,rezepte){
	for (var i = 0; i < rezepte.length; i++) {
		for (var k = 0; k < rezepte[i].rezept_zutaten.length; k++) {
			
				var food = {
					id : rezepte[i].rezept_zutaten[k].id,
					name : rezepte[i].rezept_zutaten[k].name
				}

				Food.create(food,function(err,ok){
					console.log(food.name + ' angelegt!')
				});
			
		};
	};
});