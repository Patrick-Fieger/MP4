var recipe = require('./controller/recipe')

module.exports = function(app){
	app.get('/inspiration', recipe.inspiration)
}