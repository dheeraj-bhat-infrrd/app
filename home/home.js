'use strict';

angular.module('webApp.home',['ui.router','firebase'])

.config(['$stateProvider',function($stateProvider){

  $stateProvider.state('home',{
    url: '/home',
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });

  $stateProvider.state('login',{
    url: '/login',
    templateUrl: 'home/login.html',
    controller: 'homeCtrl'
  });

  $stateProvider.state('register',{
    url: '/register',
    templateUrl: 'register/register.html',
    controller: 'registerCtrl'
  });

  $stateProvider.state('welcome',{
    url: '/welcome',
    templateUrl: 'welcome/welcome.html',
    controller: 'welcomeCtrl'
  });

  
}])

.controller('homeCtrl',['$scope','$firebaseAuth','$state','commonProp',function($scope,$firebaseAuth,$state,commonProp){

    $scope.username = commonProp.getUser();

    $scope.signIn = function(){
    var username = $scope.user.email;
    var password = $scope.user.password;
    var auth = $firebaseAuth();

    auth.$signInWithEmailAndPassword(username,password).then(function(){
      console.log("User Login Successful");
      commonProp.setUser($scope.user.email);
      $state.go('welcome');
      $scope.errMsg = false;
    }).catch(function(error){
      $scope.errorMessage = error.message;
      $scope.errMsg = true;
    });
  }
}])

.service('commonProp',['$state',function($state){
  var user="";
  return{
    getUser: function(){
      return user;
    },
    setUser: function(value){
      user=value;
    }
  };
}])
