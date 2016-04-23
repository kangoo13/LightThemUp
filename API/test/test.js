var chai  = require("chai");
var request = require("supertest");
var express = require("express");
var mongoose = require('mongoose');
var should = require('should');
var config = require('../config');
var url = 'http://localhost:3000';

//TO-DO: update, pictures

describe('Routing', function() {
  before(function(done) {
    mongoose.connect(config.database);              
    done();
  });

  describe('Users', function() {

    it('Should return users on simple GET', function(done) {
      request(url)
      .get('/users')
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          done();
        });
  });

    it('Should return error trying to save a new user with dumb arguments', function(done) {
      var profile = {
        dsq: 'test@test.fr',
        qqqq: 'Test1234'
      };
      request(url)
      .post('/users')
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to false
          json.success.should.equal(false);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("Wrong arguments");
          done();
        });
  });


    it('Should return success trying to save a new user', function(done) {
      var profile = {
        email: 'test@test.fr',
        password: 'Test1234'
      };
      request(url)
      .post('/users')
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to true
          json.success.should.equal(true);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("User created !");
          done();
        });
  });

    it('Should return error trying to save duplicate user', function(done) {
      var profile = {
        email: 'test@test.fr',
        password: 'Test1234'
      };
      request(url)
      .post('/users')
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to false
          json.success.should.equal(false);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("User already exists");
          done();
        });
  });


    it('Should return error trying to log in a not existing user', function(done) {
      var profile = {
        email: 'nonexisting@test.fr',
        password: 'Test1234'
      };
      request(url)
      .post('/users/authenticate')
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to false
          json.success.should.equal(false);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("Authentication failed. User not found.");
          done();
        });
  });

    it('Should return error trying to log in with a wrong password', function(done) {
      var profile = {
        email: 'test@test.fr',
        password: 'Test12345'
      };
      request(url)
      .post('/users/authenticate')
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to false
          json.success.should.equal(false);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("Authentication failed. Wrong password.");
          done();
        });
  });

    var token;
    it('Should return success trying log in an user', function(done) {
      var profile = {
        email: 'test@test.fr',
        password: 'Test1234'
      };
      request(url)
      .post('/users/authenticate')
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to true
          json.success.should.equal(true);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("Enjoy your token!");
          // If response contains token
          json.should.have.property('token');
          token = json.token;
          done();
        });
  });

    var id;
    it('Should return user fields', function(done) {
      request(url)
      .get('/users/test@test.fr')
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
          // If status is 200
          res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains user _id
          json.should.have.property('_id');
          id = json._id;
          done();
        });
  });

    it('Should return success on remove an user with admin privileges', function(done) {
      var profile = {
        token: token
      };
      request(url)
      .delete('/users/' + id)
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
         // If status is 200
         res.status.should.be.eql(200);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to true
          json.success.should.equal(true);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("The user has been deleted.");
          done();
        }); 
  });


    it('Should return error on remove an user without admin privileges', function(done) {
      var profile = {
        token: token
      };
      request(url)
      .delete('/users/' + id)
      .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
         // If status is 403
         res.status.should.be.eql(403);
          // If response is JSON
          res.text.should.be.json;
          var json = JSON.parse(res.text);
          // If response contains success
          json.should.have.property('success');
          // If response success is equal to false
          json.success.should.equal(false);
          // If response contains message
          json.should.have.property('message');
          // If response message is equal to our text
          json.message.should.equal("Unauthorized.");
          done();
        });
  });
  });

});