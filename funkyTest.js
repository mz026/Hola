/**
 *  funkyTest.js
 */ 
var extendMe = require(__dirname + '/lib/extendme/extendme')
  , funkyTest = {};

funkyTest.create = function(options) {
  var operate = options.operate
    , validate = options.validate
    , test = {}; 

  test.run = function(input) {
    var result = operate.call(null, input);
    validate(result);
    return result;
  };

  return test;
};

funkyTest.run = function(args) {
  var tests = [].slice.call(arguments, 0);
  tests.shift();

  var input;
  for (var idx = 0; idx < tests.length; idx ++) {
    input = tests[idx].run(input);
  }
};

module.exports = funkyTest;
