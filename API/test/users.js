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

describe('Users', function() {
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

 it('Should return success trying to save a new user (user1)', function(done) {
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

 it('Should return success trying to save a new user (user2)', function(done) {
  var profile = {
    email: emailUser2,
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

 it('Should return error trying to save duplicate user', function(done) {
  var profile = {
    email: emailUser,
    password: passwordUser
  };
  request(url)
  .post('/users')
  .send(profile)
    // end handles the response
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      res.status.should.be.eql(409);
      res.text.should.be.json;
      var json = JSON.parse(res.text);
      json.should.have.property('success');
      json.success.should.equal(false);
      json.should.have.property('message');
      json.message.should.equal("User already exists");
      done();
    });
  });


 it('Should return error trying to log in a not existing user', function(done) {
  var profile = {
    email: 'nonexisting@test.fr',
    password: passwordUser
  };
  request(url)
  .post('/users/authenticate')
  .send(profile)
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    res.status.should.be.eql(404);
    res.text.should.be.json;
    var json = JSON.parse(res.text);
    json.should.have.property('success');
    json.success.should.equal(false);
    json.should.have.property('message');
    json.message.should.equal("Authentication failed. User not found.");
    done();
  });
});

 it('Should return error trying to log in with a wrong password', function(done) {
  var profile = {
    email: emailUser,
    password: 'Test12345'
  };
  request(url)
  .post('/users/authenticate')
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
    json.message.should.equal("Authentication failed. Wrong password.");
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


 it('Should return users on simple GET', function(done) {
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
      if (users.emailLocal == emailUser)
        idUser = users._id;
      if (users.emailLocal == emailUser2)
        idUser2 = users._id;
      if (users.emailLocal == emailAdmin)
        idAdmin = users._id;
    }
    done();
  });
});

 it('Should return user fields', function(done) {
  request(url)
  .get('/users/' + idUser)
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    res.status.should.be.eql(200);
    res.text.should.be.json;
    var json = JSON.parse(res.text);
    done();
  });
});

 it('Should return error on user updating another user account', function(done) {
  var profile = {
    token: token
  };
  request(url)
  .put('/users/' + idUser2)
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

 it('Should return success on user updating his account', function(done) {
  var profile = {
    token: token,
    city: "mouans-sartoux"
  };
  request(url)
  .put('/users/' + idUser)
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
    json.message.should.equal("User updated !");
    done();
  });
});

 it('Should return success on admin updating an user account', function(done) {
  var profile = {
    token: tokenAdmin,
    city: "mouans-sartoux"
  };
  request(url)
  .put('/users/' + idUser)
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
    json.message.should.equal("User updated !");
    done();
  });
});

 it('Should return success on user updating his avatar', function(done) {
  var profile = {
    token: token
  };
  request(url)
  .post('/users/' + idUser + "/avatar/")
  .field('token', token)
  .attach('avatar', __dirname + '/avatar.jpg')
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

 it('Should return error on user removing another user account', function(done) {
  var profile = {
    token: token
  };
  request(url)
  .delete('/users/' + idUser2)
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

 it('Should return error on remove an user with admin privileges', function(done) {
  var profile = {
    token: tokenAdmin
  };
  request(url)
  .delete('/users/' + idUser2)
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
});