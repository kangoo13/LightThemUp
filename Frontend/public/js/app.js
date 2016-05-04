'use strict';


angular.module('LightThemUp', [
  'LightThemUp.controllers', 'ngRoute'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/home.html',
      controller: 'HomeController'
    }).
    when('/inscription', {
      templateUrl: '/register.html',
      controller: 'HomeController'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
