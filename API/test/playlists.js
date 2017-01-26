var chai  = require("chai");
var request = require("supertest");
var express = require("express");
var mongoose = require('mongoose');
var should = require('should');
var config = require('../config');
var path = require('path');
var fs = require('fs');
var url = 'http://lightthemup.fr.nf:3000';

// Variables used in test
var tokenAdmin;
var token;
var emailAdmin = 'admin@admin.fr';
var passwordAdmin = 'Test1234';
var playlistName = "playlistTest";
var emailUser = 'user@test.fr';
var passwordUser = 'Test1234';
var idPlaylist;
var idUser;

describe('Playlists', function() {
	this.timeout(10000);
	before(function(done) {
		mongoose.connect(config.database);
		done();
	});

	it('Should return success trying to save a new user', function(done) {
		var profile = {
			email: emailUser,
			password: passwordUser
		};
		request(url)
		.post('/users')
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("User created !");
			done();
		});
	});

	it('Should return success trying log in an user (as user)', function(done) {
		var profile = {
			email: emailUser,
			password: passwordUser
		};
		request(url)
		.post('/users/authenticate')
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Enjoy your token!");
			json.should.have.property('token');
			token = json.token;
			done();
		});
	});


	it('Should return success trying log in an user (as Admin)', function(done) {
		var profile = {
			email: emailAdmin,
			password: passwordAdmin
		};
		request(url)
		.post('/users/authenticate')
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Enjoy your token!");
			json.should.have.property('token');
			tokenAdmin = json.token;
			done();
		});
	});

	it('Should return users on simple GET (to get idUser)', function(done) {
		request(url)
		.get('/users')
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var jsonData = JSON.parse(res.text);
			for (var i = 0; i < jsonData.length; i++) {
				var users = jsonData[i];
				if (users.email == emailUser)
					idUser = users._id;
			}
			done();
		});
	});

	it('Should return success trying to create a playlist', function(done) {
		var profile = {
			token: tokenAdmin,
			name: playlistName
		};
		request(url)
		.post('/playlists/')
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Playlist created !");
			done();
		});
	});

	it('Should return playlists on simple GET', function(done) {
		request(url)
		.get('/playlists/')
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var jsonData = JSON.parse(res.text);
			for (var i = 0; i < jsonData.length; i++) {
				var playlists = jsonData[i];
				if (playlists.name == playlistName)
					idPlaylist = playlists._id;
			}
			done();
		});
	});

	it('Should return playlist detail (with playlistId) on simple GET', function(done) {
		request(url)
		.get('/playlists/' + idPlaylist)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			done();
		});
	});

	it('Should return error on user editing name of another user playlist', function(done) {
		var profile = {
			token: token,
			name: playlistName + "NEW NAME"
		};
		request(url)
		.put('/playlists/' + idPlaylist)
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(401);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(false);
			json.should.have.property('message');
			json.message.should.equal("Unauthorized.");
			done();
		});
	});

	it('Should return success on user editing name of his playlist', function(done) {
		var profile = {
			token: tokenAdmin,
			name: playlistName + "NEW NAME"
		};
		request(url)
		.put('/playlists/' + idPlaylist)
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Playlist updated !");
			done();
		});
	});

	it('Should return success on user removing his playlist', function(done) {
		var profile = {
			token: tokenAdmin
		};
		request(url)
		.delete('/playlists/' + idPlaylist)
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("The playlist has been deleted.");
			done();
		});
	});

	it('Should return error on user removing another user playlist', function(done) {
		var profile = {
			token: token
		};
		request(url)
		.delete('/playlists/' + idPlaylist)
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(401);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(false);
			json.should.have.property('message');
			json.message.should.equal("Unauthorized.");
			done();
		});
	});

	// TODO: ajout et suppression d'une musique

	it('Should return success on user removing his account', function(done) {
		var profile = {
			token: token
		};
		request(url)
		.delete('/users/' + idUser)
		.send(profile)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("The user has been deleted.");
			done();
		});
	});

	after(function() {
		mongoose.disconnect();
	});

});
