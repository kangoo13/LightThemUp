'use strict';

var apiUrl = "//lightthemup.fr.nf:3000"

/* Controllers */

app.controller('MainController', ['$rootScope', '$scope', '$location', '$cookies', 'UserService', 'toastr',  function ($rootScope, $scope, $location, $cookies, UserService, toastr) {

	if ($cookies.get('token')) {
		UserService.Token($cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				//Nothing here yet
			}
			else {
				// Token isn't valid anymore
				toastr.error("Vous devez vous reconnecter.");
				// Remove cookies
				$cookies.remove('token');
				$cookies.remove('id');
				$scope.isLogged = false;
			}
		});
	}

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
	function getUserInfos() {
		UserService.Account($cookies.get("id")).then(function (response) {
			if (response) {
				vm.dataLoading = false;
				vm.user = response;
			} else {
				toastr.error("Compte indisponible.");
				$location.path('/');
			}
		});
	}
	getUserInfos();

	vm.UpdateUser = UpdateUser;
	function UpdateUser() {
		if (vm.user.password || vm.user.passwordConfirmation) {
			if (!$scope.updateUser.$valid) {
				toastr.error("Les mots de passe ne sont pas identiques.");
				return;
			}
		}
		vm.dataLoading = true;
		var picture = $scope.file;
		UserService.Update($cookies.get("id"), vm.user, picture, $cookies.get("token"))
		.then(function (response) {
			if (response.success) {
				vm.dataLoading = false;
				getUserInfos();
				toastr.success("Modification réussie.");
				$location.path("/compte");
			} else {
				vm.dataLoading = false;
				toastr.error("Modification impossible", response.message);
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

app.controller('SuccesController', ['$scope', '$cookies', 'SuccesService', function ($scope,  $cookies, SuccesService) {
	var vm = this;
	vm.dataLoading = true;
	SuccesService.GetAllByUser($cookies.get('id'), $cookies.get('token')).then(function (responseUser) {
		SuccesService.GetAll().then(function (response) {
			vm.dataLoading = false;
			var lockedAchievements = [];
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


app.controller('NewsDetailsController', ['$scope', '$routeParams', 'NewsService', 'UserService', '$location', 'toastr', '$cookies', function ($scope, $routeParams, NewsService, UserService, $location, toastr, $cookies) {

	var vm = this;
	vm.dataLoading = true;
	NewsService.GetOneNews($routeParams.slug).then(function (response) {
		vm.dataLoading = false;
		// If no news, redirect user to 404 error
		if (response == null)
		$location.path("/404");
		$scope.newsDetails = response;
		$scope.comments = response.comments;
	});

	UserService.Account($cookies.get('id')).then(function (responseUsers) {
		if (responseUsers) {
			$scope.user = responseUsers;
		} else {
			toastr.error("Compte indisponible.");
		}
	});

	$scope.SendComment = function(data) {
		NewsService.SendComment(data, $routeParams.slug, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				// Refresh comments and remove form's message
				NewsService.GetOneNews($routeParams.slug).then(function (response) {
					$scope.comments = response.comments;
					$scope.dataSend.message = "";
					$scope.sendComment.$setPristine();
				});
			} else {
				toastr.error(response.message);
			}
		});
	}

	$scope.EditComment = function(data, idComment) {
		NewsService.EditComment(data, $routeParams.slug, $cookies.get('token'), idComment)
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				// Refresh comments and remove form's message
				NewsService.GetOneNews($routeParams.slug).then(function (response) {
					$scope.comments = response.comments;
				});
			} else {
				toastr.error(response.message);
			}
		});
	}

	$scope.resetEditComment = function(comment) {
		this.editing = false;
		this.dataEdit.message = comment.message;
	}

	$scope.RemoveComment = function(idComment) {
		NewsService.RemoveComment(idComment, $routeParams.slug, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				// Refresh comments and remove form's message
				NewsService.GetOneNews($routeParams.slug).then(function (response) {
					$scope.comments = response.comments;
				});
			} else {
				toastr.error(response.message);
			}
		});
	}

}]);


app.controller('PlaylistController', ['$scope', '$cookies', 'PlaylistService', 'toastr', function ($scope, $cookies, PlaylistService, toastr) {

	var vm = this;

	displayAll();

	function displayAll() {
		vm.dataLoading = true;
		PlaylistService.GetAllByUser($cookies.get('token')).then(function (response) {
			vm.dataLoading = false;
			$scope.playlists = response;
		});
	}

	$scope.RemovePlaylist = function(playlistId) {
		PlaylistService.RemovePlaylist(playlistId, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				displayAll();
			} else {
				toastr.error(response.message);
			}
		});
	}

}]);


app.controller('PlaylistDetailsController', ['$scope', '$routeParams', '$cookies', 'PlaylistService', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $routeParams, $cookies, PlaylistService, SongService, UserService, $location, toastr) {

	var vm = this;
	vm.AddSongToPlaylist = AddSongToPlaylist;
	vm.RemoveSongFromPlaylist = RemoveSongFromPlaylist;
	vm.editPlaylist = editPlaylist;

	vm.dataLoading = true;

	UserService.Account($cookies.get('id')).then(function (response) {
		PlaylistService.GetOneByUser($routeParams.slug, $cookies.get('token')).then(function (playlistUser) {
			$scope.playlist = playlistUser;
			for(var i = 0; i < response.songs.length; i++) {
				response.songs[i].added = false;
				for (var j = 0; j < playlistUser.songs.length; j++)
				{
					if (playlistUser.songs[j].name == response.songs[i].name)
					response.songs[i].added = true;
				}
			}
			$scope.songs = response.songs;
			vm.dataLoading = false;
		});
	});
	function AddSongToPlaylist(idSong)
	{
		vm.dataLoading = true;
		UserService.AddSongToPlaylist(idSong, $routeParams.slug, $cookies.get('token')).then(function (response) {
			if (response.success) {
				toastr.success("Musique ajoutée à la playlist.");
				for (var i = 0; i < $scope.songs.length; i++)
				{
					if ($scope.songs[i]._id == idSong) {
						$scope.songs[i].added = true;
						break;
					}
				}
			} else {
				toastr.error(response.message, "Error");
			}
			vm.dataLoading = false;
		})
	}
	function RemoveSongFromPlaylist(idSong)
	{
		vm.dataLoading = true;
		UserService.RemoveSongFromPlaylist(idSong, $routeParams.slug, $cookies.get('token')).then(function (response) {
			if (response.success) {
				toastr.success("Musique supprimée de la playlist.");
				for (var i = 0; i < $scope.songs.length; i++)
				{
					if ($scope.songs[i]._id == idSong) {
						$scope.songs[i].added = false;
						break;
					}
				}
			} else {
				toastr.error(response.message, "Error");
			}
			vm.dataLoading = false;
		})
	}

	function editPlaylist (playlistId) {
		PlaylistService.EditPlaylist(playlistId, vm.playlist, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				$scope.playlist.name = vm.playlist.name;
				$scope.showEdit = false;
				toastr.success(response.message);
			} else {
				toastr.error(response.message);
			}
		});
	}

	$scope.launchMidi = function(song, id) {
		MIDIjs.play(song);
		$('.launch_button').show();
		$('.stop_button').hide();
		$('#' + id + "_launch").hide();
		$('#' + id + "_stop").css("display", "inline-block");
	};

	$scope.stopMidi = function(id) {
		$('#' + id + "_stop").hide();
		$('#' + id + "_launch").show();
		MIDIjs.stop();
	};

	$scope.$on('$locationChangeStart', function( event ) {
		MIDIjs.stop();
	});
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


app.controller('NewSongController', ['$scope', '$cookies', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $cookies, SongService, UserService, $location, toastr) {

	var vm = this;
	vm.NewSong = NewSong;
	function getUserInfos() {
		UserService.Account($cookies.get("id")).then(function (response) {
			if (response) {
				vm.dataLoading = false;
				vm.user = response;
				vm.song.artist = vm.user.name;
			} else {
				toastr.error("Compte indisponible.");
				$location.path('/');
			}
		});
	}
	getUserInfos();
	function NewSong() {
		vm.dataLoading = true;
		if (!$scope.picture || !$scope.scan) {
			return toastr.error("Merci de bien remplir entièrement le formulaire.");
		}
		vm.song.picture = $scope.picture;
		vm.song.scan = $scope.scan;
		SongService.NewSong(vm.song, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				toastr.success("Musique créée.");
				$location.path('/mes-musiques');
			} else {
				toastr.error(response.message, "Error");
				vm.dataLoading = false;
			}
		});
	}

}]);


