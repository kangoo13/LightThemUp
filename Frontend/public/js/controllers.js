'use strict';

/* Controllers */

app.controller('HomeController', function ($scope) {
    // write Ctrl here
});

app.controller('RegisterController', ['User', '$location', 'toastr', function (User, $location, toastr) {

    var vm = this;

    vm.CreateUser = CreateUser;

    function CreateUser() {
        vm.dataLoading = true;
        User.save({email: vm.user.email, password: vm.user.password}).$promise.then(function(data) {
            toastr.success(data.message, 'Success');
            $location.path('/login');
        }, function(error) {
            toastr.error(error.data.message, 'Error');
            vm.dataLoading = false;
        });
    }
}]);
