angular.module('starter.controllers', [])

.controller('InspirationCtrl', function($scope) {})

.controller('InspirationDetailCtrl', function($scope,$stateParams,$ionicActionSheet) {
  $scope.id = $stateParams.recepiId;
  $scope.recipe = {
    heading : "Das ist mein Rezept",
    art : "Vegetarisch"
  }
  $scope.amount = 1;

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

.controller('MerklisteCtrl', function($scope, Chats, $ionicPopup) {
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



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



function showSimpleAlert(text,$ionicPopup){
  var alertPopup = $ionicPopup.alert({
     // title: 'Don\'t eat that!',
     template: text
  });
}
