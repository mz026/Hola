/**
 *  login.js
 */

var loginURL = 'dummy';
  , authURL = 'dummy';
var rest = require('restler')
  , funkyTest = require(__dirname + '/../funkyTest')
  , assert = require(__dirname + '/../colorAssert');

var login = funkyTest.create({
    name: 'login api'
  , operate: function(err, input) {
    var self = this;

    rest.get(loginURL)
      .on('complete', function(result, response) {
        var error = null;

        if (result instanceof Error) {
          error = result;
        }
        self(error, result);    
      });
  }
  , validate: function(result) {
    var resultobj = JSON.parse(result);
    assert.equal(typeof resultobj, 'object');
  }
  , pass: function(err, target) {
    console.log(target);
    return JSON.parse(target);
  }
});


var auth = funkyTest.create({
    name: 'auth api'
  , operate: function(err, input) {
    console.log('input', typeof input, input);
    var self = this;
    rest.post(authURL, {
        data: {
            p: 'hello'
          , t: input.token
        }
      })
      .on('complete', function(result, response) {
        var error = null;
        if (result instanceof Error) {
          error = result;
        }
        self(error, result);    
      });
  }
  , validate: function(result) {
    console.log(result);
    assert.equal(result, 'Incorrect password');
  }
  , pass: function(err, target) {
    return target;
  }
});

// login.run();
funkyTest.run('dymmy', login, auth);
