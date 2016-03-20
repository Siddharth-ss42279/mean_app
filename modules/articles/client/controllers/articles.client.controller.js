'use strict';

// Articles controller

var customersApp = angular.module('articles');
customersApp.controller('ArticlesController', ['$scope', '$stateParams', 'Authentication', 'Articles', '$modal','$log',
  function ($scope, $stateParams, Authentication, Articles, $modal, $log) {
    this.authentication = Authentication;

          // Find a list of Articles
    this.articles = Articles.query();

//open a modal window  to create single customer code
    
    this.modalCreate = function (size) {
      
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/articles/client/views/create-article.client.view.html',
        controller: function ($scope, $modalInstance){



          $scope.ok = function () {
            //if(this.updateCustomerForm.$valid)
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };    



//open a modal window  to updatee single customer code
    
    this.modalUpdate = function (size,selectedArticle) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
        controller: function ($scope, $modalInstance, article){

          $scope.article = article;

          $scope.ok = function () {
            //if(this.updateCustomerForm.$valid)
            $modalInstance.close($scope.article);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          article: function () {
            return selectedArticle;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };    

        // Remove existing Article
    this.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in this.articles) {
          if (this.articles[i] === article) {
            this.articles.splice(i, 1);
          }
        }
      } else {
        this.article.$remove(function () {

        });
      }
    };


  }

]);

customersApp.controller('ArticlesCreateController', ['$scope', 'Articles',
  function ($scope, Articles) {

 //Create new Article
    this.create = function (isValid) {
      // Create new Article object
      var article = new Articles({
        firstName: this.firstName,
        surName: this.surName,
        suburb: this.suburb,
        country: this.country,
        industry: this.industry,
        email: this.email,
        phone: this.phone,
        referred: this.referred,
        channel: this.channel
      });

      // Redirect after save
      article.$save(function (response) {

        // Clear form fields
        $scope.firstName = '';
        $scope.surName = '';
        $scope.suburb = '';
        $scope.country = '';
        $scope.industry = '';
        $scope.email = '';
        $scope.phone = '';
        $scope.referred = '';
        $scope.channel = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


  }
]);




customersApp.controller('ArticlesUpdateController', ['$scope', 'Articles',
  function ($scope, Articles) {
    // Update existing Article
    this.update = function (updatedArticle) {

      var article = updatedArticle;

      article.$update(function () {

        location.path('articles/' + article._id);
        console.log('now calling put method');

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }
]);
    


customersApp.directive('customerList', [function(){
  return {
    restrict :'E',
    transclude: true,
    templateUrl: 'modules/articles/client/views/customer-list-template.html',
    link: function(scope, element,attrs){

    }
  };

}]);

 

    // // Remove existing Article
    // $scope.remove = function (article) {
    //   if (article) {
    //     article.$remove();

    //     for (var i in $scope.articles) {
    //       if ($scope.articles[i] === article) {
    //         $scope.articles.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.article.$remove(function () {
    //       $location.path('articles');
    //     });
    //   }
    // };


