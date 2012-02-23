var hola = require(__dirname + '/../hola');

exports.hola = {
  dummy: function(t) {
    t.ok(true);
    t.done();
  }
  , 'can run one sync': function(t) {
    var hasV = false
      , hasP = false;

    var test = hola.createTest({
      excecute: function(init, callback) {
        callback(init);
      }
      , validate: function(data) {
        hasV = true;
        return true;
      }
      , pass: function(data) {
        hasP = true;
        return data + '!!';
      }
    });

    test.run('hello', function(data) {
      t.equal(data, 'hello!!');
      t.ok(hasV, 'hasV');
      t.ok(hasP, 'hasP');
      t.done();
    });
  }
  , 'can run one async': function(t) {
    var hasV = false
      , hasP = false;

    var test = hola.createTest({
      excecute: function(init, callback) {
        setTimeout(function() {
          callback(init);
        }, 500);
      }
      , validate: function(data) {
        hasV = true;
        return true;
      }
      , pass: function(data) {
        hasP = true;
        return data + '!!';
      }
    });

    test.run('hello', function(data) {
      t.equal(data, 'hello!!');
      t.ok(hasV, 'hasV');
      t.ok(hasP, 'hasP');
      t.done();
    });
  }
};
