/**
 * @file 路由，根据不同hash，定位到不同的View
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var config = require('./config');
  var eventbus = require('./eventbus');

  var viewsMapping = config.views;

  eventbus.on('hashchange', function (param) {
    var hash = param.newHash;
    var view = viewsMapping[hash];

    if (!view) {
      view = hash.slice(0, 1).toUpperCase() + hash.slice(1).toLowerCase() + 'View';
    }

    eventbus.fire('load', view);
  });
});