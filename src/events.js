define(function (require) {
  function Events() {
    this._events = {};
  }

  Events.prototype.on = function (type, callback, context, isOnce) {
    if (!type || typeof type !== 'string') {
      return;
    }

    if (typeof callback !== 'function') {
      return;
    }

    var hanlders = this._events[type];
    if (!hanlders) {
      hanlders = this._events[type] = [];
    }

    hanlders.push(callback);
  };
  
  Events.prototype.once = function (type, callback, context) {
    
  };
      
  Events.prototype.off = function () {
    
  };
  
  Events.prototype.fire = function () {
    
  };
});