var Unit = require('../models/unit')
, Rezept = require('../models/recipe')

Rezept.find({},function(err,rezepte){
	for (var i = 0; i < rezepte.length; i++) {
		for (var k = 0; k < rezepte[i].rezept_zutaten.length; k++) {
			if(rezepte[i].rezept_zutaten[k].einheit){
				var unit = {
					id : i + '_' + k,
					unit : rezepte[i].rezept_zutaten[k].einheit
				}

				Unit.create(unit,function(err,ok){
					console.log(unit.unit + ' angelegt!')
				});
			};
		};
	};
});