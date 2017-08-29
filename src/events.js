/**
 * @file 自定义事件
 * @author brucexyj@gmail.com
 */

define(function (require) {
	var extend = require('extend');

  function Events() {
    this._events = {};
  }

  /**
   * 注册事件
   * @param {string} type 事件类型
   * @param {Function} callback 事件回调
   * @param {Object} context 调用事件回调时的this对象
   * @param {boolean} isOnce 是否是一次性事件
   */
  Events.prototype.on = function (type, callback, context, isOnce) {
    if (!type || typeof type !== 'string') {
      return;
    }

    if (typeof callback !== 'function') {
      return;
    }

    var handlers = this._events[type];
    if (!handlers) {
      handlers = this._events[type] = [];
    }

    handlers.push({
    	callback: callback,
    	context: context || this,
    	isOnce: !!isOnce
    });
  };
  
  /**
   * 注册一次性调用事件
   * @param {string} type 事件类型
   * @param {Function} callback 事件回调
   * @param {Object} context 调用事件回调时的this对象
   */
  Events.prototype.once = function (type, callback, context) {
    this.on(type, callback, context, true);
  };

  /**
   * 取消事件注册
   * @param {string} type 事件类型
   * @param {Function} callback 待取消的事件回调
   */
  Events.prototype.off = function (type, callback) {
  	var handlers = this._events[type] || [];

  	if (typeof type === 'undefined') {
  		this._events = {};
  	} else if (typeof callback === 'undefined') {
  		delete this._events[type];
  	} else {
  		if (handlers.length) {
	    	for (var i = 0, len = handlers.length; i < len; i++) {
	    		if (callback === handlers[i]) {
	    			handlers.splice(i, 1);
	    			break;
	    		}
	    	}
	    }
  	}
  };
  
  /**
   * 触发事件
   * @param {string} type 事件类型
   * @param {Object} param 触发事件时，传递的参数
   */
  Events.prototype.fire = function (type, param) {
  	var handlers = this._events[type] || [];

    if (handlers.length) {
    	for (var i = 0; i < handlers.length; i++) {
    		var handler = handlers[i];
    		var callback = handler.callback;
    		var context = handler.context;
    		var isOnce = handler.isOnce;

    		callback.call(context, param);

    		if (isOnce) {
    			handlers.splice(i, 1);
    		}
    	}
    }
  };

  Events.enable = function (obj) {

  };
});