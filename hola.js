var hola = {};
hola.createTest = function(options) {
  var excecute = options.excecute
    , validate = options.validate
    , pass = options.pass;

  var test = {
    run: function(data, callback) {
      var onExecuted = generateOnExecuted(callback);
      excecute(data, onExecuted);
    }
  };

  function generateOnExecuted(callback) {
    return function(data) {
      validate(data);
      callback.call(null, pass(data));
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

hola.group = function(units) {
  var group = {};
  group.units = units;
  group.run = function(data, callback) {
    hola.runMulti(data, this.units, callback);
  };
  return group;
};


module.exports = hola;
