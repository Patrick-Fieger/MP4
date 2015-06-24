var Unit = require('../models/unit')
, Rezept = require('../models/recipe')
, Food = require('../models/food')
var r
var u

// Rezept.find({},function(err,rezepte){
// 	r = rezepte;
// 	Unit.find({},function(err,units){
// 		u = units
// 		for (var i = 0; i < r.length; i++) {
			
// 			for (var k = 0; k < r[i].rezept_zutaten.length; k++) {
// 				var unit_;

// 				for (var j = 0; j < u.length; j++) {
// 					if(r[i].rezept_zutaten[k].einheit == u[j].unit){
// 						unit_ = u[j].id
// 					}
// 				};

// 				Food.update({name: r[i].rezept_zutaten[k].name},{$push: {unit:unit_}},{upsert:true},function(err){
// 					console.log('updated!')
// 				});
// 			}
// 		}
// 	});
// });


// Food.find({},function(err,food){
// 	for (var i = 0; i < food.length; i++) {
		
// 		var uniqueArray = food[i].unit.filter(function(elem, pos) {
// 		    return food[i].unit.indexOf(elem) == pos;
// 		});

// 		food[i].unit = uniqueArray;

// 		food[i].save(function(err,user){
// 			console.log('done')
// 		});

// 	};
// });



