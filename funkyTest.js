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
      , function(err, target) {
        options.validate(target);
        return target;
      }
      , options.pass
      , function (err, toPass) {
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
    , input = tests.shift()
    , stepArgs = [];

  stepArgs.push(function(){
    return input;
  });
  tests.forEach(function(ele, idx, arr){
    stepArgs.push(ele.run);
  });
  stepArgs.push(function(err, toPass) {
    console.log('OK');
  });
  
  step.apply(null, stepArgs);
};

module.exports = funkyTest;
