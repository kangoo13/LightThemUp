'use strict';

var app = angular.module('LightThemUp', ['ngRoute', 'toastr', 'ngResource', 'ngAnimate']).config(function ($routeProvider, $locationProvider) {
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
    when('/connexion', {
      templateUrl: '/connexion.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        preventOpenDuplicates: true
    });
});
