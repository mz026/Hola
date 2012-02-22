var assert = require('assert')
  , color = require('colors');


function decorateColor(func) {
  var funcWithColor = function(args) {
    var message = '';
    try {
      func.apply(this, arguments);
    } catch(e) {
      message = e.name + ': '
        + e.actual
        + ' ' + e.operator
        + ' ' + e.expected;
      console.log(message.red);
      throw e;
    }
  };
  return funcWithColor;
};

for (var name in assert) {
  if (assert.hasOwnProperty(name)
      && typeof assert[name] === 'function'
      && name !== 'AssertionError') {
    assert[name] = decorateColor(assert[name]);
  }
}

module.exports = assert;
