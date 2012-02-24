var isFormatEqual = require(__dirname + '/../formatValidator');

module.exports = {
  dummy: function(t) {
    t.ok(true);
    t.done();
  }

  , 'can test primitive types' : function(t) {
    t.ok(isFormatEqual('hola', ''), 'string ok');
    t.ok(isFormatEqual(3, 5), 'number ok');
    t.ok(isFormatEqual(3, '') === false, 'string vs number');
    t.done();
  }
  , 'can test plain object': function(t) {
    var ninja = {
        name: 'Jack'
      , occupation: 'Ninja'
      , weapon: 'sword'
      , kids: 0
    };

    var validator = {
        name: 'hello'
      , occupation: ''
      , weapon: ''
      , kids: 3
    };

    var moreKeyThanValidator = {
        name: 'Jack'
      , occupation: 'Ninja'
      , weapon: 'sword'
      , kids: 0
      , dummy: 10
    };

    t.ok(isFormatEqual(ninja, validator)
      , 'plain object with primitive type only');
    t.ok(isFormatEqual(moreKeyThanValidator, validator)
      , 'fine if target has more keys than validator.');
    t.ok(isFormatEqual(10, moreKeyThanValidator) === false
      , 'false if differeny type');
    t.ok(isFormatEqual(moreKeyThanValidator, 10) === false
      , 'false if differeny type');
    t.ok(isFormatEqual(function(){}, moreKeyThanValidator) === false
      , 'false if differeny type');
    t.ok(isFormatEqual(ninja, function(){}) === false
      , 'false if differeny type');
    t.done();
  }

  // if validator is an array, it can has only one element.
  , 'can test array': function(t) {
    var validatorSeed = {
        name: ''
      , occupation: ''
      , weapon: ''
      , kids: 3
    };
    var goodOne = {
        name: 'Jack'
      , occupation: 'Ninja'
      , weapon: 'sword'
      , kids: 0
    };
    var anotherGoodOne = {
        name: 'Mary'
      , occupation: 'Homer'
      , weapon: 'telephone'
      , kids: 3
    };
    var evilOne = {
        name: 'Jack'
      , occupation: 'Ninja'
      , weapon: 'sword'
      , evilKids: 0
    };

    t.ok(isFormatEqual([goodOne, anotherGoodOne], [validatorSeed])
      , 'can test plain array');
    t.ok( ! isFormatEqual(goodOne, [validatorSeed])
      , 'object vs array is not good.');
    t.ok( ! isFormatEqual([goodOne, anotherGoodOne], goodOne)
      , 'array vs object is not good either.');
    t.ok( ! isFormatEqual([evilOne], [validatorSeed])
      , 'can notice plain array with invalid format.');
    t.done();
  }
  , 'nested array of object' : function(t) {
    var validatorSeed = {
      name: ''
      , food: [{
          oil: ''
          , cal: 30
      }]
    };
    var goodOne = {
      name: ''
      , food: [{
          oil: ''
          , cal: 30
      }]
    };
    
    t.ok(isFormatEqual(validatorSeed, goodOne)
      , 'can do nested array of obj');
    t.done();
  }


  , 'nested': function(t) {
    var validatorSeed = {
        name: ''
      , kids: 3
      , likes: {
        sport: ''
        , food: [{
          oil: 'less'
          , isCool: true
          , cal: 900
        }]
        , books: {
          type: ''
          , year: ''
        }
      }
    };
    var goodOne = {
        name: 'Jack'
      , kids: 0
      , likes: {
        sport: 'swimming'
        , food: [{
          oil: 'less'
          , isCool: true 
          , cal: 300
        }]
        , books: {
          type: 'knowledge'
          , year: '< 1980'
        }
      }
    };
    var evilOne = {
        name: 'Jack'
      , occupation: 'Ninja'
      , weapon: 'sword'
      , kids: 0
      , likes: {
        sport: 'jogging'
        , foods: []
        , books: {}
      }
    };

    t.ok(isFormatEqual(goodOne, validatorSeed) === true
      , 'can do nested');
    t.ok(isFormatEqual(evilOne, validatorSeed) === false
      , 'can detect invalid nested');
    t.done();
  }
};
