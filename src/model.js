/**
 * @file Model父类
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var inherit = require('./tools/inherit');
  var extend = require('./tools/extend');

  function Model() {
    initActions(this.actions);
  }

  function SubModel() {
    Model.apply(this, arguments);
  }

  function initActions(actions) {
    for (var key in actions) {
      if (actions.hasOwnProperty(key)) {
        var action = actions[key];

        if (typeof action === 'string') {
          action = {
            url: action
          };
        }

        if (action instanceof Array && action.length) {
          for (var i = 0, len = action.length; i < len; i++) {
            var item = action[i];
            if (i === 0 && !item.init) {
              break;
            }

            item.init = true;
            loadAction(item, true);
          }
        } else {
          loadAction(action, true);
        }
      }
    }
  };

  function loadAction(action, isInit) {
    if (typeof action !== 'object') {
      return;
    }

    if (isInit && !action.init) {
      return;
    }


  }
    
  Model.prototype.request = function () {

  };

  Model.extend = function (options) {
    var SubModel = inherit(Model, SubModel);

    extend(SubModel.prototype, options);

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