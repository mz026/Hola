/**
 *  test file for funkyTest.
 */

var assert = require(__dirname + '/../colorAssert')
  , hola = require(__dirname + '/../hola')

var asyncFunction = function(arg, cb) {
  setTimeout(function() {
    cb(arg);
  }, 500);
};

// basic one
var basic = hola.createTest({
  name: 'basic one'
  , excecute: function(initData, callback) {
    callback(initData + '!!');
  }
  , validate: function(data, initData) {
    assert.equal(data, initData + '!!');
  }
  , pass: function(executedResult) {
    return executedResult + ' Dude~';
  }
});
basic.run('hello', function(data) {});

// async, the usage is totally the same.
var async = hola.createTest({
  name: 'async'
  , excecute: function(initData, callback) {
    asyncFunction(initData + '!!', callback);
  }
  , validate: function(executedResult, initData) {
    assert.equal(executedResult, initData + '!!');
  }
  , pass: function(executedResult) {
    return executedResult;
  }
});
async.run('hello', function(data) {});

// run multi test at one time.
hola.runMulti('hello', [basic, async], function(data) {});

// group tests
var group = hola.group('rockGroup', [basic, async]);
group.run('hola', function(data) {});

// group and test can be mixed
hola.runMulti('hello', [group, basic], function(data) {});
