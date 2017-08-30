/**
 * @file Model父类
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var inherit = require('./tools/inherit');
  var extend = require('./tools/extend');

  function Model() {
    this.init();
  }

  function SubModel() {
    Model.apply(this, arguments);
  }

  Model.prototype.init = function () {
    var actions = this.actions;
    
  };
    
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
      param: {}
    },
    c: {
      url: 'xxx',
      param: {},
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