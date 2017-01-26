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
var newsName = "newsTest";
var pictureTest = "a";
var descriptionTest = "descriptionTest"
var emailUser = 'user@test.fr';
var passwordUser = 'Test1234';
var idNews;
var idUser;

describe('News', function() {
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

	it('Should return error trying to create a news as a User', function(done) {
		var profile = {
			token: token,
			name: newsName,
			description: descriptionTest,
			picture: pictureTest
		};
		request(url)
		.post('/news/')
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

	it('Should return success trying to create a news as an Admin', function(done) {
		var profile = {
			token: tokenAdmin,
			name: newsName,
			description: descriptionTest,
			picture: pictureTest
		};
		request(url)
		.post('/news/')
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
			json.message.should.equal("News created !");
			done();
		});
	});

	it('Should return news on simple GET', function(done) {
		request(url)
		.get('/news/')
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			var jsonData = JSON.parse(res.text);
			for (var i = 0; i < jsonData.length; i++) {
				var news = jsonData[i];
				if (news.name == newsName)
					idNews = news._id;
			}
			done();
		});
	});

	it('Should return news detail (with newsId) on simple GET', function(done) {
		request(url)
		.get('/news/' + idNews)
		.end(function(err, res) {
			if (err) {
				throw err;
			}
			res.status.should.be.eql(200);
			res.text.should.be.json;
			done();
		});
	});

	it('Should return error on user editing name of a news', function(done) {
		var profile = {
			token: token,
			name: newsName + "NEW NAME"
		};
		request(url)
		.put('/news/' + idNews)
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

	it('Should return success on admin editing name of a news', function(done) {
		var profile = {
			token: tokenAdmin,
			name: newsName + "NEW NAME"
		};
		request(url)
		.put('/news/' + idNews)
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
			json.message.should.equal("News updated !");
			done();
		});
	});

	it('Should return error on user removing a news', function(done) {
		var profile = {
			token: token
		};
		request(url)
		.delete('/news/' + idNews)
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

	it('Should return success on admin removing a news', function(done) {
		var profile = {
			token: tokenAdmin
		};
		request(url)
		.delete('/news/' + idNews)
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
			json.message.should.equal("The news has been deleted.");
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
