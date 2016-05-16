var chai  = require("chai");
var request = require("supertest");
var express = require("express");
var mongoose = require('mongoose');
var should = require('should');
var config = require('../config');
var path = require('path');
var fs = require('fs');
var url = 'http://localhost:3000';

// Variables used in test
var token;
var tokenAdmin;
var idUser;
var idUser2
var idAdmin;
var emailUser = 'user@test.fr';
var emailUser2 = 'user2@test.fr';
var emailAdmin = 'admin@admin.fr';
var passwordUser = 'Test1234';
var passwordAdmin = 'Test1234';

describe('News', function() {
 this.timeout(10000);
 before(function(done) {
  mongoose.connect(config.database);              
  done();
});
 
 it('Should return error trying to save a new user with dumb arguments', function(done) {
  var profile = {
    dsq: emailUser,
    qqqq: passwordUser
  };
  request(url)
  .post('/users')
  .send(profile)
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    res.status.should.be.eql(400);
    res.text.should.be.json;
    var json = JSON.parse(res.text);
    json.should.have.property('success');
    json.success.should.equal(false);
    json.should.have.property('message');
    json.message.should.equal("Wrong arguments");
    done();
  });
});
});