/**
 * @file 服务端数据
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var extend = require('./tools/extend');
  var inherit = require('./tools/inherit');
  var request = require('./request');
  var DataSource = require('./datasource');

  function ServerData(options) {
    var defaultOptions = {
      method: 'GET',
      contentType: 'json'
    };

    options = extend(defaultOptions, options);

    this.options = options;
  }

  ServerData.prototype.get = function () {
    return request(this.options);
  };

  inherit(DataSource, ServerData);

  return ServerData;
});