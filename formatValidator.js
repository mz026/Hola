/**
 *  formatValidator.js
 *  validate formats of two given objects.
 */

var isFormatEqual = function(target, validator) {
  if(typeof(target) !== typeof(validator)) {
    return false;
  }
  if( ! (bothArray() || bothNotArray()) ) {
    return false;
  }
  if( isPremitiveType(validator) ) {
    return true;
  }

  var effectiveValidator = isArray(validator) ? validator[0] : validator;
  var isEqual = true;

  if ( isArray(target) ) {
    for(var idx = 0; idx < target.length; idx ++) {
      if ( ! isFormatEqual(target[idx], effectiveValidator) ) {
        isEqual = false;
        break;
      };
    }
  } else {
    for(var key in effectiveValidator) {
      if ( ! effectiveValidator.hasOwnProperty(key)) {
        continue;
      }
      if ( ! isFormatEqual(target[key], effectiveValidator[key]) ) {
        isEqual = false;
        break;
      }
    }
  }
  return isEqual;

  function bothArray() {
    return isArray(target) && isArray(validator);
  };
  function bothNotArray() {
    return (!isArray(target)) && (!isArray(validator));
  };
};

function isArray(target) {
  return target instanceof Array;
};
function isObject(target) {
  return typeof(target) === 'object';
};
function isPremitiveType (target) {
  var type = typeof(target);
  return type === 'number'
    || type === 'string'
    || type === 'boolean';
};
module.exports = isFormatEqual;
