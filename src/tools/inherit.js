/**
 * @file 继承
 * @author brucexyj@gmail.com
 */

define(function (require) {
	function inherit(parentClass, childClass) {
		childClass.prototype = new parentClass();
		childClass.prototype.constructor = childClass;
	}
});