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
    }).when('/compte', {
        templateUrl: '/compte.html',
        controller: 'AccountController',
        controllerAs: 'vm',
        authorizedAccess: true
    }).when('/equipe', {
        templateUrl: '/equipe.html',
        authorizedAccess: false
    }).when('/contact', {
        templateUrl: '/contact.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/boutique', {
        templateUrl: '/boutique.html',
        controller: 'ShopController',
        controllerAs: 'vm',
        authorizedAccess: true
    }).when('/boutique/all', {
        templateUrl: '/boutique-all-songs.html',
        controller: 'ShopAllSongsController',
        controllerAs: 'vm',
        authorizedAccess: true
    }).when('/songs/:slug', {
        templateUrl: '/song-details.html',
        controller: 'SongDetailController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/news', {
        templateUrl: '/news.html',
        controller: 'NewsController',
        controllerAs: 'vm',
        authorizedAccess: true
    }).when('/news/:slug', {
        templateUrl: '/news-details.html',
        controller: 'NewsDetailsController',
        controllerAs: 'vm',
        authorizedAccess: true
    }).when('/succes', {
        templateUrl: '/mes-succes.html',
        controller: 'SuccesController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/mes-musiques', {
        templateUrl: '/mes-musiques.html',
        controller: 'MySongsController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/playlists', {
        templateUrl: '/playlist.html',
        controller: 'PlaylistController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/playlists/:slug/ajout', {
        templateUrl: '/playlist-ajout-musique.html',
        controller: 'AddSongPlaylistController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).when('/playlists/create', {
        templateUrl: '/create-playlist.html',
        controller: 'CreatePlaylistController',
        controllerAs: 'vm',
        authorizedAccess: false
    }).otherwise({
        redirectTo: '/404',
        templateUrl: '404.html'
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
        positionClass: 'toast-top-right',
        timeOut: "2500",
        newestOnTop: true
    });
});