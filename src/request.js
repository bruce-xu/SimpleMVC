/**
 * @file 处理异步请求
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var extend = require('./tools/extend');
  var serialize = require('./tools/serialize');

  var isNativeSupport = typeof window.fetch === 'function';

  /**
   * 异步请求服务端数据
   * @param {string} url 请求的地址
   * @param {Object} options 请求参数
   * @param {string} options.contentType 请求参数类型，默认为`application/x-www-form-urlencoded`，其他常用值为`application/json`
   * @param {Object|string} options.body 请求参数，如果是`Object`类型，会根据`contentType`转换成对应格式的字符串
   * @param {string} options.dataType 服务器返回的数据类型，目前支持`text`、`json`。如果设置则返回相应类型数据，否则返回`Response`类型对象
   * @param {Object} options.headers 请求头
   * @param {string} options.method 请求方法类型，默认为`GET`
   * @param {number} options.timeout 请求超时时间，单位为秒，默认不设置
   */
  function fetch(url, options) {
    var defaultOptions = {
      mode: 'cors',
      credentials: 'same-origin',
      contentType: 'application/x-www-form-urlencoded; charest=UTF-8'
    };

    options = extend({}, defaultOptions, options || {});

    var body = options.body;
    var contentType = options.contentType;
    var dataType = options.dataType;

    options.contentType = contentType && contentType.trim().toLowerCase()
      || 'application/x-www-form-urlencoded; charest=UTF-8';

    if (body && typeof body !== 'string') {
      options.body = /^application\/json/i.text(options.contentType)
        ? JSON.stringify(body)
        : serialize(body);
    }

    return new Promise(function (resolve, reject) {
        isNativeSupport
          ? nativeFetch(url, options, resolve, reject)
          : ajax(url, options, resolve, reject);
      })
      .then(function (response) {
        return processData(response, dataType);
      })
      .catch(function () {
        // TODO 通用错误处理
      });
  }
  
  function nativeFetch(url, options, resolve, reject) {
    var timeout = options.timeout;
    var timeoutTimer;
    var isTimeout = false;

    if (timeout && timeout > 0) {
      timeoutTimer = setTimeout(function () {
        isTimeout = true;
        reject(new Error('timeout'));
      }, timeout * 1000);
    }

    window.fetch(url, options)
      .then(function (response) {
        // 已经超时了，下面的操作已无意义了，直接返回
        if (isTimeout) {
          return;
        }

        timeoutTimer && clearTimeout(timeoutTimer);

        if (checkStatus(response.status)) {
          resolve(response);
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          reject(error);
        }
      });
  }

  function ajax(url, options, resolve, reject) {
  	var httpRequest;

  	if (window.XMLHttpRequest) {
  		httpRequest = new XMLHttpRequest();
  	} else if (window.ActiveXObject) {
  		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
  	} else {
      throw new Error('Ajax is not supported by your browser');
    }

  	httpRequest.setRequestHeader('Content-Type', options.contentType);

    var timeout = options.timeout;
    var timeoutTimer;
    if (timeout && timeout > 0) {
      timeoutTimer = setTimeout(function () {
        httpRequest.about('timeout');
      }, timeout * 1000);
    }

  	httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        timeoutTimer && clearTimeout(timeoutTimer);

        if (checkStatus()) {
          resolve(httpRequest.response);
        } else {
          var error = new Error(httpRequest.statusText);
          error.response = httpRequest.response;
          reject(error);
        }
      }
    };

    httpRequest.open(options.method || 'GET', url, true);
    httpRequest.send(options.body || null);
  }

  function checkStatus(status) {
    if (status >= 200 && status < 300 || status === 304) {
      return true;
    }

    return false;
  }

  function processData(response, dataType) {
    if (!dataType) {
      return response;
    }

    if (dataType.toLowerCase()) {
      switch (dataType) {
        case 'text':
          return response.text();
        case 'json':
          return response.json();
      }
    }
    
    return response;
  }

  function fetchGet(url, options) {
    options = options || {};
    options.method = 'GET';

    return fetch(url, options);
  }

  function fetchPost(url, options) {
    options = options || {};
    options.method = 'POST';

    return fetch(url, options);
  }

  return {
    fetch: fetch,
    get: fetchGet,
    post: fetchPost
  };
});