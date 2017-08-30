/**
 * @file 全局配置对象
 * @author brucexyj@gmail.com
 */

define(function (require) {
  var config = {
    // 首页的hash，URL中未指明时，会跳转到此hash地址
    index: 'index',

    // hash与页面View的映射，未指明时，以hash首字母大写+‘View’作为对应的view来匹配
    views: {}
  };

  return config;
});