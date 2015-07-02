angular.module('starter.controllers', [])

.controller('InspirationCtrl', function($scope) {})

.controller('InspirationDetailCtrl', function($scope,$stateParams) {
  $scope.id = $stateParams.recepiId;
  $scope.recipe = {
    heading : "Das ist mein Rezept",
    art : "Vegetarisch"
  }
  $scope.amount = 1;
  $scope.rezepte = true;
  $scope.toggleView = function(){
    $scope.rezepte = !$scope.rezepte;
  }

  angular.extend($scope, {
    center: {
        autoDiscover: true
    },
    markers: {},
    layers: {
        baselayers: {
            mapbox_light: {
                name: 'Mapbox Light',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                type: 'xyz',
                layerOptions: {
                    apikey: 'pk.eyJ1IjoicGF0cmlja2ZpZWdlciIsImEiOiI5ZHRLTGpzIn0.BXY_La-J8qE0Jf3lwofrrw',
                    mapid: 'patrickfieger.klafa28i'
                }
            }
        }
    }
  });

})

.controller('MerklisteCtrl', function($scope, Chats, $ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    $scope.chats = Chats.all();
  });
  
  
  $scope.remove = function(chat) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Rezept Löschen',
     template: 'Sicher, dass du dieses krasse Rezept löschen willst?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       Chats.remove(chat);
     }
   });
  }
})


.controller('WarenCtrl', function($scope, $stateParams, Chats) {
  $scope.$on('$ionicView.enter', function(e) {

  });
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
