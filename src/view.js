define(function (require) {
  var inherit = require('./tools/inherit');
  var extend = require('./tools/extend');
  var capitalized = require('./tools/capitalized');
  var eventbus = require('./eventbus');
  var Enum = require('./enum');
  var ServerData = require('./serverdata');

  function View() {
    initActions(this.actions);
  }

  function SubView() {
    View.apply(this, arguments);
  }

  View.prototype.init = function () {
    
  };

  View.prototype.events = function () {
    
  };

  View.prototype.render = function () {

  };

  
  View.extend = function (options) {
    var SubView = inherit(View, SubView);

    extend(SubView.prototype, options);

    var prototype = SubView.prototype;


    return SubView;
  };
});