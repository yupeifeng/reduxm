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

var ReducerFactory = (_temp = _class = function () {
	function ReducerFactory() {
		_classCallCheck(this, ReducerFactory);
	}

	_createClass(ReducerFactory, null, [{
		key: 'initReducer',
		value: function initReducer() {
			var storeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var _this = this;

			var excludeState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

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
	}]);

	return ReducerFactory;
}(), _class.reducer = {}, _class.initialData = {}, _temp);
exports.default = ReducerFactory;