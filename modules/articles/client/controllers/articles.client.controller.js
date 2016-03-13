'use strict';

// Articles controller

var customersApp = angular.module('articles');
customersApp.controller('ArticlesController', ['$scope', '$stateParams', 'Authentication', 'Articles', '$modal','$log',
  function ($scope, $stateParams, Authentication, Articles, $modal, $log) {
    this.authentication = Authentication;

          // Find a list of Articles
    this.articles = Articles.query();
//open a modal window  to updatee single customer code
    
    this.modalUpdate = function (size,selectedArticle) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
        controller: function ($scope, $modalInstance, article){

          $scope.article = article;

          $scope.ok = function () {
            // if(updateCustomerForm.$valid)
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

  }

]);

customersApp.controller('ArticlesCreateController', ['$scope', 'Articles',
  function ($scope, Articles) {

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
    


  // Create new Article
    //  $scope.create = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'articleForm');

    //     return false;
    //   }

    //   // Create new Article object
    //   var article = new Articles({
    //     firstName: this.firstName,
    //     surName: this.surName,
    //     suburb: this.suburb,
    //     country: this.country,
    //     industry: this.industry,
    //     email: this.email,
    //     phone: this.phone,
    //     referred: this.referred,
    //     channel: this.channel
    //   });

    //   // Redirect after save
    //   article.$save(function (response) {
    //     $location.path('articles/' + response._id);

    //     // Clear form fields
    //     $scope.firstName = '';
    //     $scope.surName = '';
    //     $scope.suburb = '';
    //     $scope.country = '';
    //     $scope.industry = '';
    //     $scope.email = '';
    //     $scope.phone = '';
    //     $scope.referred = '';
    //     $scope.channel = '';
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

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

    // // Update existing Article
    // $scope.update = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'articleForm');

    //     return false;
    //   }

    //   var article = $scope.article;

    //   article.$update(function () {
    //     $location.path('articles/' + article._id);
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    

    // // Find existing Article
    // $scope.findOne = function () {
    //   $scope.article = Articles.get({
    //     articleId: $stateParams.articleId
    //   });
    // };
