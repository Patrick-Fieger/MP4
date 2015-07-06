var User = require('../models/user')
,	id = require('../../config/id')
,	Recipe = require('../models/recipe')

function toggleMerkliste(req,res){
	var merkid = req.body.id
	User.findById(id,function(err,user){
		var index = user.Food.fav.indexOf(merkid);    // <-- Not supported in <IE9
		
		if (index !== -1) {
		    user.Food.fav.splice(index, 1);
		}else{
			user.Food.fav.push(merkid)
		}

		user.save(function(err){
			if(!err){
				res.status(200).end();
			}else{
				res.status(500).end();
			}
		});
	});
}

function favs(req,res){
	User.findById(id,function(err,user){
		var back = []
		if(user.Food.fav.length !== 0){
			Recipe.find({},function(err,recipes){
				for (var i = 0; i < recipes.length; i++) {
					if(user.Food.fav.indexOf(parseInt(recipes[i].rezept_show_id)) > -1){
						back.push(recipes[i])
					}
				};
				res.send(back).status(200).end();
			});
		}else{
			res.send(back).status(200).end();
		}

	})
}


function profil(req,res){
	User.findById(id,function(err,user){
		res.send(user).status(200).end();
	});
}


module.exports = {
	toggleMerkliste : toggleMerkliste,
	favs : favs,
	profil : profil
}