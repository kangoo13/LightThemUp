'use strict';

var app = angular.module('LightThemUp', ['ngRoute', 'ngCookies', 'toastr', 'ngResource', 'ngAnimate']).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'HomeController',
        authorizedAccess: false
    }).when('/inscription', {
        templateUrl: '/inscription.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/connexion', {
        templateUrl: '/connexion.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/news', {
        templateUrl: '/news.html',
        controller: 'NewsController',
        authorizedAccess: true
    }).when('/playlists', {
        templateUrl: '/playlist.html',
        controller: 'PlaylistController',
        authorizedAccess: false
    }).when('/news/:slug', {
        templateUrl: '/news-details.html',
        controller: 'NewsDetailsController',
        authorizedAccess: true
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $location, $cookies) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        var userAuthenticated = $cookies.get('token');

        if (!userAuthenticated && !nextRoute.authorizedAccess && $location.url() != "/connexion") {
            $rootScope.savedLocation = null;
        }

        if (!userAuthenticated && nextRoute.authorizedAccess) {
            /* You can save the user's location to take him back to the same page after he has logged-in */
            $rootScope.savedLocation = $location.url();
            $location.path('/connexion');
        }

        // Redirect the user to saved location if he has logged-in
        if (userAuthenticated && $rootScope.savedLocation) {
            $location.path($rootScope.savedLocation);
            $rootScope.savedLocation = null;
        }

    });
});

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-top-right'
    });
});