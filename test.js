/**
 *  test file for funkyTest.
 */

var assert = require('assert')
  , funkyTest = require(__dirname + '/funkyTest')
  , step = require('step');

var async = function(arg, cb) {
  setTimeout(function() {
    cb(arg);
  }, 500);
};

var test1 = {
  operate: function(err, input) {
    this(null, true);
  }
  , validate: function(err, target) {
    console.log('target', target);
    assert.ok(target, 'assert target to be true');
    console.log('report ok in validate1');
    this(null, target);
  } 
};

var test2 = {
  // 'this' is validate
  operate: function(err, input) {
    var self = this;
    async( ! input, function(arg) {
      self(null, arg);
    });
  }
  , validate: function(err, target) {
    console.log('target2', target);
    assert.ok(target === false, 'assert target to be false');
    console.log('report ok in validate2');
  } 
};

// funkyTest.create(test1).run(null, 'dummy input');

var t1 = funkyTest.create(test1);
var t2 = funkyTest.create(test2);
funkyTest.run('dummy input', t1, t2);
