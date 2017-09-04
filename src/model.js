/**
 * @file Model父类
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var inherit = require('./tools/inherit');
  var extend = require('./tools/extend');
  var capitalized = require('./tools/capitalized');
  var eventbus = require('./eventbus');
  var Enum = require('./enum');
  var ServerData = require('./serverdata');

  function Model() {
    initActions(this.actions);
  }

  function SubModel() {
    Model.apply(this, arguments);
  }

  function initActions(actions) {
    var promises = [];

    for (var key in actions) {
      if (actions.hasOwnProperty(key)) {
        var action = actions[key];

        if (typeof action === 'string') {
          action = {
            url: action
          };
        }

        action.name = key;

        if (action instanceof Array) {
          var promiseChain = Promise.resolve();

          for (var i = 0, len = action.length; i < len; i++) {
            var item = action[i];

            if (i === 0 && !item.init) {
              break;
            }

            item.init = true;
            promiseChain.then(function () {
              return loadAction(item, true);
            });
          }

          promises.push(promiseChain);
        } else {
          promises.push(loadAction(action, true));
        }
      }
    }

    Promise.all(promises).then(function (datas) {
      eventbus.fire('dataready', datas);
    });
  };

  function loadAction(action, isInit) {
    if (typeof action !== 'object') {
      return;
    }

    if (isInit && !action.init) {
      return;
    }

    var promise;
    if (action.type && action.type.toLowerCase() === 'enum') {
      promise = new Enum(action.data || []).get();
    } else {
      promise = new ServerData(action).get();
    }

    var processFunc = 'process' + capitalized(action.name);
    if (typeof action[processFunc] === 'function') {
      return promise.then(function (data) {
        processFunc(data);
      });
    }

    return promise;
  }
    
  Model.prototype.request = function () {

  };

  Model.extend = function (options) {
    var SubModel = inherit(Model, SubModel);

    extend(SubModel.prototype, options);

    var prototype = SubModel.prototype;

    var actions = options.actions || {};
    for (var key in actions) {
      if (actions.hasOwnProperty(key)) {
        var action = actions[key];

        if (typeof action === 'string') {
          action = {
            url: action
          };
        }

        action.name = key;

        if (typeof action.process === 'function') {
          var processName = 'process' + capitalized(key);
          prototype[processName] = action.process;
        }
      }
    }

    return SubModel;
  };
});

Model.extend({
  actions: {
    a: 'xxx',
    b: {
      url: 'xxx',
      query: {}
    },
    c: {
      url: 'xxx',
      query: {},
      flat: true,
      // process: 'processA'
      process: function (data) {}
    },
    d: {

    }
  },
  process: function (data) {

  }
})