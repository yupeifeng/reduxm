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
		key: 'extend',
		value: function extend(target, source) {
			var allObject = {};

			for (var obj in target) {
				allObject[obj] = target[obj];
			}
			for (var _obj in source) {
				allObject[_obj] = source[_obj];
			}
			return allObject;
		}
	}, {
		key: 'addPageName',
		value: function addPageName(actionType, pageName) {
			for (var i in actionType) {
				actionType[i] = pageName + '_' + actionType[i];
			}

			actionType.sys_restState = pageName + '_sys_restState';

			return actionType;
		}
	}, {
		key: 'addSysRestState',
		value: function addSysRestState(pageReducer, pageName) {
			var _this = this;

			this.saveInitialState[pageName] = _immutable2.default.fromJS(pageReducer.initialState).toJS();

			var initialState = pageReducer.initialState;
			var excludeState = pageReducer.excludeState;
			var actionFun = pageReducer.actionFun;

			var reducerExt = function reducerExt() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.extend(initialState, excludeState);
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				switch (action['type']) {
					case pageName + '_sys_restState':
						return _this.extend(state, _immutable2.default.fromJS(_this.saveInitialState[pageName]).toJS());
					default:
						return actionFun(state, action);
				}
			};

			return reducerExt;
		}
	}, {
		key: 'initReducer',
		value: function initReducer(actionType, initialState, excludeState, actionFun, pageName) {
			this.reducer.push({
				pageName: pageName,
				pageReducer: {
					initialState: initialState,
					excludeState: excludeState,
					actionFun: actionFun
				}
			});

			this.actionType[pageName] = this.addPageName(actionType, pageName);

			return this.reducer;
		}
	}, {
		key: 'getReducer',
		value: function getReducer() {
			var _this2 = this;

			var combineReducersParams = {};

			this.reducer.forEach(function (item) {
				if (item) {
					combineReducersParams[item.pageName] = _this2.addSysRestState(item.pageReducer, item.pageName);
				}
			});

			return (0, _redux.combineReducers)(combineReducersParams);
		}
	}, {
		key: 'getActionType',
		value: function getActionType(pageName) {
			return this.actionType[pageName];
		}
	}]);

	return ReducerMain;
}(), _class.reducer = [], _class.actionType = {}, _class.saveInitialState = {}, _temp);
exports.default = ReducerMain;