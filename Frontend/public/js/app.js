'use strict';

var app = angular.module('LightThemUp', ['ngRoute', 'toastr', 'ngResource', 'ngAnimate']).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'HomeController',
        access: {requiredAuthentication: false}
    }).when('/inscription', {
        templateUrl: '/inscription.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: {requiredAuthentication: false}
    }).when('/connexion', {
        templateUrl: '/connexion.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: {requiredAuthentication: false}
    }).when('/news', {
        templateUrl: '/news.html',
        controller: 'NewsController',
        access: {requiredAuthentication: true}
    }).when('/news/:slug', {
        templateUrl: '/news-details.html',
        controller: 'NewsDetailsController',
        access: {requiredAuthentication: true}
    }).otherwise({
        redirectTo: '/',
        access: {requiredAuthentication: false}
    });
    $locationProvider.html5Mode(true);
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function ($rootScope, $location, $window, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
            && !AuthenticationService.isAuthenticated && !$window.localStorage.token) {
            $location.path("/connexion");
        }
    });
});

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-top-right'
    });
});