'use strict';

/* Controllers */

app.controller('MainController', ['$rootScope', '$scope', '$location', '$cookies', function ($rootScope, $scope, $location, $cookies) {

    // Set scope var isLogged depending on token && id existences
    if ($cookies.get('token') && $cookies.get('id'))
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
                    $cookies.put('id', response.id);
                    // Send a broadcast to notify that user is now logged in
                    $rootScope.$broadcast('userLoggedIn');
                    /*  toastr.success(response.message, "Success");*/
                    toastr.success("Vous êtes connecté(e).");
                    $location.path('/');
                } else {
                    toastr.error(response.message, "Impossible de vous connecter.");
                    vm.dataLoading = false;
                }
            });
    }
}]);

app.controller('AccountController', ['UserService', "$cookies", 'toastr', '$location', '$scope', function (UserService, $cookies, toastr, $location, $scope) {

    var vm = this;
    vm.dataLoading = true;
    UserService.Account($cookies.get("id")).then(function (response) {
        if (response) {
            vm.dataLoading = false;
            vm.user = response;
        } else {
            toastr.error("Compte indisponible.");
            $location.path('/');
        }
    });

    vm.UpdateUser = UpdateUser;
    function UpdateUser() {
        vm.dataLoading = true;
        UserService.Update($cookies.get("id"), vm.user, $cookies.get("token"))
        .then(function (response) {
            if (response.success) {
                vm.dataLoading = false;
                toastr.success("Modification réussie.");
                $location.path("/compte");
            } else {
                $location.path('/');
                toastr.error("Modification impossible.");
            }
        });
    }
}]);

app.controller('DeleteUserController', ['$rootScope', 'UserService', "$cookies", 'toastr', '$location', '$scope', function ($rootScope, UserService, $cookies, toastr, $location, $scope) {
    $scope.DeleteUser = function DeleteUser() {
        UserService.Delete($cookies.get("id"), $cookies.get("token")).then(function (response) {
            if (response.success) {
                    // Remove cookies
                    $cookies.remove('token');
                    $cookies.remove('id');
                    // Send a broadcast to notify that user is now logged out
                    $rootScope.$broadcast('userLoggedOut');
                    /*  toastr.success(response.message, "Success");*/
                    toastr.success("Compte supprimé.");
                    $location.path('/');
                } else {
                    toastr.error(response.message, "Impossible de supprimer votre compte.");
                    vm.dataLoading = false;
                }
            });
    };
}]);

app.controller('LogoutController', ['$rootScope', '$location', '$cookies', 'toastr', '$scope', function ($rootScope, $location, $cookies, toastr, $scope) {
    $scope.LogoutUser = function LogoutUser() {
        // Get cookie
        var token = $cookies.get('token');
        // Remove cookies
        $cookies.remove('token');
        $cookies.remove('id');
        // Send a broadcast to notify that user is now logged out
        $rootScope.$broadcast('userLoggedOut');
        toastr.success("Vous êtes déconnecté(e).");
        $location.path('/');
    };
}]);

app.controller('ContactController', ['$scope', 'ContactService', 'toastr', '$location', function ($scope, ContactService, toastr, $location) {

    var vm = this;
    vm.SendForm = SendForm;
    function SendForm() {
        vm.user.captcha = grecaptcha.getResponse();
        ContactService.Send(vm.user)
        .then(function (response) {
            if (response.success) {
                toastr.success(response.message);
                $location.path("/");

            } else {
                toastr.error(response.message);
            }
        });
    }

}]);

app.controller('NewsController', ['$scope', 'NewsService', function ($scope, NewsService) {

    var vm = this;
    vm.dataLoading = true;
    NewsService.GetAll().then(function (response) {
        vm.dataLoading = false;
        $scope.news = response;
    });

}]);


app.controller('CommentsController', ['$scope', '$cookies', '$routeParams', 'CommentsService', 'UserService','toastr', function ($scope, $cookies, $routeParams, CommentsService, UserService, toastr) {

    displayAll();


    UserService.Account($cookies.get('id')).then(function (responseUsers) {
        if (responseUsers) {
            $scope.user = responseUsers;
        } else {
            toastr.error("Compte indisponible.");
        }
    });

    $scope.SendComment = function(data) {
        data.slug = $routeParams.slug;
        data.author = $cookies.get('id');
        CommentsService.SendComment(data, $cookies.get('token'))
        .then(function (response) {
            console.log(response);
            if (response.success) {
                toastr.success(response.message);
                displayAll();
            } else {
                toastr.error(response.message);
            }
        });
    }

    $scope.commentLoading = false;
    function displayAll() {
        CommentsService.GetAll($routeParams.slug).then(function (responseComments) {
            if (responseComments) {
                $scope.comments = responseComments;
                $scope.commentLoading = true;
            }
            else {
                toastr.error("Commentaires indisponibles.");
            }
        });
    }

}]);

