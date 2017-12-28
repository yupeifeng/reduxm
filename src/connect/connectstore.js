import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * ConnectStore方法,链接数据，事件和reactDom
 * @params storeList[](页面所需数据层名称), destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
const ConnectStore = (storeList = [], destroyStoreList = []) => target => {
	if (!target || typeof target != 'function') {
		throw new Error(`target Invalid value of type ${typeof target} for ConnectStore.`);
	}

	//继承reactDom并重构componentWillUnmount生命周期离开页面触发数据销毁
	class reactDom extends target {
		componentWillUnmount() {
			let that = this;
			if (target.componentWillUnmount && typeof target.componentWillUnmount == 'function') {
				target.componentWillUnmount.apply(that);
			}
			let sysRestState = that.props.sysRestState;
			sysRestState();
		}
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

export default ConnectStore;
