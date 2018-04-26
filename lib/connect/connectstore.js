'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * connectStore修饰器,连接数据,事件和reactDom
 * @params storeList[](页面所需数据层名称), destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
var connectStore = function connectStore() {
	var storeList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var destroyStoreList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	return function (target) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for ConnectStore.');
		}

		//代理target并完善componentWillUnmount生命周期离开页面触发数据销毁

		var reactDom = function (_React$Component) {
			_inherits(reactDom, _React$Component);

			function reactDom() {
				_classCallCheck(this, reactDom);

				return _possibleConstructorReturn(this, (reactDom.__proto__ || Object.getPrototypeOf(reactDom)).apply(this, arguments));
			}

			_createClass(reactDom, [{
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					this.props.sysRestState();
				}
			}, {
				key: 'render',
				value: function render() {
					return _react2.default.createElement(target, Object.assign({}, this.props));
				}
			}]);

			return reactDom;
		}(_react2.default.Component);

		for (var key in target) {
			reactDom[key] = target[key];
		}

		//给页面props绑定所需数据
		var mapStateToProps = function mapStateToProps(state) {
			var mapStateToPropsParams = {};

			storeList.forEach(function (key) {
				mapStateToPropsParams[key] = state[key];
			});

			return mapStateToPropsParams;
		};

		//给页面props绑定所需事件
		var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
			if (target.mapDispatchToProps) {
				return _extends({}, target.mapDispatchToProps(dispatch, ownProps), {
					sysRestState: (0, _redux.bindActionCreators)(function () {
						return function (dispatch) {
							destroyStoreList.forEach(function (key) {
								dispatch({ type: key + '_sys_restState' });
							});
						};
					}, dispatch)
				});
			} else {
				return {
					sysRestState: (0, _redux.bindActionCreators)(function () {
						return function (dispatch) {
							destroyStoreList.forEach(function (key) {
								dispatch({ type: key + '_sys_restState' });
							});
						};
					}, dispatch)
				};
			}
		};

		return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(reactDom);
	};
};

exports.default = connectStore;