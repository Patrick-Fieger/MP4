angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Rezept 1',
    face: 'http://static.chefkoch-cdn.de/ck.de/cms-uploads/chefkoch/2786/Couscoussalat_PrintFeb_598.jpg'
  }, {
    id: 1,
    name: 'Rezept 2',
    face: 'http://static.chefkoch-cdn.de/ck.de/cms-uploads/chefkoch/2786/Couscoussalat_PrintFeb_598.jpg'
  },{
    id: 2,
    name: 'Rezept 3',
    face: 'http://static.chefkoch-cdn.de/ck.de/cms-uploads/chefkoch/2786/Couscoussalat_PrintFeb_598.jpg'
  }, {
    id: 3,
    name: 'Rezept 4',
    face: 'http://static.chefkoch-cdn.de/ck.de/cms-uploads/chefkoch/2786/Couscoussalat_PrintFeb_598.jpg'
  }, {
    id: 4,
    name: 'Rezept 5',
    face: 'http://static.chefkoch-cdn.de/ck.de/cms-uploads/chefkoch/2786/Couscoussalat_PrintFeb_598.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('InspirationService', function($http,conf) {
  var getInspiration = function(){
    return $http.get(conf.api + 'inspiration')
  }

  return {
    getInspiration : getInspiration
  }
});
