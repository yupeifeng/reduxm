'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _redux = require('redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RtRdCon = function RtRdCon(mapStateToProps, mapDispatchToProps, ReactDom, pageName) {
	var ReactDomExtWillUnmount = function (_ReactDom) {
		_inherits(ReactDomExtWillUnmount, _ReactDom);

		function ReactDomExtWillUnmount() {
			_classCallCheck(this, ReactDomExtWillUnmount);

			return _possibleConstructorReturn(this, (ReactDomExtWillUnmount.__proto__ || Object.getPrototypeOf(ReactDomExtWillUnmount)).apply(this, arguments));
		}

		_createClass(ReactDomExtWillUnmount, [{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var that = this;
				var sysRestState = that.props.sysRestState;
				sysRestState();
			}
		}]);

		return ReactDomExtWillUnmount;
	}(ReactDom);

	var mapStateToPropsExt = function mapStateToPropsExt(state, ownProps) {
		return _extends({}, mapStateToProps(state, ownProps));
	};

	var mapDispatchToPropsExt = function mapDispatchToPropsExt(dispatch, ownProps) {
		return _extends({}, mapDispatchToProps(dispatch, ownProps), {
			sysRestState: (0, _redux.bindActionCreators)(function () {
				return function (dispatch) {
					dispatch({ type: pageName + '_sys_restState' });
				};
			}, dispatch)
		});
	};

	return (0, _reactRedux.connect)(mapStateToPropsExt, mapDispatchToPropsExt)(ReactDomExtWillUnmount);
};

exports.default = RtRdCon;