/**
 * Created by aurelienschiltz on 06/05/2016.
 */
var apiUrl = 'http://localhost:3000';

app.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false
    }
    return auth;
});

app.factory('TokenInterceptor', function ($q, $window, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                AuthenticationService.isAuthenticated = true;
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});

app.factory("UserService", function ($http) {

    var service = {};

    service.Create = Create;
    service.Login = Login;
    
    return service;

    function Create(user) {
        return $http.post(apiUrl + '/users', user).then(handleSuccess, handleError);
    }

    function Login(user) {
        return $http.post(apiUrl + '/users/authenticate', user).then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
});

app.factory("NewsService", function ($http) {

    var service = {};

    service.GetAll = GetAll;
    service.GetOneNews = GetOneNews;

    return service;

    function GetAll() {
        return $http.get(apiUrl + '/news').then(handleSuccess, handleError);
    }

    function GetOneNews(slug) {
        console.log(slug);
        return $http.get(apiUrl + '/news/' + slug).then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
});