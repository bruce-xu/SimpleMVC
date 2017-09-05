/**
 * @file 处理ajax请求
 * @author brucexyj@gmail.com
 */

define(function (require) {
  function request(options) {
  	var httpRequest;

  	if (window.XMLHttpRequest) {
  		httpRequest = new XMLHttpRequest();
  	} else if (window.ActiveXObject) {
  		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  	}

  	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  	httpRequest.onreadystatechange = onLoad;
    httpRequest.open('GET', 'test.html');
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