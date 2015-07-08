angular.module('starter.services', [])

/**
 * Service zum Anzeigen der Inspirationen
 */
.service('InspirationService', function($http,conf) {
  var getInspiration = function(){
    return $http.get(conf.api + 'inspiration')
  }

  return {
    getInspiration : getInspiration
  }
})

/**
 * Service zum Anzeigen eines bestimmten Rezepts nacht ID
 */
.service('RezeptService', function($http,conf) {
  var rezeptById = function(id){
    return $http.get(conf.api + 'recipe?id='+id)
  }

  return {
    rezeptById : rezeptById
  }
})

/**
 * Service zum Hinzufügen,Löschen und Anzeigen von Rezepten zur Merkliste
 */
.service('MerklistenService', function($http,conf) {
  var toggleMerkliste = function(data){
    return $http.post(conf.api + 'togglemerkliste', data)
  }

  var myFavs = function(){
    return $http.get(conf.api + 'favs') 
  }

  return {
    toggleMerkliste : toggleMerkliste,
    myFavs : myFavs
  }
})

/**
 * Service zum abholen des Profiles
 */
.service('AccountService', function($http,conf) {
  var profil = function(){
    return $http.get(conf.api + 'profil') 
  }

  return {
    profil : profil
  }
})

/**
 * Filter zum formatieren von Kommazahlen
 */
.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return 0;

        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});