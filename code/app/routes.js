var recipe = require('./controller/recipe')
,	user = require('./controller/user')


module.exports = function(app){
	app.get('/inspiration', recipe.inspiration)
	app.get('/recipe', recipe.rezeptById)
	app.get('/favs', user.favs)
	app.get('/profil', user.profil)
	app.post('/togglemerkliste', user.toggleMerkliste)
}