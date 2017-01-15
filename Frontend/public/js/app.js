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
			xfbml: true,
			version: 'v2.8'
		});

		fbButton = document.getElementById('fb-button');
		fbButton.innerHTML = '<div id="fb-button" class="fb-like" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'
		setTimeout("FB.XFBML.parse(fbButton)", 1100);
	};

	(function(d){
    // load the Facebook javascript SDK

	    var js,
	    id = 'facebook-jssdk',
	    ref = d.getElementsByTagName('script')[0];

	    if (d.getElementById(id)) {
	      return;
	    }

	    js = d.createElement('script');
	    js.id = id;
	    js.async = true;
	    js.src = "//connect.facebook.net/en_US/sdk.js";

	    ref.parentNode.insertBefore(js, ref);
	}(document));
});

app.config(function (toastrConfig) {
	angular.extend(toastrConfig, {
		positionClass: 'toast-top-right',
		timeOut: "2500",
		newestOnTop: true
	});
});
