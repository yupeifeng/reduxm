'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *数据改变事件响应type工厂
 */
var ActionTypeFactory = (_temp = _class = function () {
	function ActionTypeFactory() {
		_classCallCheck(this, ActionTypeFactory);
	}

	_createClass(ActionTypeFactory, null, [{
		key: 'initActionType',


		/**
   * initActionType方法,按storeName(数据层名称)存储所有actionType
   * @param storeName(数据层名称)，actionTypes(actionTypes集合对象)
   */
		value: function initActionType() {
			var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var actionTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			this.actionType[storeName] = actionTypes;
		}

		/**
   * getActionType方法,按storeName(数据层名称)获取所有actionType
   * @param storeName(数据层名称)
   * @return actionType
   */

		//按storeName(数据层名称)存储所有actionType

	}, {
		key: 'getActionType',
		value: function getActionType() {
			var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this.actionType[storeName];
		}
	}]);

	return ActionTypeFactory;
}(), _class.actionType = {}, _temp);
exports.default = ActionTypeFactory;