app.controller('CommentsController', ['$scope', 'UserService', 'SongService', 'NewsService', 'CommentService', function ($scope, UserService, SongService, NewsService, CommentService) {

	var vm = this;
	$scope.dataLoading = true;
	CommentService.GetLastComments(5).then(function (response) {
		$scope.dataLoading = false;
		var comments = response;
		for (var i = 0; i != comments.length; i++)
		{
			if (comments[i].type == "news") {
				NewsService.GetNewsByComment(comments[i]._id, i).then(function (response) {
					comments[response.index].contentUrl = '/news/'+response.slug;
					comments[response.index].contentName = response.name;
				});
			}
			else if (comments[i].type == "song") {
				SongService.GetSongByComment(comments[i]._id, i).then(function (response) {
					comments[response.index].contentUrl = '/songs/'+response.slug;
					comments[response.index].contentName = response.artist + ' - ' + response.name;
				});
			}
		}
		$scope.recentComments = comments;
	});
}]);

app.controller('LastSongsSideBlockController', ['$scope', 'UserService', 'SongService', function ($scope, UserService, SongService) {

	var vm = this;
	$scope.dataLoading = true;
	SongService.GetNewSongs(5).then(function (response) {
		$scope.newSongsSideBlock = response;
		$scope.dataLoading = false;
	});
}]);

