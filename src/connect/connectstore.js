import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ConnectStore = (storeList = [], destroyStoreList = []) => target => {
	if (!target || typeof target != 'function') {
		throw new Error(`target Invalid value of type ${typeof target} for ConnectStore.`);
	}

	class reactDom extends target {
		componentWillUnmount() {
			let that = this;
			let sysRestState = that.props.sysRestState;
			sysRestState();
		}
	}

	let mapStateToProps = state => {
		let mapStateToPropsParams = {};

		storeList.forEach(key => {
			mapStateToPropsParams[key] = state[key];
		});

		return mapStateToPropsParams;
	};

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