app.controller('SuccesController', ['$scope', '$cookies', 'SuccesService', function ($scope,  $cookies, SuccesService) {
    var vm = this;
    vm.dataLoading = true;
    SuccesService.GetAllByUser($cookies.get('id'), $cookies.get('token')).then(function (responseUser) {
        SuccesService.GetAll().then(function (response) {
            vm.dataLoading = false;
            var lockedAchievements = [];
            console.log(response);
            var found;
            for(var i = 0; i < response.length; i++) {
                found = 0;
                for (var j = 0; responseUser.length; j++){
                    if(responseUser[j].name = response[i].name) {
                        found = 1;
                    }
                }
                if (found == 0)
                    lockedAchievements.push(response[i]);
                found = 0;
            }
            $scope.unlockedAchievements = responseUser.achievements;
            $scope.lockedAchievements = lockedAchievements;
        });
    });


}]);


app.controller('NewsDetailsController', ['$scope', '$routeParams', 'NewsService', '$location', 'toastr', function ($scope, $routeParams, NewsService, $location, toastr) {

    var vm = this;
    vm.dataLoading = true;
    NewsService.GetOneNews($routeParams.slug).then(function (response) {
        vm.dataLoading = false;
        // If no news, redirect user to 404 error
        if (response == null)
            $location.path("/404");
        $scope.newsDetails = response;
    });

}]);


app.controller('PlaylistController', ['$scope', '$cookies', 'PlaylistService', function ($scope, $cookies, PlaylistService) {

    var vm = this;
    vm.dataLoading = true;
    PlaylistService.GetAllByUser($cookies.get('token')).then(function (response) {
        vm.dataLoading = false;
        $scope.playlists = response;
    });

}]);


app.controller('AddSongPlaylistController', ['$scope', '$cookies', 'PlaylistService', 'SongService', '$location', 'toastr', function ($scope, $cookies, PlaylistService, SongService, $location, toastr) {

    var vm = this;
    vm.CreatePlaylist = CreatePlaylist;
    SongService.GetAll().then(function (response) {
        $scope.songs = response;
        vm.dataLoading = false;
    });
    function CreatePlaylist() {
        vm.dataLoading = true;
        PlaylistService.Create(vm.playlist, $cookies.get('token'))
            .then(function (response) {
                if (response.success) {
                    toastr.success("Playlist créée.");
                    $location.path('/playlists');
                } else {
                    toastr.error(response.message, "Error");
                    vm.dataLoading = false;
                }
            });
    }
}]);


app.controller('CreatePlaylistController', ['$scope', '$cookies', 'PlaylistService', '$location', 'toastr', function ($scope, $cookies, PlaylistService, $location, toastr) {

    var vm = this;
    vm.CreatePlaylist = CreatePlaylist;
    function CreatePlaylist() {
        vm.dataLoading = true;
        PlaylistService.Create(vm.playlist, $cookies.get('token'))
        .then(function (response) {
            if (response.success) {
                toastr.success("Playlist créée.");
                $location.path('/playlists');
            } else {
                toastr.error(response.message, "Error");
                vm.dataLoading = false;
            }
        });
    }

}]);



app.controller('ShopController', ['$scope', '$cookies', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $cookies, SongService, UserService, $location, toastr) {

    var vm = this;

    SongService.GetAll().then(function (response) {
        $scope.songs = response;
        vm.dataLoading = false;

    });

}]);

app.controller('SongDetailController', ['$scope', '$routeParams', '$cookies', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $routeParams, $cookies, SongService, UserService, $location, toastr) {

    var vm = this;

    SongService.GetOneSong($routeParams.slug).then(function (response) {
        $scope.song = response;
        vm.dataLoading = false;
    });
    UserService.Account($cookies.get('id')).then(function (response) {
        $scope.bought = false;
        for(var i = 0; i < response.songs.length; i++) {
            if (response.songs[i].slug == $routeParams.slug)
                $scope.bought = true;
        }
    });
    vm.RemoveSongFromUser = RemoveSongFromUser;
    vm.AddSongToUser = AddSongToUser;
    function RemoveSongFromUser() {
        vm.dataLoading = true;
        UserService.RemoveSong($scope.song._id, $cookies.get('token')).then(function (response) {
            if (response.success) {
                toastr.success("Musique supprimée.");
                $scope.bought = false;
            } else {
                toastr.error(response.message, "Error");
            }
            vm.dataLoading = false;
        })
    }
    function AddSongToUser()
    {
        vm.dataLoading = true;
        UserService.AddSong($scope.song._id, $cookies.get('token')).then(function (response) {
            if (response.success) {
                toastr.success("Musique ajoutée.");
                $scope.bought = true;
            } else {
                toastr.error(response.message, "Error");
            }
            vm.dataLoading = false;
        })
    }

}]);

