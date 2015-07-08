// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$http,conf,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    /**
     * Interval um zu checken ob ein Request des Arduinos schon reingekommen ist
     */

    var interval = setInterval(checkEinkauf, 1000); // 2000 ms = start after 2sec 
    function checkEinkauf() {
      $http.get(conf.api + 'einkauf').success(function(data, status, headers, config){

        if(data.alert){
          var confirmPopup = $ionicPopup.alert({
            title: 'Inventaraktualisierung empfangen',
            template: 'Wir haben '+ '<ul><li><strong>- Spaghetti</strong></li><li><strong>- Tomatenmark</strong></li></ul> zu Ihrem Inventar hinzugefügt!'
          });
          confirmPopup.then(function(res) {
            if(res) {
              for (var i = 0; i < $rootScope.einkaufen.length; i++) {
                $rootScope.rest.push($rootScope.einkaufen[i]);                
              };

              $rootScope.einkaufen = []
            }
          });
          clearInterval(interval);
        }
      });
      
    }



    /*
      Faken der Einkaufsliste und des Inventars
     */
    $rootScope.rest = [
      {  
         "id":"23",
         "name":"Frühlingszwiebel",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"0.500",
         "einheit":"Bund",
         "menge_berechnet":0.5,
         "has_additional_info":false
      },
      {  
         "id":"5675",
         "name":"Knoblauchzehen",
         "eigenschaft":", gepresst",
         "cominfo":"1",
         "ist_basic":"0",
         "menge":"3",
         "einheit":false,
         "target":"_blank",
         "menge_berechnet":3,
         "has_additional_info":true
      },
      {  
         "id":"8853",
         "name":"Rapsöl",
         "eigenschaft":", oder Traubenkernöl",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"2",
         "einheit":"TL",
         "menge_berechnet":2,
         "has_additional_info":false
      },
      {  
         "id":"100",
         "name":"Sahne",
         "eigenschaft":", (Soja-), oder Sahne",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"100",
         "einheit":"ml",
         "menge_berechnet":100,
         "has_additional_info":false
      },
      {  
         "id":"273",
         "name":"Schmelzkäse",
         "eigenschaft":", fettarm",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"1.500",
         "einheit":"EL",
         "menge_berechnet":1.5,
         "has_additional_info":false
      },
      {  
         "id":"72",
         "name":"Gemüsebrühe",
         "eigenschaft":", oder Hühnerbrühe",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"150",
         "einheit":"ml",
         "menge_berechnet":150,
         "has_additional_info":false
      },
      {  
         "id":"1097",
         "name":"Rum",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"0",
         "einheit":"n. B.",
         "menge_berechnet":0,
         "has_additional_info":false
      },
      {  
         "id":"73",
         "name":"Milch",
         "eigenschaft":", 1,5% Fett",
         "cominfo":"",
         "ist_basic":"1",
         "menge":"50",
         "einheit":"ml",
         "menge_berechnet":50,
         "has_additional_info":false
      },
      {  
         "id":"266",
         "name":"Rosmarin",
         "eigenschaft":", getrocknet",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"0",
         "einheit":false,
         "menge_berechnet":0,
         "has_additional_info":false
      },
      {  
         "id":"292",
         "name":"Salz und Pfeffer",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"0",
         "einheit":false,
         "menge_berechnet":0,
         "has_additional_info":false
      },
      {  
         "id":"7383",
         "name":"Chiliflocken",
         "eigenschaft":", oder Cayennepfeffer",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"0",
         "einheit":false,
         "menge_berechnet":0,
         "has_additional_info":false
      },
      {  
         "id":"83",
         "name":"Zucker",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"1",
         "menge":"0.500",
         "einheit":"TL",
         "menge_berechnet":0.5,
         "has_additional_info":false
      },
      
      {  
         "id":"203",
         "name":"Saucenbinder",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"0",
         "einheit":"n. B.",
         "menge_berechnet":0,
         "has_additional_info":false
      }
    ]


    $rootScope.abholen = [
    {  
         "id":"25",
         "name":"Tomate(n)",
         "eigenschaft":", gewürfelt",
         "cominfo":"1",
         "ist_basic":"0",
         "menge":"2",
         "einheit":"kleine",
         "target":"_blank",
         "menge_berechnet":2,
         "has_additional_info":true
      },
      {  
         "id":"375",
         "name":"Paprika",
         "eigenschaft":", rot, gewürfelt",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"1",
         "einheit":"Stück",
         "menge_berechnet":1,
         "has_additional_info":false
      }
  ];

  $rootScope.einkaufen = [
    {  
         "id":"6059",
         "name":"Spaghetti",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"180",
         "einheit":"g",
         "menge_berechnet":180,
         "has_additional_info":false
      },
      {  
         "id":"80",
         "name":"Tomatenmark",
         "eigenschaft":"",
         "cominfo":"",
         "ist_basic":"0",
         "menge":"1",
         "einheit":"EL",
         "menge_berechnet":1.5,
         "has_additional_info":false
      }
  ]


  });
})

.constant("conf", {
        "api": "http://46.101.241.120:3000/",
        "photo_url" : "http://46.101.241.120:3000/photos/"
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.inspiration', {
    url: '/inspiration',
    views: {
      'tab-inspiration': {
        templateUrl: 'templates/tab-inspiration.html',
        controller: 'InspirationCtrl'
      }
    }
  })
  .state('tab.inspiration-detail', {
    url: '/inspiration/:recepiId',
    views: {
      'tab-inspiration': {
        templateUrl: 'templates/tab-inspiration-details.html',
        controller: 'InspirationDetailCtrl'
      }
    }
  })

  .state('tab.merkliste', {
      url: '/merkliste',
      views: {
        'tab-merkliste': {
          templateUrl: 'templates/tab-merkliste.html',
          controller: 'MerklisteCtrl'
        }
      }
    })
    .state('tab.merkliste-detail', {
      url: '/merkliste/:recepiId',
      views: {
        'tab-merkliste': {
          templateUrl: 'templates/tab-inspiration-details.html',
          controller: 'InspirationDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  
  .state('tab.einkaufsliste', {
    url: '/einkaufsliste',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-einkaufsliste.html',
        controller: 'EinkaufslisteCtrl'
      }
    }
  })

  .state('tab.nachrichten', {
    url: '/nachrichten',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-nachrichten.html',
        controller: 'NachrichtenCtrl'
      }
    }
  })

  .state('tab.nachrichten-details', {
    url: '/nachrichten/:id',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-nachrichten-details.html',
        controller: 'NachrichtenDetailsCtrl'
      }
    }
  })

  .state('tab.inventar', {
    url: '/inventar',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-inventar.html',
        controller: 'InventarCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/inspiration');
});