/**
 *  funkyTest.js
 */ 
var funkyTest = {}
  , step = require('step');

funkyTest.create = function(options) {
  var test = {}; 

  test.run = function(err, input) {
    var self = this;
    step(
      function start() {
        return input;
      }
      , options.operate
      , options.validate
      , function pass(err, toPass) {
        if(typeof self === 'function') {
          self(err, toPass);
        }
        return toPass;
      }
    );
  };

  return test;
};

funkyTest.run = function(args) {
  var tests = [].slice.call(arguments, 0)
    , input = tests.shift();

  step(
    function () {
      return input;
    }
    , tests[0].run
    , tests[1].run
    , function end(err, toPass) {
      console.log(toPass);
    }
  );

};

module.exports = funkyTest;
