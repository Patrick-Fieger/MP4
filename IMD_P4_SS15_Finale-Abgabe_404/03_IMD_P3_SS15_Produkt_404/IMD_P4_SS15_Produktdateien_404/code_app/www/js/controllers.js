angular.module('starter.controllers', [])
/**
 * Inspirations-Controller
 * Zeigt dem Nutzer Inspirationen
 */
.controller('InspirationCtrl', function($scope,$timeout,InspirationService,conf,$http,MerklistenService) {
  InspirationService.getInspiration().success(buildInspiration);

  /**
   * Funktion, wenn "Pull to Refresh" ausgeführt wurde
   */
  $scope.doRefresh = function() {
	InspirationService.getInspiration().success(buildInspiration);
	$scope.$broadcast('scroll.refreshComplete');
  };

  function buildInspiration (data, status, headers, config) {
	var recipes = data.recipes;

	for (var i = 0; i < recipes.length; i++) {
	  var path = recipes[i].rezept_bilder[0];

	  if(recipes[i].rezept_tags.indexOf("vegan") > -1 || recipes[i].rezept_tags.indexOf("Vegan") > -1){
		recipes[i].food_typ = "Vegan"
	  }else if(recipes[i].rezept_tags.indexOf("vegetarisch") > -1 || recipes[i].rezept_tags.indexOf("Vegetarisch") > -1){
		recipes[i].food_typ = "Vegetarisch"
	  }

	  if(path){
		recipes[i].rezept_bilder[0] = conf.photo_url + recipes[i].rezept_show_id + '/' +  path.substring(path.lastIndexOf("/") + 1, path.length);
	  }
	};
	$scope.recipes = recipes;
	$scope.favs = data.favs;
  }

  /**
   * Funktion zum abspeichern in die Merkliste oder löschen aus der Merkliste
   */
  $scope.toggleMerkliste = function($event,id){
	MerklistenService.toggleMerkliste({id : id}).success(function(){
	  if($scope.favs.indexOf(id) > -1){
		for (var i=$scope.favs.length-1; i>=0; i--) {
			if ($scope.favs[i] === id) {
				$scope.favs.splice(i, 1);
			}
		}
	  }else{
		$scope.favs.push(id)
	  }
	});
  }

  $scope.$watch('favs', function() {
	if($scope.favs){
	  for (var i = 0; i < $scope.recipes.length; i++) {
		if($scope.favs.indexOf(parseInt($scope.recipes[i].rezept_show_id)) > -1){
		  $scope.recipes[i].fav = true
		}else{
		  $scope.recipes[i].fav = false
		}
	  };
	}
  },true);
})

/**
 *  Inspirations-Detail-Controller
 *  Zeigt das Rezept an
 */
.controller('InspirationDetailCtrl', function($scope,$stateParams,RezeptService,conf,$ionicActionSheet) {
  var id = $stateParams.recepiId;
  $scope.abstand = [parseInt(Math.random()*100) + 100 , parseInt(Math.random()*100) + 100];

  $scope.abholen = [
	{"id":"25","name":"Tomate(n)","eigenschaft":", gewürfelt","cominfo":"1","ist_basic":"0","menge":"2","einheit":"kleine","target":"_blank","menge_berechnet":2,"has_additional_info":true},
	{"id":"375","name":"Paprika","eigenschaft":", rot, gewürfelt","cominfo":"","ist_basic":"0","menge":"1","einheit":"Stück","menge_berechnet":1,"has_additional_info":false}
  ];

  $scope.einkaufen = [
	{"id":"6059","name":"Spaghetti","eigenschaft":"","cominfo":"","ist_basic":"0","menge":"180","einheit":"g","menge_berechnet":180,"has_additional_info":false},
	{"id":"80","name":"Tomatenmark","eigenschaft":"","cominfo":"","ist_basic":"0","menge":"1.500","einheit":"EL","menge_berechnet":1.5,"has_additional_info":false}
  ]

  RezeptService.rezeptById(id).success(buildRezeptView)
  function buildRezeptView (data, status, headers, config){
	var recipe = data
	var path = recipe.rezept_bilder[0];
	
	if(recipe.rezept_tags.indexOf("vegan") > -1 || recipe.rezept_tags.indexOf("Vegan") > -1){
	  recipe.food_typ = "Vegan"
	}else if(recipe.rezept_tags.indexOf("vegetarisch") > -1 || recipe.rezept_tags.indexOf("Vegetarisch") > -1){
	  recipe.food_typ = "Vegetarisch"
	}

	if(path){
	  recipe.rezept_bilder[0] = conf.photo_url + recipe.rezept_show_id + '/' +  path.substring(path.lastIndexOf("/") + 1, path.length);
	}

	for (var i = 0; i < recipe.rezept_zutaten.length; i++) {
	  recipe.rezept_zutaten[i].menge = recipe.rezept_zutaten[i].menge_berechnet / parseInt(recipe.rezept_portionen);
	};

	for (var i = 0; i < recipe.rezept_zutaten.length; i++) {
		var id = recipe.rezept_zutaten[i].id
		if(id == "25" || id == "375" || id == "6059" || id == "80"){
			recipe.rezept_zutaten.splice(i, 1);
		}    
	};

	recipe.rezept_portionen = parseInt(recipe.rezept_portionen);
	$scope.recipe = recipe;
  }

  $scope.plusPortionen = function(){
	$scope.recipe.rezept_portionen = parseInt($scope.recipe.rezept_portionen) + 1;
  }

  $scope.minusPortionen = function(){
	var min = $scope.recipe.rezept_portionen;

	if(--min !== 0){
		$scope.recipe.rezept_portionen = parseInt($scope.recipe.rezept_portionen) - 1;
	}
	
  }

  $scope.checkNull = function(){
	if($scope.recipe.rezept_portionen == undefined){
		//$scope.recipe.rezept_portionen = 1
	}
  }

  $scope.cookRecipe = function(id){
	var hideSheet = $ionicActionSheet.show({
	  buttons: [
		{ text: 'Lebensmittel zum Einkauf hinzufügen' }
	  ],
	  titleText: 'Rezept kochen',
	  cancelText: 'Schließen',
	  cancel: function() {
	
	  },
	  buttonClicked: function(index) {
		return true;
	  }
	});
  }
})


