require('colors');
var hola = {};
hola.createTest = function(options) {
  var excecute = options.excecute
    , validate = options.validate
    , pass = options.pass
    , name = options.name || '';

  var test = {
    run: function(data, callback) {
      var onExecuted = generateOnExecuted(callback, data);
      reportStart('test ' + name);
      excecute(data, onExecuted);
    }
  };

  function generateOnExecuted(callback, initData) {
    return function(executedResult) {
      validate(executedResult, initData);
      reportOK('test ' + name);
      callback.call(null, pass(executedResult, initData));
    };
  };

  

  return test;
};

hola.runMulti = function(data, tests, callback) {

// codes with 2 tests
//
//   tests[0].run(data, function(data) {
//     tests[1].run(data, function(data) {
//       callback.call(null, data);
//     });
//   });

  tests[0].run(data, generateNextCallback(0));

  function generateNextCallback(index) {
    if (index + 1 === tests.length) {
      return function(data) {
        callback.call(null, data);
      };
    } else {
      return function(data) {
        tests[index + 1].run(data, generateNextCallback(index + 1));
      };
    }
  }; 

};

hola.group = function(name, units) {
  var group = {}
  group.units = units;
  group.name = name;
  group.run = function(data, callback) {
    reportStart('group ' + name);
    hola.runMulti(data, this.units, function(data) {
      reportOK('group ' + name);
      callback.call(null, data);
    });
  };
  return group;
};

function reportOK(name) {
  name = name || '';
  console.log((name + ' OK!').green.bold);
};
function reportStart(name) {
  console.log(('Starting ' + name + '...').white.bold);
};

module.exports = hola;
