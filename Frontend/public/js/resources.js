/**
 * Created by aurelienschiltz on 06/05/2016.
 */
var apiUrl = 'http://localhost:3000';



app.factory("UserService", function($http) {

    var service = {};

    service.Create = Create;

    return service;

    function Create(user) {
        return $http.post(apiUrl+'/users', user).then(handleSuccess, handleError);
    }

    function Login(user) {
        return $http.post(apiUrl+'/users', user).then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
});

app.factory("NewsService", function($http) {

    var service = {};

    service.GetAll = GetAll;

    return service;

    function GetAll() {
        return $http.get(apiUrl+'/news').then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
});