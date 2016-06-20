'use strict';

var app = angular.module('LightThemUp', ['ngRoute', 'ngCookies', 'toastr', 'ngResource', 'ngAnimate']).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'HomeController',
        authorizedAccess: false
    }).when('/inscription', {
        templateUrl: '/inscription.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
    }).when('/connexion', {
        templateUrl: '/connexion.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    }).when('/news', {
        templateUrl: '/news.html',
        controller: 'NewsController',
        authorizedAccess: true
    }).when('/news/:slug', {
        templateUrl: '/news-details.html',
        controller: 'NewsDetailsController'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $location, $cookies) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        var userAuthenticated = $cookies.get('token');
        /* Check if the user is logged in */
        if (!userAuthenticated && nextRoute.authorizedAccess) {
            /* You can save the user's location to take him back to the same page after he has logged-in */
            $rootScope.savedLocation = currentRoute;
            $location.path('/connexion');
        }
    });
});

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-top-right'
    });
});