'use strict';

var app = angular.module('LightThemUp', ['ngRoute', 'ngCookies', 'toastr', 'ngResource', 'ngAnimate', 'ngSanitize' ]);

app.run(function ($rootScope, $location, $cookies, $window) {
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

	$window.fbAsyncInit = function() {
		FB.init({ 
			appId: '1864965117056025',
			cookie: true, 
			xfbml: false,
			version: 'v2.8'
		});
	};

	(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

	$rootScope.$on('$viewContentLoaded', function() {
		setTimeout("FB.XFBML.parse()", 1000);
	});
});

app.config(function (toastrConfig) {
	angular.extend(toastrConfig, {
		positionClass: 'toast-top-right',
		timeOut: "2500",
		newestOnTop: true
	});
});
