/**
 * @file 使函数Promise化
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var Promise = require('../promise');

  function isPromise(obj) {
    if (obj && typeof obj === 'object' && typeof obj.then === 'function') {
      return true;
    }

    return false;
  }

	function promisify(func, context) {
		return function () {
      var result = func.apply(context, arguments);
      if (isPromise(result)) {
        return result;
      }

      return Promise.resolve(result);
    };
	}

	return promisify;
});