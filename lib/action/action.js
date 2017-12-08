'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _actionfactory = require('./actionfactory');

var _actionfactory2 = _interopRequireDefault(_actionfactory);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = (_temp = _class = function Action() {
	_classCallCheck(this, Action);
}, _class.action = function () {
	var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target) {
		if (!actionName) {
			return;
		}

		var actions = {};
		for (var i in target) {
			if (target[i]['reducerManager_actionFunName']) {
				actions[target[i]['reducerManager_actionFunName']] = target[i]['reducerManager_actionProps'];
			}
		}

		_actionfactory2.default.initAction(actionName, actions);
	};
}, _class.actionProps = function () {
	var actionFunName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target, key) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for actionProps.');
		}

		if (!key || typeof key != 'string') {
			throw new Error('key Invalid value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)) + ' for actionProps.');
		}

		if (target[key]['reducerManager_actionProps']) {
			target[key]['reducerManager_actionFunName'] = actionFunName;
		} else {
			target[key] = {
				reducerManager_actionProps: target[key],
				reducerManager_actionFunName: actionFunName
			};
		}
		return target;
	};
}, _class.actionInjection = function () {
	var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return function (target, key) {
		var actions = _actionfactory2.default.getAction(actionName);

		target.mapDispatchToProps = function (dispatch, ownProps) {
			var mapDispatchToPropsParams = {};

			for (var i in actions) {
				if (actions[i]) {
					mapDispatchToPropsParams[i] = (0, _redux.bindActionCreators)(actions[i], dispatch);
				}
			}
			return mapDispatchToPropsParams;
		};
	};
}, _temp);
exports.default = Action;