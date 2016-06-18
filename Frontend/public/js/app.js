'use strict';

var app = angular.module('LightThemUp', ['ngRoute', 'toastr', 'ngResource', 'ngAnimate']).config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/home.html',
      controller: 'HomeController'
    }).
    when('/inscription', {
      templateUrl: '/inscription.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    }).
    when('/connexion', {
      templateUrl: '/connexion.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    }).
    when('/news', {
      templateUrl: '/news.html',
      controller: 'NewsController',
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-top-right'
    });
});
