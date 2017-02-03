'use strict';

// Declare app level module which depends on views, and components
angular.module('webApp', [
  'ui.router',
  'webApp.home',
  'webApp.register',
  'webApp.welcome',
  'webApp.addPost'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');
}]);
