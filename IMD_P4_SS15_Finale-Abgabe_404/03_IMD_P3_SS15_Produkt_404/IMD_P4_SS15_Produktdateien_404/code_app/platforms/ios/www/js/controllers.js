angular.module('starter.controllers', [])

.controller('InspirationCtrl', function($scope,$timeout,InspirationService,conf,$http,MerklistenService) {

  InspirationService.getInspiration().success(buildInspiration);

  $scope.doRefresh = function() {
    InspirationService.getInspiration().success(buildInspiration);
    $scope.$broadcast('scroll.refreshComplete');
  };


  function buildInspiration (data, status, headers, config) {
	var recipes = data.recipes;

	console.log(recipes)

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

.controller('InspirationDetailCtrl', function($scope,$stateParams,RezeptService,conf,$ionicActionSheet) {
  var id = $stateParams.recepiId;

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

	recipe.rezept_portionen = parseInt(recipe.rezept_portionen)

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



  $scope.onHold = function(e){
	var hideSheet = $ionicActionSheet.show({
	 buttons: [
	   { text: 'Ich möchte dieses Produkt abholen!' }
	 ],
	 cancelText: 'Schließen',
	 cancel: function() {
	 
	 },
	 buttonClicked: function(index) {
	   angular.element(e.target).parent().addClass('active')
	   return true;
	 }
   });
  }
})

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
	 template: 'Sicher, dass du dieses krasse Rezept löschen willst?'
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


.controller('WarenCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {

  });
})

.controller('InventarCtrl', function($scope, $stateParams,$ionicPopup) {
  $scope.share = function(){
	showSimpleAlert('Lebensmittel erfolgreich geteilt! :)',$ionicPopup)
  }


  $scope.remove = function(){
	showSimpleAlert('Lebensmittel erfolgreich gelöscht!',$ionicPopup)
  }

})


.controller('EinkaufslisteCtrl', function($scope) {
  
})

.controller('NachrichtenCtrl', function($scope) {
  
})


.controller('NachrichtenDetailsCtrl', function($scope) {
  
})



.controller('AccountCtrl', function($scope,AccountService,conf) {
 AccountService.profil().success(BuildAccountView)

 function BuildAccountView(data, status, headers, config){
 	var profil = data
 	profil.Info.avatar = conf.photo_url + profil.Info.avatar


 	$scope.profil = profil
 }

});

function showSimpleAlert(text,$ionicPopup){
  var alertPopup = $ionicPopup.alert({
	 // title: 'Don\'t eat that!',
	 template: text
  });
}
