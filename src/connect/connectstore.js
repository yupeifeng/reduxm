import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ConnectStore = (destroyStoreList = [], storeList = []) => target => {
	class reactDom extends target {
		componentWillUnmount() {
			let that = this;
			let sysRestState = that.props.sysRestState;
			sysRestState();
		}
	}

	let mapStateToProps = (state, ownProps) => {
		let mapStateToPropsParams = {};

		storeList.forEach(item => {
			mapStateToPropsParams[item] = state[item];
		});

		return mapStateToPropsParams;
	};

	let mapDispatchToProps = (dispatch, ownProps) => {
		return {
			sysRestState: bindActionCreators(
				() => dispatch => {
					destroyStoreList.forEach(item => {
						dispatch({ type: `${item}_sys_restState` });
					});
				},
				dispatch
			)
		};
	};

	if (target.mapDispatchToProps) {
		mapDispatchToProps = (dispatch, ownProps) => {
			return {
				...target.mapDispatchToProps(dispatch, ownProps),
				sysRestState: bindActionCreators(
					() => dispatch => {
						destroyStoreList.forEach(item => {
							dispatch({ type: `${item}_sys_restState` });
						});
					},
					dispatch
				)
			};
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(reactDom);
};

export default ConnectStore;
