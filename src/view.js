define(function (require) {
  var inherit = require('./tools/inherit');
  var extend = require('./tools/extend');
  var capitalized = require('./tools/capitalized');
  var promisify = require('./tools/promisify');
  var eventbus = require('./eventbus');
  var Enum = require('./enum');
  var ServerData = require('./serverdata');

  function View() {
    // this.init && this.init();
    // this.beforeLoad && this.beforeLoad();
    // this.model && this.model.init && this.model.init();

    var init = promisify(this.init, this);
    var beforeLoad = promisify(this.beforeLoad, this);
    var modelInit = promisify(this.model.init, this.model);

    init()
      .then(beforeLoad)
      .then(modelInit)
      .then(function () {
        this.render();
      });
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
    var prototype = SubView.prototype;

    extend(prototype, options);



    return SubView;
  };
});


// Demo
var model = require('./model');
View.extend({
  model: model,
  init: function () {

  },
  beforeLoad: function () {

  },
  loaded: function (data) {

  },
  events: {
    '#btn click': 'onBtnClick'
  },
  render: function () {

  }
})