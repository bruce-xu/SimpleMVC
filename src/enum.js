/**
 * @file 枚举
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var inherit = require('./tools/inherit');
  var DataSource = require('./datasource');

  function Enum(data) {
    if (!(data instanceof Array)) {
      throw new TypeError('Parameter "data" must be an array');
    }

    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
      var item = data[i];
      var key, value;
      if (typeof item !== 'object' || !item) {
        key = i;
        value = item;
      } else {
        key = typeof item.key === 'undefined' ? i : item.key;
        value = item.value;
        result[i] = {
          key: key,
          value: value
        };
      }
    }

    this.data = result;
  }

  Enum.prototype.add = function (item) {
    var data = this.data;
    var key, value;

    if (typeof item === 'object' && item) {
      key = typeof item.key === 'undefined' ? data.length : item.key;
      value = item.value;
    } else {
      key = data.length;
      value = item;
    }
    
    data.push({
      key: key,
      value: value
    });
  };

  Enum.prototype.get = function () {
    return Promise.resolve(this.data);
  };

  Enum.prototype.getItem = function (key) {
    for (var i = 0, len = this.data.length; i < len; i++) {
      if (this.data[i].key === key) {
        return this.data[i].value;
      }
    }
  };

  inherit(DataSource, Enum);

  return Enum;
});