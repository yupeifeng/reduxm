'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _redux = require('redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *数据工厂
 */
var ReducerFactory = (_temp = _class = function () {
	function ReducerFactory() {
		_classCallCheck(this, ReducerFactory);
	}

	_createClass(ReducerFactory, null, [{
		key: 'deepImmutableJS',

		//使用Immutable深度拷贝数据,初始数据已经是Immutable无需拷贝直接赋值

		//按storeName名称存储需要销毁的数据字段
		value: function deepImmutableJS(data) {
			var result = {};
			for (var key in data) {
				if (_immutable2.default.isImmutable(data[key])) {
					result[key] = data[key];
				} else {
					var item = _immutable2.default.fromJS(data[key]);
					if (_immutable2.default.isImmutable(item)) {
						result[key] = _immutable2.default.fromJS(data[key]).toJS();
					} else {
						result[key] = _immutable2.default.fromJS(data[key]);
					}
				}
			}
			return result;
		}

		/**
   * initReducer方法,按名称将数据、数据改变函数存入ReducerFactory
   * @params storeName(数据层名称), initialData(离开页面需要销毁的数据), excludeData(离开页面不需要销毁的数据), actions(数据改变函数)
   */

		//按storeName名称存储需要不需要销毁的数据字段

		//按storeName名称存储reducer纯函数给redux的combineReducers方法使用

	}, {
		key: 'initReducer',
		value: function initReducer() {
			var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var initialData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var _this = this;

			var excludeData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

			//存储initialData、excludeData,注意使用deepImmutableJS确保数据安全
			this.initialData[storeName] = this.deepImmutableJS(initialData);
			this.excludeData[storeName] = this.deepImmutableJS(excludeData);

			//生成reducer纯函数
			var reducer = function reducer() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.assign({}, initialData, excludeData);
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				switch (action['type']) {
					//离开也能数据销毁响应
					case storeName + '_sys_restState':
						//注意使用deepImmutableJS确保数据安全
						return Object.assign({}, state, _this.deepImmutableJS(_this.initialData[storeName]));
					//改变数据响应actions
					default:
						if (actions[action['type']]) {
							return actions[action['type']](state, action);
						} else {
							return _extends({}, state);
						}
				}
			};

			//存储reducer
			this.reducer[storeName] = reducer;
		}

		/**
   * getReducer方法,获取整个Reducer数据树
   * @return Reducer
   */

	}, {
		key: 'getReducer',
		value: function getReducer() {
			return (0, _redux.combineReducers)(this.reducer);
		}

		/**
   * getAllInitData方法,获取storeName下所有初始数据
   * @param storeName(数据层名称)
   * @return {}
   */

	}, {
		key: 'getAllInitData',
		value: function getAllInitData() {
			var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			//获取initialData、excludeData,注意使用Immutable.fromJS确保数据安全
			var initialData = this.deepImmutableJS(this.initialData[storeName]);
			var excludeData = this.deepImmutableJS(this.excludeData[storeName]);
			return Object.assign({}, initialData, excludeData);
		}
	}]);

	return ReducerFactory;
}(), _class.reducer = {}, _class.initialData = {}, _class.excludeData = {}, _temp);
exports.default = ReducerFactory;