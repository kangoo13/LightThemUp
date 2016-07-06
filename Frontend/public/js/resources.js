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
	service.AddSong = AddSong;
	service.RemoveSong = RemoveSong;
	service.AddSongToPlaylist = AddSongToPlaylist;
	service.RemoveSongFromPlaylist = RemoveSongFromPlaylist;

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

	function AddSongToPlaylist(songId, slug, token)
	{
		var data = $.param({
			idSong: songId
		});
		return $http.post(apiUrl + '/playlists/'+slug, data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function RemoveSongFromPlaylist(songId, slug, token)
	{
		return $http.delete(apiUrl + '/playlists/'+slug+'/'+songId, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function AddSong(songId, token)
	{
		var data = $.param({
			idSong: songId
		});
		return $http.post(apiUrl + '/users/songs/', data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function RemoveSong(songId, token)
	{
		return $http.delete(apiUrl + '/users/songs/'+songId, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
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
	service.SendComment = SendComment;
	service.RemoveComment = RemoveComment;
	service.EditComment = EditComment;
    service.GetNewsByComment = GetNewsByComment;

	return service;

	function GetAll() {
		return $http.get(apiUrl + '/news').then(handleSuccess, handleError);
	}

	function GetOneNews(slug) {
		return $http.get(apiUrl + '/news/' + slug).then(handleSuccess, handleError);
	}

    function GetNewsByComment(idComment) {
        return $http.get(apiUrl + '/news/getNewsFromComment/'+idComment).then(handleSuccess, handleError);
    }

	function SendComment(form, slug, token) {
		var data = $.param(form, true);
		return $http.post(apiUrl + '/news/' + slug + "/comments", data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function EditComment(form, slug, token, id) {
		var data = $.param(form, true);
		return $http.put(apiUrl + '/news/' + slug + "/comments/" + id, data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function RemoveComment(id, slug, token) {
		return $http({
			method: 'DELETE',
			url: apiUrl + '/news/' + slug + "/comments/" + id,
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			},
		}).then(handleSuccess, handleError);
	}

	function handleSuccess(res) {
		return res.data;
	}

	function handleError(res) {
		return res.data;
	}
});

app.factory("CommentService", function ($http) {

	var service = {};

	service.GetLastComments = GetLastComments;

	return service;

	function GetLastComments(nbComments)
	{
		return $http.get(apiUrl + '/comments/lastComments/' + nbComments).then(handleSuccess, handleError);
	}

	function handleSuccess(res) {
		return res.data;
	}

	function handleError(res) {
		return res.data;
	}
});

app.factory("SongService", function ($http) {

	var service = {};

	service.GetAll = GetAll;
	service.GetOneSong = GetOneSong;
	service.GetMostBoughtSongs = GetMostBoughtSongs;
	service.GetRandomSongs = GetRandomSongs;
	service.GetNewSongs = GetNewSongs;
	service.SendComment = SendComment;
	service.RemoveComment = RemoveComment;
	service.EditComment = EditComment;
    service.GetSongByComment = GetSongByComment;

	return service;

	function GetAll() {
		return $http.get(apiUrl + '/songs').then(handleSuccess, handleError);
	}

	function GetOneSong(slug) {
		return $http.get(apiUrl + '/songs/' + slug).then(handleSuccess, handleError);
	}
    
    function GetSongByComment(idComment) {
        return $http.get(apiUrl + '/songs/getSongFromComment/'+idComment).then(handleSuccess, handleError);
    }

	function GetMostBoughtSongs(nbSong)
	{
		return $http.get(apiUrl + '/songs/mostBoughtSongs/' + nbSong).then(handleSuccess, handleError);
	}

	function GetRandomSongs(nbSong)
	{
		return $http.get(apiUrl + '/songs/randomSongs/' + nbSong).then(handleSuccess, handleError);
	}

	function GetNewSongs(nbSong)
	{
		return $http.get(apiUrl + '/songs/newSongs/' + nbSong).then(handleSuccess, handleError);
	}

	function SendComment(form, slug, token) {
		var data = $.param(form, true);
		return $http.post(apiUrl + '/songs/' + slug + "/comments", data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function EditComment(form, slug, token, id) {
		var data = $.param(form, true);
		return $http.put(apiUrl + '/songs/' + slug + "/comments/" + id, data, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function RemoveComment(id, slug, token) {
		return $http({
			method: 'DELETE',
			url: apiUrl + '/songs/' + slug + "/comments/" + id,
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			},
		}).then(handleSuccess, handleError);
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
	service.GetOneByUser = GetOneByUser;
	service.RemovePlaylist = RemovePlaylist;

	return service;

	function GetAllByUser(token) {
		return $http.get(apiUrl + '/playlists/user', {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token

			}
		}).then(handleSuccess, handleError);
	}

	function GetOneByUser(slug, token)
	{
		return $http.get(apiUrl + '/playlists/user/'+slug, {
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

	function RemovePlaylist(playlistId, token)
	{
		return $http.delete(apiUrl + '/playlists/'+ playlistId, {
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				"x-access-token": token
			}
		}).then(handleSuccess, handleError);
	}

	function handleSuccess(res) {
		return res.data;
	}

	function handleError(res) {
		return res.data;
	}
});

app.factory("SuccesService", function ($http) {

	var service = {};

	service.GetAllByUser = GetAllByUser;
	service.GetAll = GetAll;

	return service;

	function GetAllByUser(id, token) {
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
		return res.data;
	}

	function handleError(res) {
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

app.directive('back', ['$window', function($window) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				$window.history.back();
			});
		}
	};
}]);