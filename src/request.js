/**
 * @file 处理ajax请求
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var extend = require('extend');

  var isNativeSupport = typeof window.fetch === 'function';

  function fetch(url, options) {
    options = options || {};

    return isNativeSupport
      ? window.fetch(url, extend(options, {credentials: 'same-origin'})).then(function (response) {
          if (response.ok && (response.status >= 200 && response.status < 300 || response.status === 304)) {
            if (options.dataType && options.dataType.toLowerCase() === 'json') {
              return response.json();
            }

            return response.text();
          }

          throw new Error(response.status);
        })
      : new Promise(function (resolve, reject) {
          ajax(url, options, resolve, reject);
        });
  }
  
  function ajax(url, options) {
  	var httpRequest;

  	if (window.XMLHttpRequest) {
  		httpRequest = new XMLHttpRequest();
  	} else if (window.ActiveXObject) {
  		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
  	} else {
      throw new Error('Ajax is not supported by your browser');
    }

    var contentType =  options.type && options.type.toLowerCase() === 'jaon'
      ? 'application/json'
      : 'application/x-www-form-urlencoded'
  	httpRequest.setRequestHeader('Content-Type', contentType);

  	httpRequest.onreadystatechange = function () {
      var readyState = httpRequest.readyState;
      var status = httpRequest.status;
      if (readyState === 4 && (status >= 200 && status < 300 || status === 304)) {
        success(httpRequest.response);
      } else {
        fail(status);
      }
    };

    httpRequest.open(options.method || 'GET', url, true);
    httpRequest.send();
  }

  function onLoad(httpRequest) {
  	if (httpRequest.readyState === 4) {
    	if (httpRequest.status === 200) {
			  
			}
		}
  }

  function get(options) {

  }

  return request;
});