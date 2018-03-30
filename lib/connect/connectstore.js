'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storefactory = require('../store/storefactory');

var _storefactory2 = _interopRequireDefault(_storefactory);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * connectStore修饰器,连接数据,事件和reactDom,离开页面触发数据销毁
 * @params reducerList[](页面所需全局共享性数据层名称),storeName(组件级无需共享数据层名称),destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
var connectStore = function connectStore() {
	var reducerList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var storeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var destroyStoreList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	return function (target) {
		if (!target || typeof target != 'function') {
			throw new Error('target Invalid value of type ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)) + ' for ConnectStore.');
		}

		//给页面props绑定所需数据
		var mapStateToProps = function mapStateToProps(state) {
			var mapStateToPropsParams = {};

			reducerList.forEach(function (key) {
				mapStateToPropsParams[key] = state[key] || null;
			});

			return mapStateToPropsParams;
		};

		if (!storeName) {
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

			//代理target并完善componentWillUnmount生命周期,离开页面时触发数据销毁

			var ReactDom = function (_React$Component) {
				_inherits(ReactDom, _React$Component);

				function ReactDom() {
					_classCallCheck(this, ReactDom);

					return _possibleConstructorReturn(this, (ReactDom.__proto__ || Object.getPrototypeOf(ReactDom)).apply(this, arguments));
				}

				_createClass(ReactDom, [{
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

				return ReactDom;
			}(_react2.default.Component);

			return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReactDom);
		} else {
			//给页面props绑定所需数据
			var mapStateToPropsLocal = function mapStateToPropsLocal(state) {
				var mapStateToPropsParams = {};

				mapStateToPropsParams[storeName] = state[storeName] || null;

				return mapStateToPropsParams;
			};

			//给页面props绑定所需事件
			var mapDispatchToPropsLocal = function mapDispatchToPropsLocal(dispatch, ownProps) {
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

			//代理target并完善componentWillUnmount生命周期,离开页面时触发数据销毁

			var _ReactDom = function (_React$Component2) {
				_inherits(_ReactDom, _React$Component2);

				function _ReactDom() {
					_classCallCheck(this, _ReactDom);

					return _possibleConstructorReturn(this, (_ReactDom.__proto__ || Object.getPrototypeOf(_ReactDom)).apply(this, arguments));
				}

				_createClass(_ReactDom, [{
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

				return _ReactDom;
			}(_react2.default.Component);

			var App = (0, _reactRedux.connect)(mapStateToPropsLocal, mapDispatchToPropsLocal)(_ReactDom);

			var SubApp = function (_React$Component3) {
				_inherits(SubApp, _React$Component3);

				function SubApp(props) {
					_classCallCheck(this, SubApp);

					var _this3 = _possibleConstructorReturn(this, (SubApp.__proto__ || Object.getPrototypeOf(SubApp)).call(this, props));

					_this3.store = (0, _redux.createStore)(_storefactory2.default.getStore(storeName), (0, _redux.applyMiddleware)(_reduxThunk2.default));
					return _this3;
				}

				_createClass(SubApp, [{
					key: 'componentWillUnmount',
					value: function componentWillUnmount() {
						this.props.sysRestState();
					}
				}, {
					key: 'render',
					value: function render() {
						return _react2.default.createElement(
							_reactRedux.Provider,
							{ store: this.store },
							_react2.default.createElement(App, Object.assign({}, this.props))
						);
					}
				}]);

				return SubApp;
			}(_react2.default.Component);

			var _mapDispatchToProps = function _mapDispatchToProps(dispatch, ownProps) {
				return {
					popDispatch: (0, _redux.bindActionCreators)(function (value) {
						return function (dispatch) {
							dispatch(value);
						};
					}, dispatch),
					sysRestState: (0, _redux.bindActionCreators)(function () {
						return function (dispatch) {
							destroyStoreList.forEach(function (key) {
								dispatch({ type: key + '_sys_restState' });
							});
						};
					}, dispatch)
				};
			};

			return (0, _reactRedux.connect)(mapStateToProps, _mapDispatchToProps)(SubApp);
		}
	};
};

exports.default = connectStore;