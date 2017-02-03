'use strict';

angular.module('webApp.welcome',['ui.router','firebase'])

.controller('welcomeCtrl',['$scope','commonProp','$firebaseArray','$firebaseObject',function($scope,commonProp,$firebaseArray,$firebaseObject){
  $scope.username = commonProp.getUser();

  var ref = firebase.database().ref().child('Articles');
  $scope.articles = $firebaseArray(ref);

  $scope.editPost = function(id){
    var ref = firebase.database().ref().child('Articles/' + id);
    $scope.editPostData = $firebaseObject(ref);

  };

  $scope.updatePost = function(id){
    var ref = firebase.database().ref().child('Articles/' + id);
    ref.update({
      title: $scope.editPostData.title,
      post: $scope.editPostData.post
    }).then(function(ref){
      $("#editModal").modal('hide');
    },function(error){
      console.log(error);
    });
  };

  $scope.deleteCnf = function(article){
    $scope.deleteArticle = article;
  };

  $scope.deletePost = function(deleteArticle){
    $scope.articles.$remove(deleteArticle);
    $("#deleteModal").modal('hide');
  }
}])
