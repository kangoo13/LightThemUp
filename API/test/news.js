// var chai  = require("chai");
// var request = require("supertest");
// var express = require("express");
// var mongoose = require('mongoose');
// var should = require('should');
// var config = require('../config');
// var path = require('path');
// var fs = require('fs');
// var url = 'http://localhost:3000';

// // Variables used in test
// var tokenAdmin;
// var emailAdmin = 'admin@admin.fr';
// var passwordAdmin = 'Test1234';

// describe('News', function() {
// 	this.timeout(10000);
// 	before(function(done) {
// 		mongoose.connect(config.database);              
// 		done();
// 	});

// 	it('Should return success trying log in an user (as Admin)', function(done) {
// 		var profile = {
// 			email: emailAdmin,
// 			password: passwordAdmin
// 		};
// 		request(url)
// 		.post('/users/authenticate')
// 		.send(profile)
// 		.end(function(err, res) {
// 			if (err) {
// 				throw err;
// 			}
// 			res.status.should.be.eql(200);
// 			res.text.should.be.json;
// 			var json = JSON.parse(res.text);
// 			json.should.have.property('success');
// 			json.success.should.equal(true);
// 			json.should.have.property('message');
// 			json.message.should.equal("Enjoy your token!");
// 			json.should.have.property('token');
// 			tokenAdmin = json.token;
// 			done();
// 		});
// 	});

// 	it('Should return success on user updating his avatar', function(done) {
// 		request(url)
// 		.post('/news/')
// 		.field("token", tokenAdmin)
// 		.attach('picture', __dirname + '/avatar.jpg')
// 		.end(function(err, res) {
// 			console.log(res.text);
// 			console.log(err.text);
// 			res.status.should.be.eql(200);
// 			res.text.should.be.json;
// 			var json = JSON.parse(res.text);
// 			json.should.have.property('success');
// 			json.success.should.equal(true);
// 			json.should.have.property('message');
// 			json.message.should.equal("Your image has been saved");
// 			done();
// 		});
// 	});

// 	it('Should return news on simple GET', function(done) {
// 		request(url)
// 		.get('/news')
// 		.end(function(err, res) {
// 			if (err) {
// 				throw err;
// 			}
// 			res.status.should.be.eql(200);
// 			res.text.should.be.json;
// 			var jsonData = JSON.parse(res.text);
// 			// for (var i = 0; i < jsonData.length; i++) {
// 			// 	var news = jsonData[i];
// 			// 	if (news.emailLocal == emailUser)
// 			// 		idUser = users._id;
// 			// 	if (users.emailLocal == emailUser2
// 			// 		idUser2 = users._id;
// 			// 	if (users.emailLocal == emailAdmin)
// 			// 		idAdmin = users._id;
// 			// }
// 			done();
// 		});
// 	});

// });