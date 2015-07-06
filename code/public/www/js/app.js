// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
  });
})

.constant("conf", {
        "api": "http://localhost:3000/",
        "photo_url" : "http://kaizwier.de/MP4_imgs/"
})

.config(function($stateProvider, $urlRouterProvider) {
  document.cookie ='id=84e2a6c6-8174-48d9-a67b-df9841a0fe33'
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