/**
 * Merklisten-Controller
 * Zeigt die Merkliste in List-Form an
 */
.controller('MerklisteCtrl', function($scope, conf, $ionicPopup, MerklistenService,$timeout) {

  $scope.$on('$ionicView.enter', function(e) {
	MerklistenService.myFavs().success(buildMerkliste)
  });

  $scope.$on('$ionicView.beforeLeave', function(e) {
	$scope.recipes = [];
  });
  
  function buildMerkliste(data, status, headers, config){
	var recipes = data;
	for (var i = 0; i < recipes.length; i++) {
	  var path = recipes[i].rezept_bilder[0];
	  if(path){
		recipes[i].rezept_bilder[0] = conf.photo_url + recipes[i].rezept_show_id + '/' +  path.substring(path.lastIndexOf("/") + 1, path.length);
	  }
	};
	
	$scope.recipes = recipes;
  }
  
  $scope.remove = function(id) {
   var confirmPopup = $ionicPopup.confirm({
	 title: 'Rezept Löschen',
	 template: 'Sicher, dass du dieses krasse Rezept löschen willst?',
	 cancelText: 'Abbrechen'
   });
   confirmPopup.then(function(res) {
	 if(res) {
	   removeItemFromList(id)
	 }
   });
  }

  function removeItemFromList (id) {
	MerklistenService.toggleMerkliste({id : id}).success(function(){
	  for (var i = 0; i < $scope.recipes.length; i++) {
		if($scope.recipes[i].rezept_show_id == parseInt(id)){
		  $scope.recipes.splice(i, 1);
		}
	  };
	});
  }

  $scope.$watch('recipes', function() {
	if($scope.recipes && $scope.recipes.length == 0){
	  // Hier sollte dann stehen das man noch keine Merklisten-Items hat
	}
  },true);
})

.controller('InventarCtrl', function($scope, $stateParams,$ionicPopup) {
  $scope.share = function(){
	showSimpleAlert('Lebensmittel erfolgreich geteilt!',$ionicPopup)
  }

  $scope.remove = function(){
	showSimpleAlert('Lebensmittel erfolgreich gelöscht!',$ionicPopup)
  }
})

.controller('AccountCtrl', function($scope,AccountService,conf) {
 AccountService.profil().success(BuildAccountView)

 function BuildAccountView(data, status, headers, config){
	var profil = data
	profil.Info.avatar = conf.photo_url + profil.Info.avatar
	$scope.profil = profil
 }
})

.controller('WarenCtrl', function($scope) {})
.controller('EinkaufslisteCtrl', function($scope) {})
.controller('NachrichtenCtrl', function($scope) {})
.controller('NachrichtenDetailsCtrl', function($scope) {})
function showSimpleAlert(text,$ionicPopup){
  var alertPopup = $ionicPopup.alert({
	 template: text
  });
}