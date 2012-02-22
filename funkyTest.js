/**
 *  funkyTest.js
 */ 
var funkyTest = {}
  , step = require('step')
  , colors = require('colors');

funkyTest.create = function(options) {
  var test = {}
    , operate = decorateWithErrorHandling(options.operate)
    , pass = decorateWithErrorHandling(options.pass)
    , testName = options.name || ''; 

  test.run = function(err, input) {
    var self = this;
    step(
      function start() {
        input = (undefined === input) ? '' : input;
        console.log(('\nStart test: ' + testName.bold + ' ...').white);
        return input;
      }
      , operate
      , function(err, target) {
        options.validate(target);
        console.log(('Test ' + testName + ': OK').green);
        return target;
      }
      , pass
      , function (err, toPass) {
        if(err) {
          throw err;
        }
        // junction between tests.
        if(typeof self === 'function') {
          self(err, toPass);
        }
        return toPass;
      }
    );
  };

  return test;
};

funkyTest.group = function(name, testArray) {
  var group = {
      name: name
    , tests: testArray
  };

  group.run = function(err, input) {
    var stepArgs = []
      , self = this;

    stepArgs.push(function(){
      console.log(('\nStart group: ' + group.name.bold + ' ...').white);
      input = (input === undefined) ? '' : input;
      return input;
    });
    group.tests.forEach(function(ele, idx, arr){
      stepArgs.push(ele.run);
    });
    stepArgs.push(function(err, toPass) {
      console.log(('\nend group ' + group.name).bold.green);
      if(err) {
        throw err;
      }
      // junction between tests.
      if(typeof self === 'function') {
        self(err, toPass);
      }
      return toPass;
    });

    step.apply(this, stepArgs);
  };

  return group;
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
    console.log('\nyes!!!'.bold.green);
  });
  
  step.apply(this, stepArgs);
};

function decorateWithErrorHandling(func) {
  var funcWithErrHandling = function(args) {
    var argsArray = [].slice.call(arguments, 0);
    if (argsArray[0]) {
      this(argsArray[0]);
      return;
    }
    return func.apply(this, arguments);
  };
  return funcWithErrHandling;
}

module.exports = funkyTest;
