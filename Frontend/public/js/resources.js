var apiUrl = 'http://localhost:3000';

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


app.factory("PlaylistService", function ($http) {

    var service = {};

    service.GetAllByUser = GetAllByUser;
    service.Create = Create;

    return service;

    function GetAllByUser(token) {
        return $http.get(apiUrl + '/playlists/user', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                "x-access-token": token
            }
        }).then(handleSuccess, handleError);
    }

    function Create(name, token) {
        return $http.post(apiUrl + '/playlists/', name, token).then(handleSuccess, handleError);
    }

    function handleSuccess(res) {
        console.log("success");
        return res.data;
    }

    function handleError(res) {
        console.log("error");
        return res.data;
    }
});

