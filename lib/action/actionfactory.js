'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *事件工厂
 */
var ActionFactory = (_temp = _class = function () {
	function ActionFactory() {
		_classCallCheck(this, ActionFactory);
	}

	_createClass(ActionFactory, null, [{
		key: 'initAction',


		/**
   * initAction方法,按actionName(事件层名称)存储所有actions
   * @params actionName(事件层名称),actions(action集合对象)
   */

		//按actionName(事件层名称)存储所有action
		value: function initAction() {
			var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			this.action[actionName] = actions;
		}

		/**
   * initGlobalAction方法,按actionName(事件层名称)存储全局性action,可供各个页面调用
   * @params actionName(事件层名称),globalAction(全局性action集合对象)
   */


		//存储全局性action,可供各个页面调用

	}, {
		key: 'initGlobalAction',
		value: function initGlobalAction() {
			var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var globalAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			this.globalAction[actionName] = globalAction;
		}

		/**
   * getAction方法,按actionName(事件层名称)获取所有actions
   * @param actionName(事件层名称)
   * @return actions
   */

	}, {
		key: 'getAction',
		value: function getAction() {
			var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this.action[actionName];
		}

		/**
   * getGlobalAction方法,获取全局性action
   * @return actions
   */

	}, {
		key: 'getGlobalAction',
		value: function getGlobalAction() {
			return this.globalAction;
		}
	}]);

	return ActionFactory;
}(), _class.action = {}, _class.globalAction = {}, _temp);
exports.default = ActionFactory;