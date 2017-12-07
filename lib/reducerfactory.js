'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _redux = require('redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReducerFactory = (_temp = _class = function () {
	function ReducerFactory() {
		_classCallCheck(this, ReducerFactory);
	}

	_createClass(ReducerFactory, null, [{
		key: 'initReducer',
		value: function initReducer() {
			var _this = this;

			var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			if (!target.name || typeof target.name != 'string') {
				throw new Error('target.name Invalid value of type ' + _typeof(target.name) + ' for initReducer.');
			}

			var storeName = target.name;
			var initialState = {};
			var excludeState = {};
			var actionTypes = {};
			var actions = {};

			var _loop = function _loop(i) {
				if (target[i].destroy) {
					initialState[i] = target[i].value;
				} else {
					excludeState[i] = target[i].value;
				}

				if (target[i].actionType) {
					actionTypes[target[i].actionType] = storeName + '_' + target[i].actionType;

					actions[storeName + '_' + target[i].actionType] = function (state, action) {
						var arg = {};
						arg[i] = action[i];
						return Object.assign({}, state, arg);
					};
				}
			};

			for (var i in target) {
				_loop(i);
			}

			actionTypes.sys_restState = storeName + '_sys_restState';

			this.actionType[storeName] = actionTypes;

			this.initialData[storeName] = _immutable2.default.fromJS(initialState).toJS();

			var reducer = function reducer() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.assign({}, initialState, excludeState);
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				switch (action['type']) {
					case storeName + '_sys_restState':
						return Object.assign({}, state, _immutable2.default.fromJS(_this.initialData[storeName]).toJS());
					default:
						if (actions[action['type']]) {
							return actions[action['type']](state, action);
						} else {
							return _extends({}, state);
						}
				}
			};

			this.reducer[storeName] = reducer;
		}
	}, {
		key: 'getReducer',
		value: function getReducer() {
			return (0, _redux.combineReducers)(this.reducer);
		}
	}, {
		key: 'getActionType',
		value: function getActionType(pageName) {
			return this.actionType[pageName];
		}
	}]);

	return ReducerFactory;
}(), _class.reducer = {}, _class.actionType = {}, _class.initialData = {}, _temp);
exports.default = ReducerFactory;