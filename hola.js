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

module.exports = hola;
