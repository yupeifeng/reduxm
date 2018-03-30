import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import StoreFactory from '../store/storefactory';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/**
 * connectStore修饰器,连接数据,事件和reactDom,离开页面触发数据销毁
 * @params reducerList[](页面所需全局共享性数据层名称),storeName(组件级无需共享数据层名称),destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
const connectStore = (reducerList = [], storeName = '', destroyStoreList = []) => target => {
	if (!target || typeof target != 'function') {
		throw new Error(`target Invalid value of type ${typeof target} for ConnectStore.`);
	}

	//给页面props绑定所需数据
	let mapStateToProps = state => {
		let mapStateToPropsParams = {};

		reducerList.forEach(key => {
			mapStateToPropsParams[key] = state[key] || null;
		});

		return mapStateToPropsParams;
	};

	if (!storeName) {
		//给页面props绑定所需事件
		let mapDispatchToProps = (dispatch, ownProps) => {
			if (target.mapDispatchToProps) {
				return {
					...target.mapDispatchToProps(dispatch, ownProps),
					sysRestState: bindActionCreators(
						() => dispatch => {
							destroyStoreList.forEach(key => {
								dispatch({ type: `${key}_sys_restState` });
							});
						},
						dispatch
					)
				};
			} else {
				return {
					sysRestState: bindActionCreators(
						() => dispatch => {
							destroyStoreList.forEach(key => {
								dispatch({ type: `${key}_sys_restState` });
							});
						},
						dispatch
					)
				};
			}
		};

		//代理target并完善componentWillUnmount生命周期,离开页面时触发数据销毁
		class ReactDom extends React.Component {
			componentWillUnmount() {
				this.props.sysRestState();
			}

			render() {
				return React.createElement(target, Object.assign({}, this.props));
			}
		}

		return connect(mapStateToProps, mapDispatchToProps)(ReactDom);
	} else {
		//给页面props绑定所需数据
		let mapStateToPropsLocal = state => {
			let mapStateToPropsParams = {};

			mapStateToPropsParams[storeName] = state[storeName] || null;

			return mapStateToPropsParams;
		};

		//给页面props绑定所需事件
		let mapDispatchToPropsLocal = (dispatch, ownProps) => {
			if (target.mapDispatchToProps) {
				return {
					...target.mapDispatchToProps(dispatch, ownProps),
					sysRestState: bindActionCreators(
						() => dispatch => {
							destroyStoreList.forEach(key => {
								dispatch({ type: `${key}_sys_restState` });
							});
						},
						dispatch
					)
				};
			} else {
				return {
					sysRestState: bindActionCreators(
						() => dispatch => {
							destroyStoreList.forEach(key => {
								dispatch({ type: `${key}_sys_restState` });
							});
						},
						dispatch
					)
				};
			}
		};

		//代理target并完善componentWillUnmount生命周期,离开页面时触发数据销毁
		class ReactDom extends React.Component {
			componentWillUnmount() {
				this.props.sysRestState();
			}

			render() {
				return React.createElement(target, Object.assign({}, this.props));
			}
		}

		let App = connect(mapStateToPropsLocal, mapDispatchToPropsLocal)(ReactDom);

		class SubApp extends React.Component {
			constructor(props) {
				super(props);
				this.store = createStore(StoreFactory.getStore(storeName), applyMiddleware(thunk));
			}

			componentWillUnmount() {
				this.props.sysRestState();
			}

			render() {
				return <Provider store={this.store}>{React.createElement(App, Object.assign({}, this.props))}</Provider>;
			}
		}

		let mapDispatchToProps = (dispatch, ownProps) => {
			return {
				popDispatch: bindActionCreators(
					value => dispatch => {
						dispatch(value);
					},
					dispatch
				),
				sysRestState: bindActionCreators(
					() => dispatch => {
						destroyStoreList.forEach(key => {
							dispatch({ type: `${key}_sys_restState` });
						});
					},
					dispatch
				)
			};
		};

		return connect(mapStateToProps, mapDispatchToProps)(SubApp);
	}
};

export default connectStore;
