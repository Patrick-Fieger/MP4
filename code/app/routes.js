var recipe = require('./controller/recipe')
var bowief = require('./models/user.js')
module.exports = function(app){
	app.get('/inspiration', recipe.inspiration)
}