app.controller('ShopController', ['$scope', '$cookies', 'SongService', 'PaypalService', 'toastr', '$window',
function ($scope, $cookies, SongService, PaypalService, toastr, $window) {

	var vm = this;
	vm.dataLoading = true;
	SongService.GetMostBoughtSongs(3).then(function (response) {
		$scope.mostBoughtSongs = response;
	});
	SongService.GetRandomSongs(3).then(function (response) {
		$scope.randomSongs = response;
	});
	SongService.GetNewSongs(3).then(function (response) {
		$scope.newSongs = response;
		vm.dataLoading = false;
	});

	vm.buySong = buySong;
	function buySong(idSong) {
		var method = "paypal";
		$window.location.href = apiUrl + '/paypal/' + idSong + "/" + method + '?token=' + $cookies.get("token");
	}

}]);

app.controller('ShopAllSongsController', ['$scope', '$cookies', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $cookies, SongService, UserService, $location, toastr) {

	var vm = this;
	vm.dataLoading = true;
	SongService.GetAll().then(function (response){
		$scope.songs = response;
		vm.dataLoading = false;
	});

}]);


app.controller('MySongsController', ['$scope', '$cookies', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $cookies, SongService, UserService, $location, toastr) {

	var vm = this;

	vm.dataLoading = true;
	UserService.Account($cookies.get('id')).then(function (response) {
		$scope.songs = response.songs;
		vm.dataLoading = false;
	});

	$scope.launchMidi = function(song, id) {
		MIDIjs.play(song);
		$('.launch_button').show();
		$('.stop_button').hide();
		$('#' + id + "_launch").hide();
		$('#' + id + "_stop").css("display", "inline-block");
	};

	$scope.stopMidi = function(id) {
		$('#' + id + "_stop").hide();
		$('#' + id + "_launch").show();
		MIDIjs.stop();
	};

	$scope.$on('$locationChangeStart', function( event ) {
		MIDIjs.stop();
	});

}]);

