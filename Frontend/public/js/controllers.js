'use strict';

/* Controllers */

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
                    toastr.success(response.message, "Success");
                    $location.path('/connexion');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);

app.controller('LoginController', ['UserService', '$location', '$window', 'toastr', 'AuthenticationService', function (UserService, $location, $window, toastr, AuthenticationService) {

    var vm = this;

    vm.LoginUser = LoginUser;

    function LoginUser() {
        vm.dataLoading = true;
        UserService.Login(vm.user)
            .then(function (response) {
                if (response.success) {
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.token = response.token;
                    toastr.success(response.message, "Success");
                    $location.path('/');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);

app.controller('LogoutController', ['$location', '$window', 'toastr', 'AuthenticationService', '$scope', function ($location, $window, toastr, AuthenticationService, $scope) {
    $scope.LogoutUser = function LogoutUser() {
        AuthenticationService.isAuthenticated = false;
        delete $window.sessionStorage.token;
        toastr.success("Vous êtes déconnecté", "Success");
        $location.path('/');
    };
}]);

app.controller('NewsController', ['$scope', 'NewsService', '$location', 'toastr', function ($scope, NewsService, $location, toastr) {

    NewsService.GetAll().then(function (response) {
        $scope.news = response;
    });

}]);

app.controller('NewsDetailsController', ['$scope', '$routeParams', 'NewsService', '$location', 'toastr', function ($scope, $routeParams, NewsService, $location, toastr) {

    NewsService.GetOneNews($routeParams.slug).then(function (response) {
        $scope.news = response;
    });

}]);
