/**
 * @file 继承
 * @author brucexyj@gmail.com
 */

define(function (require) {
	function Empty() {}

	function inherit(ParentClass, ChildClass) {
		Empty.prototype = ParentClass.prototype;
		ChildClass.prototype = new Empty();
		ChildClass.prototype.constructor = ChildClass;
	}
});