app.controller('PaypalController', ['$scope', '$routeParams', '$cookies', 'PaypalService', 'UserService', '$location', 'toastr', function ($scope, $routeParams,$cookies, PaypalService, UserService, $location, toastr) {
	var vm = this;

	vm.dataLoading = true;
	var token = $cookies.get("token");
	var PayerID = $routeParams.PayerID;

	PaypalService.getPaypalConfirmation(token, PayerID).then(function (response) {
		if (!response.success) {
			toastr.error("Le paiement a echoué. Merci de réessayer.");
			vm.dataLoading = false;
			$location.path('/');
		}
		else {
			vm.dataLoading = false;
			toastr.success("Merci pour votre achat ! :)");
			$location.path('/mes-musiques');
		}
	});
}]);

app.controller('SongDetailController', ['$scope', '$routeParams', '$cookies', 'SongService', 'UserService', '$location', 'toastr', function ($scope, $routeParams,$cookies, SongService, UserService, $location, toastr) {

	var vm = this;
	vm.dataLoading = true;

	SongService.GetOneSong($routeParams.slug).then(function (response) {
		$scope.song = response;
		difficultyToStars();
		vm.dataLoading = false;
		$scope.comments = response.comments;
	});

	UserService.Account($cookies.get('id')).then(function (response) {
		$scope.bought = false;
		$scope.user = response;

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

	$scope.SendComment = function(data) {
		SongService.SendComment(data, $routeParams.slug, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				// Refresh comments and remove form's message
				SongService.GetOneSong($routeParams.slug).then(function (response) {
					$scope.comments = response.comments;
					$scope.dataSend.message = "";
					$scope.sendComment.$setPristine();
				});
			} else {
				toastr.error(response.message);
			}
		});
	}

	$scope.EditComment = function(data, idComment) {
		SongService.EditComment(data, $routeParams.slug, $cookies.get('token'), idComment)
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				// Refresh comments and remove form's message
				SongService.GetOneSong($routeParams.slug).then(function (response) {
					$scope.comments = response.comments;
				});
			} else {
				toastr.error(response.message);
			}
		});
	}

	$scope.resetEditComment = function(comment) {
		this.editing = false;
		this.dataEdit.message = comment.message;
	}

	$scope.RemoveComment = function(idComment) {
		SongService.RemoveComment(idComment, $routeParams.slug, $cookies.get('token'))
		.then(function (response) {
			if (response.success) {
				toastr.success(response.message);
				// Refresh comments and remove form's message
				SongService.GetOneSong($routeParams.slug).then(function (response) {
					$scope.comments = response.comments;
				});
			} else {
				toastr.error(response.message);
			}
		});
	}

	$scope.launchMidi = function(song, id) {
		MIDIjs.play(song);
		$('.launch_button').show();
		$('.stop_button').hide();
		$('#' + id + "_launch").hide();
		$('#' + id + "_stop").css("display", "inline-block");
	};

	$scope.stopMidi = function(id) {
		$('#' + id + "_stop").hide();
		$('#' + id + "_launch").show();
		MIDIjs.stop();
	};

	$scope.$on('$locationChangeStart', function( event ) {
		MIDIjs.stop();
	});

	function difficultyToStars() {
		var result = "";
		var i = 0;
		var plainStar = '<img class="starRating" src="/images/plain-star.png" alt="stars for rating difficulty" />';
		var emptyStar = '<img class="starRating" src="/images/empty-star.png" alt="stars for rating difficulty" />';
		while (i < $scope.song.difficulty) {
			result += plainStar;
			i++;
		}
		while (i < 5) {
			result += emptyStar;
			i++;
		}
		$scope.song.difficulty = result;
	}

}]);
