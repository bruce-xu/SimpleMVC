/**
 * @file 数据源
 * @author brucexyj@gmail.com
 */

define(function (require) {
	function DataSource() {
		
	};

	/**
	 * 返回此数据源对应的数据，由于多数情况下是异步调用接口，为统一，此处需要返回promise对象
	 */
	DataSource.prototype.get = function () {
		throw new Error('The "get" method must be implemented.');
	};
});