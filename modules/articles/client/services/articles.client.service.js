'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles')

.factory('Articles', ['$resource',
  function ($resource) {
    return $resource('api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])


.factory('Notify', ['$rootScope',function ($rootScope) {
   
  var notify = {};
  notify.sendMsg = function(msg, data) {
    data = data || {};
    $rootScope.$emit(msg, data);

    console.log('message sent');
  };

  notify.getMsg = function(msg, func, scope){

    var unbind = $rootScope.$on(msg, func);

    if(scope){
      scope.$on('destroy', unbind);
    }
  };
  return notify;

}
]);
