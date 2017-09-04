/**
 * @file 字符串首字母大写
 * @author brucexyj@gmail.com
 */

define(function (require) {
  function capitalized(text) {
    if (typeof text !== 'string' || !text) {
      return text;
    }

    return text.replace(/^([a-zA-Z])([a-zA-Z]*)$/, function (match, $1, $2) {
      return $1.toUpperCase() + $2.toLowerCase();
    });
  }

  return capitalized;
});