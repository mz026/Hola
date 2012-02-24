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
  , 'can run multiple' : function(t) {
    var hasV_1 = false
      , hasP_1 = false
      , hasV_2 = false
      , hasP_2 = false;

    var test_1 = hola.createTest({
      excecute: function(init, callback) {
        callback(init);
      }
      , validate: function(data) {
        hasV_1 = true;
        return true;
      }
      , pass: function(data) {
        hasP_1 = true;
        return data + '!!';
      }
    });

    var test_2 = hola.createTest({
      excecute: function(init, callback) {
        callback(init);
      }
      , validate: function(data) {
        hasV_2 = true;
        return true;
      }
      , pass: function(data) {
        hasP_2 = true;
        return data + '@@';
      }
    });

    hola.runMulti('hello', [test_1, test_2], function(data) {
      t.equal(data, 'hello!!@@');
      t.ok(hasV_1, 'hasV_1');
      t.ok(hasP_1, 'hasP_1');
      t.ok(hasV_2, 'hasV_2');
      t.ok(hasP_2, 'hasP_2');
      t.done();
    });
  }
  , 'can make group and run it': function(t) {
    var hasV_1 = false
      , hasP_1 = false
      , hasV_2 = false
      , hasP_2 = false;

    var test_1 = hola.createTest({
      excecute: function(init, callback) {
        callback(init);
      }
      , validate: function(data) {
        hasV_1 = true;
        return true;
      }
      , pass: function(data) {
        hasP_1 = true;
        return data + '!!';
      }
    });

    var test_2 = hola.createTest({
      excecute: function(init, callback) {
        callback(init);
      }
      , validate: function(data) {
        hasV_2 = true;
        return true;
      }
      , pass: function(data) {
        hasP_2 = true;
        return data + '@@';
      }
    });
    
    var group = hola.group([test_1, test_2]);
    group.run('hola', function(data) {
      t.equal(data, 'hola!!@@');
      t.ok(hasV_1, 'hasV_1');
      t.ok(hasP_1, 'hasP_1');
      t.ok(hasV_2, 'hasV_2');
      t.ok(hasP_2, 'hasP_2');
      t.done();
    });
  }

};
