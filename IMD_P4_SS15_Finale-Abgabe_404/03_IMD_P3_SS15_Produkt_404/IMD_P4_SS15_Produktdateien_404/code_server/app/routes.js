/**
 * Http-Request verteilung auf die verschiedenen Controller
 */

var recipe = require('./controller/recipe')
,	user = require('./controller/user')
,	shop = require('./controller/shop')


module.exports = function(app){
	app.get('/inspiration', recipe.inspiration)
	app.get('/recipe', recipe.rezeptById)
	app.get('/favs', user.favs)
	app.get('/profil', user.profil)
	app.post('/togglemerkliste', user.toggleMerkliste);
	app.get('/arduino',shop.arduino);
	app.get('/einkauf',shop.einkauf);
}