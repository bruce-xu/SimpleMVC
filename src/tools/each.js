/**
 * @file 遍历对象或数组
 * @author brucexyj@gmail.com
 */

define(function (require) {
  /**
   * 遍历对象或数组，当返回`false`时终止遍历
   * @param {Object|Array} iterator 待遍历的对象
   * @param {Function} func 每次迭代调用的函数
   */
  function each(iterator, func) {
    if (typeof iterator === 'object' && iterator) {
      for (var key in iterator) {
        if (iterator.hasOwnProperty(key)) {
          var flag = func(iterator[key], key, iterator);

          if (flag === false) {
            break;
          }
        }
      }
    } else if (iterator instanceof Array) {
      for (var i = 0, len = iterator.length; i < len; i++) {
        var flag = func(iterator[i], i, iterator);

        if (flag === false) {
          break;
        }
      }
    }
  }

  return each;
});