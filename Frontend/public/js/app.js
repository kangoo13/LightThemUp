'use strict';


var app = angular.module('LightThemUp', ['ngRoute', 'toastr', 'ngResource']).config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/home.html',
      controller: 'HomeController'
    }).
    when('/inscription', {
      templateUrl: '/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
