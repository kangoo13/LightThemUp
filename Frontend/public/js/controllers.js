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
                    $location.path('/login');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);


app.controller('LoginController', ['UserService', '$location', 'toastr', function (UserService, $location, toastr) {

    var vm = this;

    vm.LoginUser = LoginUser;

    function LoginUser() {
        vm.dataLoading = true;
        UserService.Login(vm.user)
            .then(function (response) {
                if (response.success) {
                    toastr.success(response.message, "Success");
                    $location.path('/login');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);