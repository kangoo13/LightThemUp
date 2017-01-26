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
var songName = "songTest";
var artistName = "artistTest";
var priceTest = "42";
var difficultyTest = "69";
var pictureTest = "a";
var fileTest = "b";
var emailUser = 'user@test.fr';
var passwordUser = 'Test1234';
var idSong;
var idUser;

describe('Songs', function() {
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

	it('Should return error trying to create a song as an user', function(done) {
		var profile = {
			token: token,
			name: songName,
			artist: artistName,
			picture: pictureTest,
			price: priceTest,
			file: fileTest,
			difficulty: difficultyTest
		};
		request(url)
		.post('/songs/')
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

	it('Should return success trying to create a song as an Admin', function(done) {
		var profile = {
			token: tokenAdmin,
			name: songName,
			artist: artistName,
			picture: pictureTest,
			price: priceTest,
			file: fileTest,
			difficulty: difficultyTest
		};
		request(url)
		.post('/songs/')
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
			json.message.should.equal("Song created !");
			done();
		});
	});

	it('Should return songs on simple GET', function(done) {
		request(url)
		.get('/songs/')
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var jsonData = JSON.parse(res.text);
			for (var i = 0; i < jsonData.length; i++) {
				var songs = jsonData[i];
				if (songs.name == songName)
					idSong = songs._id;
			}
			done();
		});
	});

	it('Should return song detail (with songId) on simple GET', function(done) {
		request(url)
		.get('/songs/' + idSong)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			done();
		});
	});

	it('Should return error on user editing name of a song', function(done) {
		var profile = {
			token: token,
			name: songName + "NEW NAME"
		};
		request(url)
		.put('/songs/' + idSong)
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

	it('Should return success on admin editing name of a song', function(done) {
		var profile = {
			token: tokenAdmin,
			name: songName + "NEW NAME"
		};
		request(url)
		.put('/songs/' + idSong)
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
			json.message.should.equal("Song updated !");
			done();
		});
	});

	it('Should return error on user updating song\'s picture', function(done) {
		request(url)
		.post('/songs/' + idSong + "/picture/")
		.field('token', token)
		.attach('picture', __dirname + '/avatar.jpg')
		.end(function(err, res) {
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

	it('Should return success on Admin updating song\'s picture', function(done) {
		request(url)
		.post('/songs/' + idSong + "/picture/")
		.field('token', tokenAdmin)
		.attach('picture', __dirname + '/avatar.jpg')
		.end(function(err, res) {
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Your image has been saved");
			done();
		});
	});

	it('Should return error on user updating song\'s file', function(done) {
		request(url)
		.post('/songs/' + idSong + "/music/")
		.field('token', token)
		.attach('music', __dirname + '/song.mid')
		.end(function(err, res) {
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


	it('Should return success on Admin updating song\'s file', function(done) {
		request(url)
		.post('/songs/' + idSong + "/music/")
		.field('token', tokenAdmin)
		.attach('music', __dirname + '/song.mid')
		.end(function(err, res) {
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Your music has been saved");
			done();
		});
	});

	it('Should return error on Admin updating song\'s preview', function(done) {
		request(url)
		.post('/songs/' + idSong + "/preview/")
		.field('token', token)
		.attach('preview', __dirname + '/song.mid')
		.end(function(err, res) {
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

	it('Should return success on Admin updating song\'s preview', function(done) {
		request(url)
		.post('/songs/' + idSong + "/preview/")
		.field('token', tokenAdmin)
		.attach('preview', __dirname + '/song.mid')
		.end(function(err, res) {
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var json = JSON.parse(res.text);
			json.should.have.property('success');
			json.success.should.equal(true);
			json.should.have.property('message');
			json.message.should.equal("Your preview has been saved");
			done();
		});
	});

	it('Should return error on user removing a song', function(done) {
		var profile = {
			token: token
		};
		request(url)
		.delete('/songs/' + idSong)
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

	it('Should return success on admin removing a song', function(done) {
		var profile = {
			token: tokenAdmin
		};
		request(url)
		.delete('/songs/' + idSong)
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
			json.message.should.equal("The song has been deleted.");
			done();
		});
	});

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
