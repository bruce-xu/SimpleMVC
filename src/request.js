/**
 * @file 处理ajax请求
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var isNativeSupport = typeof window.fetch === 'function';

  var fetch = isNativeSupport
    ? window.fetch
    : function (url, options) {
      return new Promise(function (resolve, reject) {
        ajax(url, options);
      });
    };

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
        success();
      } else {
        fail();
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