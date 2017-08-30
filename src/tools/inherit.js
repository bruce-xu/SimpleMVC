/**
 * @file 继承
 * @author brucexyj@gmail.com
 */

define(function (require) {
	function Empty() {}

	function inherit(ParentClass, ChildClass) {
		Empty.prototype = ParentClass.prototype;

		if (typeof ChildClass === 'undefined') {
			ChildClass = function () {};
		}

		ChildClass.prototype = new Empty();
		ChildClass.prototype.constructor = ChildClass;

		return ChildClass;
	}

	return inherit;
});