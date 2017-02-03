'use restrict';

angular.module('webApp.register',['ui.router','firebase'])

.controller('registerCtrl',['$scope','$firebaseAuth','$state',function($scope,$firebaseAuth,$state){
  $scope.signUp = function(){
    var username = $scope.user.email;
    var password = $scope.user.password;

    if(username && password){
      var auth = $firebaseAuth();
      auth.$createUserWithEmailAndPassword(username,password)
      .then(function(){
        console.log("User Successfully Created");
        $state.go('login')
        $scope.errMsg = false;
      })
      .catch(function(error){
        $scope.errMsg = true;
        $scope.errorMessage = error.message;
      });
    }
  }
}])
