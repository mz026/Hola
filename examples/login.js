/**
 *  login.js
 */

var rest = require('restler')
  , funkyTest = require(__dirname + '/../funkyTest')
  , assert = require(__dirname + '/../myAssert');

var login = funkyTest.create({
    name: 'login api'
  , operate: function(err, input) {
    var self = this;

    rest.get('http://localhost/KonoServer/login/kono/c2FtbWkueS5sb25nQGdtYWlsLmNvbQ==')
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
    console.log('input', input);
    var self = this;
    rest.post('http://localhost/KonoServer/auth/5f8231a33a94bc55b8efcf2c4dcdebb85', {
        body: {
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
  }
  , pass: function(err, target) {
    return target;
  }
});

// login.run();
funkyTest.run('dymmy', login, auth);
