import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

/**
 * connectStore修饰器,连接数据,事件和reactDom
 * @params storeList[](页面所需数据层名称), destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
const connectStore = (storeList = [], destroyStoreList = []) => target => {
	if (!target || typeof target != 'function') {
		throw new Error(`target Invalid value of type ${typeof target} for ConnectStore.`);
	}

	//代理target并完善componentWillUnmount生命周期离开页面触发数据销毁
	class reactDom extends React.Component {
		componentWillUnmount() {
			this.props.sysRestState();
		}

		render() {
			return React.createElement(target, Object.assign({}, this.props));
		}
	}

	for (let key in target) {
		reactDom[key] = target[key];
	}

	//给页面props绑定所需数据
	let mapStateToProps = state => {
		let mapStateToPropsParams = {};

		storeList.forEach(key => {
			mapStateToPropsParams[key] = state[key];
		});

		return mapStateToPropsParams;
	};

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

	return connect(mapStateToProps, mapDispatchToProps)(reactDom);
};

export default connectStore;
