/**
 * @file 序列化数据，用户处理`GET`或`POST`的参数（请求头`content-type=application/x-www-form-urlencoded`时的参数格式处理）
 * @author brucexyj@gmail.com
 */

define(function (require) {
  /**
   * 遍历对象或数组时，将任一属性当成是一个节点
   * @param {string} key 某一结点的属性名
   */
  function Node(key) {
    this.key = key;
  }
  
  /**
   * 序列化对象或数组，用于`Ajax`请求时格式化参数
   *  - 如有如下的参数对象：{a: {b: 1, c: {c1: 2, c2: {d1: [1, {e1: 1}]}}}, d: [3, 4, {e: 5}]}，
   *  - 经处理后将变成：a[b]=1&a[c][c1]=2&a[c][c2][d1][]=1&a[c][c2][d1][1][e1]=1&d[]=3&d[]=4&d[2][e]=5
   * 
   * 可以将待处理的对象或数组看成是一棵树状结构，格式化的过程就是遍历整棵树的过程
   * @param {Object|Array} data 待序列化的对象或数组
   */
  function serialize(data) {
    var keys = [];

    serializePath(data, null, keys);

    return keys.join('&');
  }

  function serializePath(data, parent, keys, isArrayPrevious) {
    if (typeof data === 'object' || data instanceof Array) {
      var isArray = data instanceof Array;
      each(data, function(item, key) {
        var node = new Node(key);
        node.parent = parent;
        serializePath(item, node, keys, isArray);
      });
    } else {
      // 如果最后一级是数组，则数组的索引可以不用出现在`key`中
      if (isArrayPrevious) {
        parent.key = '';
      }
      var key = getKey(parent);
      keys.push(key + '=' + encodeURIComponent(data));
    }
  }

  function getKey(node) {
    var key = '';
    var path = [];

    while (node) {
      path.push(node.key);
      node = node.parent;
    }
    
    path.reverse();

    for (var i = 0, len = path.length; i < len; i++) {
      key += (i === 0 ? '' : '[') + path[i] + (i === 0 ? '' : ']');
    }

    return key;
  }

  return serialize;
});