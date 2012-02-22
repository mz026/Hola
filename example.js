/**
 *  test file for funkyTest.
 */

var assert = require('assert')
  , funkyTest = require(__dirname + '/funkyTest')

var async = function(arg, cb) {
  setTimeout(function() {
    cb(arg);
  }, 500);
};

var test1 = {
  name: 'my cool test one'
  , operate: function(err, input) {
    return true;
  }
  , validate: function(target) {
    assert.ok(target, 'assert target to be true');
  } 
  , pass: function(err, target) {
    var toPass = ! target;
    return toPass;
  }
};

var test2 = {
  // 'this' is validate
  name: 'my rock test two'
  , operate: function(err, input) {
    var self = this;
    async(input, function(arg) {
      self(null, arg);
    });
  }
  , validate: function(target) {
//     assert.ok(target === true, 'assert target to be false');
    assert.ok(target === false, 'assert target to be false');
  } 
  , pass: function(err, target) {
    return target;
  }
};

// funkyTest.create(test1).run(null, 'dummy input');

var t1 = funkyTest.create(test1);
var t2 = funkyTest.create(test2);
funkyTest.run('dummy input', t1, t2);
