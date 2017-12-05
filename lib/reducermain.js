'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _redux = require('redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReducerMain = (_temp = _class = function () {
	function ReducerMain() {
		_classCallCheck(this, ReducerMain);
	}

	_createClass(ReducerMain, null, [{
		key: 'initReducer',
		value: function initReducer() {
			var actionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var excludeState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			var _this = this;

			var actionFun = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (state, action) {};
			var pageName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

			this.initialData[pageName] = _immutable2.default.fromJS(initialState).toJS();

			var reducer = function reducer() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.assign({}, initialState, excludeState);
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				switch (action['type']) {
					case pageName + '_sys_restState':
						return Object.assign({}, state, _immutable2.default.fromJS(_this.initialData[pageName]).toJS());
					default:
						return actionFun(state, action);
				}
			};

			this.reducer[pageName] = reducer;

			for (var i in actionType) {
				actionType[i] = pageName + '_' + actionType[i];
			}

			actionType.sys_restState = pageName + '_sys_restState';

			this.actionType[pageName] = actionType;

			return true;
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

	return ReducerMain;
}(), _class.reducer = {}, _class.actionType = {}, _class.initialData = {}, _temp);
exports.default = ReducerMain;