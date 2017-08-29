/**
 * @file 侦测浏览器hash变化，触发相应的操作
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var eventbus = require('./eventbus');

  var isNativeSupport = 'onhashchange' in window;

  var oldHash = '';

  function onHashChange() {
  	var newHash = location.hash;

  	eventbus.fire('hashchange', {
  		oldHash: oldHash,
  		newHash: newHash
  	})

  	oldHash = newHash;
  }

  if (isNativeSupport) {
  	window.addEventListener('hashchange', onHashChange, false);
  } else {
  	setInterval(function () {
  		if (location.hash !== oldHash) {
  			onHashChange();
  		}
  	}, 100);
  }

  // 启动时调用一次hashchange处理函数，处理载入时的hash（此处通过setTimeout保证框架已初始化完成）
  setTimeout(function () {
  	onHashChange();
  });
});