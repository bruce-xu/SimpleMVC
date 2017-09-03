/**
 * @file 扩展对象
 * @author brucexyj@gmail.com
 */

define(function (require) {
	var isNativeSupport = typeof Object.assign === 'function';

	/**
	 * 扩展对象
	 * @param {Object} target 待扩展的目标对象
	 */
  function extend(target) {
  	if (!target || typeof target !== 'object') {
  		return;
  	}

  	var sources = Array.prototype.slice.call(arguments, 1);

  	if (isNativeSupport) {
      Object.assign.apply(target, [].concat(target, sources));
    } else {
      for (var i = 0, len = sources.length; i < len; i++) {
        var source = sources[i];

        if (typeof source === 'object' && source) {
          for (var key in source) {
            if (source.hasOwnProperty(key)) {
              target[key] = source[key];
            }
          }
        }
      }
    }

    return target;
  }

  return extend;
});