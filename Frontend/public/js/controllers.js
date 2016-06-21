'use strict';

/* Controllers */

app.controller('MainController', ['$rootScope', '$scope', '$location', '$cookies', function ($rootScope, $scope, $location, $cookies) {

    // Set scope var isLogged depending on token existence
    if ($cookies.get('token'))
        $scope.isLogged = true;
    else
        $scope.isLogged = false;
    $rootScope.$on('userLoggedIn', function () {
        $scope.isLogged = true;
    });
    $rootScope.$on('userLoggedOut', function () {
        $scope.isLogged = false;
    });
}]);

app.controller('FooterController', ['$scope', function ($scope) {
    $scope.currentYear = new Date().getFullYear();
}]);

app.controller('HomeController', function ($scope) {
    // write Ctrl here
});

app.controller('RegisterController', ['UserService', '$location', 'toastr', function (UserService, $location, toastr) {

    var vm = this;

    vm.CreateUser = CreateUser;

    function CreateUser() {
        vm.dataLoading = true;
        UserService.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                   /* toastr.success(response.message, "Success");*/
                    toastr.success("Vous êtes inscrit(e).");
                    $location.path('/connexion');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);

app.controller('LoginController', ['$rootScope', 'UserService', '$location', "$cookies", 'toastr', function ($rootScope, UserService, $location, $cookies, toastr) {

    var vm = this;
    vm.LoginUser = LoginUser;
    function LoginUser() {
        vm.dataLoading = true;
        UserService.Login(vm.user)
            .then(function (response) {
                if (response.success) {
                    // Save the token as a cookie
                    $cookies.put('token', response.token);
                    // Send a broadcast to notify that user is now logged in
                    $rootScope.$broadcast('userLoggedIn');
                  /*  toastr.success(response.message, "Success");*/
                    toastr.success("Vous êtes connecté(e).");
                    $location.path('/');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);

app.controller('LogoutController', ['$rootScope', '$location', '$cookies', 'toastr', '$scope', function ($rootScope, $location, $cookies, toastr, $scope) {
    $scope.LogoutUser = function LogoutUser() {
        // Get cookie
        var token = $cookies.get('token');
        // Remove token
        $cookies.remove('token');
        // Send a broadcast to notify that user is now logged out
        $rootScope.$broadcast('userLoggedOut');
        toastr.success("Vous êtes déconnecté(e).");
        $location.path('/');
    };
}]);

app.controller('NewsController', ['$scope', 'NewsService', '$location', 'toastr', function ($scope, NewsService, $location, toastr) {

    console.log("newsController");

    NewsService.GetAll().then(function (response) {
        $scope.news = response;
    });

}]);

app.controller('PlaylistController', ['$scope', '$cookies', 'PlaylistService', '$location', 'toastr', function ($scope, $cookies, PlaylistService, $location, toastr) {

    PlaylistService.GetAllByUser($cookies.get('token')).then(function (response) {
        $scope.playlists = response;
    });

}]);

app.controller('CreatePlaylistController', ['$scope', '$cookies', 'PlaylistService', '$location', 'toastr', function ($scope, $cookies, PlaylistService, $location, toastr) {

    var vm = this;
    console.log("salut");
    vm.CreatePlaylist = CreatePlaylist;
    function CreatePlaylist() {
        vm.dataLoading = true;
        console.log("here");
        PlaylistService.Create(vm.name, $cookies.get('token'))
            .then(function (response) {
                if (response.success) {
                    // Send a broadcast to notify that user is now logged in
                    /*  toastr.success(response.message, "Success");*/
                    toastr.success("Playlist créée.");
                    $location.path('/playlists');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }

}]);

app.controller('NewsDetailsController', ['$scope', '$routeParams', 'NewsService', '$location', 'toastr', function ($scope, $routeParams, NewsService, $location, toastr) {

    NewsService.GetOneNews($routeParams.slug).then(function (response) {
        // If no news, redirect user to 404 error
        if (response == null)
            $location.path("/404");
        $scope.news = response;
    });

}]);
