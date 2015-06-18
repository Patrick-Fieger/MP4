var request = require('request')
, mongoose = require('mongoose')
, fs = require('fs-extra')
, db = mongoose.connection
, search = ['Schafskäse', 'Tomate', 'Zuchini', 'Gurke', 'Mehl', 'Zucker', 'Salz', 'Kräuter', 'Eier', 'Honig', 'Marmelade', 'Hefe', 'Kartoffeln', 'Fisch', 'Gnoochi', 'Eichbergsalat', 'Kopfsalt', 'Reis', 'Nudeln', 'Oliven', 'Paprika', 'Käse', 'Mais', 'Spargel', 'Ziebeln', 'Knoblauch', 'Tortelini', 'Pilze']
, anzahl = 15


var RezeptSchema = mongoose.Schema({
	rezept_id : { type : String },
	rezept_show_id : { type : String },
	rezept_name : { type : String },
	rezept_name2 : { type : String },
	rezept_zubereitung : { type : String },
	rezept_portionen : { type : String },
	rezept_preparation_time : { type : Number },
	rezept_cooking_time : { type : Number },
	rezept_resting_time : { type : Number },
	rezept_schwierigkeit : { type : String },
	rezept_kcal : { type : String },
	rezept_zutaten : { type : Object },
	rezept_tags : { type : Object },
	rezept_user_portionen : { type : String },
	rezept_votes : { type : Object },
	rezept_statistik : { type : Object },
	rezept_bilder : { type : Object }
});

var Rezept = mongoose.model('Rezept', RezeptSchema);
mongoose.connect('mongodb://127.0.0.1:27017/chefkoch');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {console.log('Connected to DB');});

var api_url = "http://api.chefkoch.de/api/1.1/api-recipe-search.php?"
var api_rezept_url = "http://api.chefkoch.de/api/1.2/api-recipe.php?ID="

function searchRecep(string){
	request(api_url + 'Suchbegriff=' + string + '&i=0&z=1&m=0&o=0&t=&limit=' + anzahl, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		var json = JSON.parse(body)

	  		for (var i = 0; i < json.result.length; i++) {
	  			getRecepie(json.result[i].RezeptShowID);		
	  		};
	  }
	});
}

function getRecepie(id){
	request(api_rezept_url + id, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		var json = JSON.parse(body).result[0];
	  		var images = [];
	   	 	var deleteArray = ['rezept_user_id','rezept_user_name','rezept_datum','rezept_videos',"show_more_collections_link","rezept_in_rezeptsammlung","rezeptsammlungen_link","rezept_zutaten_is_basic","rezept_frontend_url"];
	   	 	for (var i = 0; i < deleteArray.length; i++) {
	   	 		delete json[deleteArray[i]]
	   	 	};

	   	 	if(json.rezept_bilder !== undefined){
				for (var i = 0; i < json.rezept_bilder.length; i++) {
					if(i < 4){
						images.push(json.rezept_bilder[i]['960x720'].file);
					}
				};

				delete json['rezept_bilder']; 
				json.rezept_bilder = images;
				saveImages(json.rezept_bilder,json.rezept_show_id);
	   	 	}
	   	 	json.rezept_bilder = images;
	   	 	var rezept = new Rezept(json)
	   	 	Rezept.create(rezept,function(err, roletype){
				if(err){
					console.log(err)
				}else{
					console.log('Datenbank____')
				}
			});
	  }
	});
}

var download = function(uri, filename,id, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', function(){
    	fs.move(filename, __dirname + '/photos/' + id + '/' + filename , function(err) {
    		console.log('done!')
    	});
    });
  });
};

function saveImages(images,id){
	for (var i = 0; i < images.length; i++) {
		var filenameplit = images[i].split('/')
		var filename = filenameplit[filenameplit.length-1];
		download(images[i], filename,id)
	};
}

function initChefkoch(){
	for (var i = 0; i < search.length; i++) {
		searchRecep(search[i]);
	};	
}

initChefkoch();