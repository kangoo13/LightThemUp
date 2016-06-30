$(document).ready(function(){
	$('.topnav li a').on('click', function(){
		$('.topnav').removeClass('responsive');
	});
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function displayNav() {
	document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}

$(window).scroll(function() {
	if ($(this).scrollTop() > $(window).height()) {
		$('#scrollToTop').fadeIn('slow');
	} else {
		$('#scrollToTop').fadeOut('slow');
	}
});

$("#scrollToTop").click(function(){
	$('html, body').animate({ scrollTop: 0 }, 'slow');
});


var apiUrl = 'http://95.85.2.100:3000';

app.factory("UserService", function ($http) {

	var service = {};

	service.Create = Create;
	service.Login = Login;
	service.Account = Account;
	service.Update = Update;
	service.Delete = Delete;

	return service;

	function Create(user) {
		return $http.post(apiUrl + '/users', user).then(handleSuccess, handleError);
	}

	function Login(user) {
		return $http.post(apiUrl + '/users/authenticate', user).then(handleSuccess, handleError);
	}

	function Update(id, user, token) {
		var data = $.param(user, true);
		return $http.put(apiUrl + '/users/'+ id, data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function Delete(id, token) {
		return $http.delete(apiUrl + '/users/'+ id, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function Account(id) {
		return $http.get(apiUrl + '/users/' + id).then(handleSuccess, handleError);
	}

	function handleSuccess(res) {
		return res.data;
	}

	function handleError(res) {
		return res.data;
	}
});

app.factory("ContactService", function ($http) {

	var service = {};

	service.Send = Send;

	return service;

	function Send(data) {
		return $http.post(apiUrl + '/contact', data).then(handleSuccess, handleError);
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
		var data = $.param({
			name: name.name
		});
		return $http.post(apiUrl + '/playlists/', data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
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

app.factory("SuccesService", function ($http) {

	var service = {};

	service.GetAllByUser = GetAllByUser;
	service.GetAll = GetAll;

	return service;

	function GetAllByUser(id) {
		return $http.get(apiUrl + '/users/'+id, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token

			}
		}).then(handleSuccess, handleError);
	}
	
	function GetAll()
	{
		return $http.get(apiUrl + '/achievements').then(handleSuccess, handleError);
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

app.directive('ngConfirmClick', [
	function(){
		return {
			link: function (scope, element, attr) {
				var msg = attr.ngConfirmClick || "Are you sure?";
				var clickAction = attr.confirmedClick;
				element.bind('click',function (event) {
					if ( window.confirm(msg) ) {
						scope.$eval(clickAction)
					}
				});
			}
		};
	}])