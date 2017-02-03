'use strict';

angular.module('webApp.addPost',['ui.router'])

.config(['$stateProvider',function($stateProvider){

  $stateProvider.state('addPost',{
    url: '/addPost',
    templateUrl: 'addPost/addPost.html',
    controller: 'addPostCtrl'
  });
}])

.controller('addPostCtrl',['$scope','$firebaseArray',function($scope,$firebaseArray){

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
    },function(error){
      console.log(error);
    });
  };
}]);
