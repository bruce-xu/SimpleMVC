define(function (require) {
  // 是否浏览器原生支持
  var isNativeSupport = typeof Function.prototype.bind === 'function';
  
  function bind(func, context) {
    // 获取绑定时的参数
    var args = Array.prototype.slice.call(arguments, 2);

    if (isNativeSupport) {
      // 原生支持时，调用原生的方法
      return Function.prototype.bind.apply(func, [].concat(context, args));
    } else {
      // 原生不支持时，通过apply方法模拟
      return function () {
        // 最终参数为绑定时的参数与调用时的参数的总和
        var params = [].concat(args, Array.prototype.slice.call(arguments));
        return func.apply(context, params);
      };
    }
  }

  return bind;
});