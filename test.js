/**
 *  test file for funkyTest.
 */

var assert = require('assert')
  , funkyTest = require(__dirname + '/funkyTest');


var test1 = {
  operate: function(input) {
    return true;      
  }
  , validate: function(target) {
    console.log('target', target);
    assert.ok(target, 'assert target to be true');
    console.log('report ok in validate1');
  } 
};

var test2 = {
  operate: function(input) {
    return ! input;      
  }
  , validate: function(target) {
    console.log('target2', target);
    assert.ok(! target, 'assert target to be false');
    console.log('report ok in validate2');
  } 
};

// funkyTest.create(test1).run('dummy input');

var t1 = funkyTest.create(test1);
var t2 = funkyTest.create(test2);
funkyTest.run('dummy input', t1, t2);
