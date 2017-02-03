'use strict';

angular.module('webApp.addPost',['ui.router'])

.config(['$stateProvider',function($stateProvider){

  $stateProvider.state('addPost',{
    url: '/addPost',
    templateUrl: 'addPost/addPost.html',
    controller: 'addPostCtrl'
  });
}])

.controller('addPostCtrl',['$scope','$firebaseArray','$state','commonProp',function($scope,$firebaseArray,$state,commonProp){


  $scope.username = commonProp.getUser();

  if(!$scope.username){
    $state.go('home');
  }

  var ref = firebase.database().ref().child('Articles');
  $scope.articles = $firebaseArray(ref);

  $scope.createPost = function(){
    var title = $scope.article.titleTxt;
    var post = $scope.article.postTxt;

    $scope.articles.$add({
      title: title,
      post: post
    }).then(function(ref){
      console.log(ref);
      $scope.success=true;
      window.setTimeout(function(){
        $scope.$apply(function(){
          $scope.success = false;
          $scope.article.titleTxt="";
          $scope.article.postTxt="";
        });
      },2000);
    },function(error){
      console.log(error);
    });
  };
}]);
