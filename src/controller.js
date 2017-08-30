/**
 * @file 全局控制器
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var eventbus = require('./eventbus');

  eventbus.on('load', loadView);

  function loadView(view) {
    return new Promise(function (resolve, reject) {
      require(view).ensure(function (view) {
        resolve(view);
      });
    });
  }

  function loadData(model) {
    
  }
});