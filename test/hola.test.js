var hola = require(__dirname + '/../hola');

exports.hola = {
  dummy: function(t) {
    t.ok(true);
    t.done();
  }
  , 'can run one sync': function(t) {
    var testSet = testTemplateWith({
      name: 'basic'
      , pass: function(data, initData) {
        console.log(initData);
        return data + '!!' + initData;
      }
    });
    testSet.test.run('hello', function(data) {
      t.equal(data, 'hello!!hello');
      t.ok(testSet.hasValidateCalled(), 'hasV');
      t.ok(testSet.hasPassCalled(), 'hasP');
      t.done();
    });
  }
  , 'can run one async': function(t) {
    var asyncTestSet = testTemplateWith({
      name: 'async'
      , excecute: function(init, callback) {
        setTimeout(function() {
          callback(init);
        }, 500);
      }
      , pass: function(data, initData) {
        return data + '!!';
      }
    });
    asyncTestSet.test.run('hello', function(data) {
      t.equal(data, 'hello!!');
      t.ok(asyncTestSet.hasValidateCalled(), 'hasV');
      t.ok(asyncTestSet.hasPassCalled(), 'hasP');
      t.done();

    });
  }
  , 'can run multiple' : function(t) {
    var testSet_1 = testTemplateWith({
      pass: function(data) {
        return data + '!!';
      }
    });
    var testSet_2 = testTemplateWith({
      pass: function(data) {
        return data + '@@';
      }
    });

    hola.runMulti('hello'
      , [testSet_1.test, testSet_2.test]
      , function(data) {
        t.equal(data, 'hello!!@@');
        t.ok(testSet_1.hasValidateCalled(), 'hasV_1');
        t.ok(testSet_1.hasPassCalled(), 'hasP_1');
        t.ok(testSet_2.hasValidateCalled(), 'hasV_2');
        t.ok(testSet_2.hasPassCalled(), 'hasP_2');
        t.done();
      });
  }
  , 'can make group and run it': function(t) {
    var testSet_1 = testTemplateWith({
      pass: function(data, initData) {
        return data + '!!';
      }
    });
    var testSet_2 = testTemplateWith({
      pass: function(data, initData) {
        return data + '@@';
      }
    });
    var group = hola.group('myGroup', [testSet_1.test, testSet_2.test]);
    group.run('hola', function(data) {
      t.equal(data, 'hola!!@@');
      t.ok(testSet_1.hasValidateCalled(), 'hasV_1');
      t.ok(testSet_1.hasPassCalled(), 'hasP_1');
      t.ok(testSet_2.hasValidateCalled(), 'hasV_2');
      t.ok(testSet_2.hasPassCalled(), 'hasP_2');
      t.done();
    });
  }
  , 'can run group and test.': function(t) {
    var testSet_1 = testTemplateWith({
      pass: function(data, initData) {
        return data + '!!';
      }
    });
    var testSet_2 = testTemplateWith({
      pass: function(data, initData) {
        return data + '@@';
      }
    });
    var testSet_3 = testTemplateWith({
      pass: function(data, initData) {
        return data + '##';
      }
    });
    var group = hola.group('rockGroup', [testSet_1.test, testSet_2.test]);
    hola.runMulti('hola', [group, testSet_3.test], function(data) {
      t.equal(data, 'hola!!@@##');
      t.ok(testSet_1.hasValidateCalled(), 'hasV_1');
      t.ok(testSet_1.hasPassCalled(), 'hasP_1');
      t.ok(testSet_2.hasValidateCalled(), 'hasV_2');
      t.ok(testSet_2.hasPassCalled(), 'hasP_2');
      t.ok(testSet_3.hasValidateCalled(), 'hasV_2');
      t.ok(testSet_3.hasPassCalled(), 'hasP_2');
      t.done();

    });
  }
  , 'can build group with group and test': function(t) {
    var testSet_1 = testTemplateWith({
      pass: function(data, initData) {
        return data + '!!';
      }
    });
    var testSet_2 = testTemplateWith({
      pass: function(data, initData) {
        return data + '@@';
      }
    });
    var testSet_3 = testTemplateWith({
      pass: function(data, initData) {
        return data + '##';
      }
    });
    var subGroup = hola.group('Funky Group', [testSet_1.test, testSet_2.test])
      , group = hola.group('Fusion Ones', [subGroup, testSet_3.test]);
    group.run('hola', function(data) {
      t.equal(data, 'hola!!@@##');
      t.ok(testSet_1.hasValidateCalled(), 'hasV_1');
      t.ok(testSet_1.hasPassCalled(), 'hasP_1');
      t.ok(testSet_2.hasValidateCalled(), 'hasV_2');
      t.ok(testSet_2.hasPassCalled(), 'hasP_2');
      t.ok(testSet_3.hasValidateCalled(), 'hasV_2');
      t.ok(testSet_3.hasPassCalled(), 'hasP_2');
      t.done();
    });
  }
};

function testTemplateWith (options) {
  var hasValidateCalled = false
    , hasExecuteCalled = false
    , hasPassCalled = false;

  var excecute = options.excecute 
    || function(init, callback) {
      callback(init);
    };
  var validate = options.validate
    || function(data) {};
  var pass = options.pass 
    || function(data) {
      return data
    };
  var name = options.name || '';

  excecute = decorateExecute(excecute);
  validate = decorateValidate(validate);
  pass = decoratePass(pass);
  
  var test = hola.createTest({
    excecute: excecute
    , validate: validate
    , pass: pass
    , name: name
  });

  return {
    test: test
    , hasExecuteCalled: function(){ 
      return hasExecuteCalled
    }
    , hasValidateCalled: function() {
      return hasValidateCalled;
    }
    , hasPassCalled: function() {
      return hasPassCalled;
    }
  };
  function decorateValidate(originalValidate) {
    return function(data) {
      hasValidateCalled = true;
      originalValidate.apply(null, arguments);
    };
  };
  function decorateExecute(originalExecute) {
    return function(data, callback) {
      hasExecuteCalled= true;
      originalExecute.call(null, data, callback);
    };
  };
  function decoratePass(originalPass) {
    return function(data) {
      hasPassCalled = true;
      return originalPass.apply(null, arguments);
    };
  };
};
