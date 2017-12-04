import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const RtRdCon = (mapStateToProps, mapDispatchToProps, ReactDom, pageName) => {
	class ReactDomExtWillUnmount extends ReactDom {
		componentWillUnmount() {
			let that = this;
			let sysRestState = that.props.sysRestState;
			sysRestState();
		}
	}

	let mapStateToPropsExt = (state, ownProps) => {
		return {
			...mapStateToProps(state, ownProps)
		};
	};

	let mapDispatchToPropsExt = (dispatch, ownProps) => {
		return {
			...mapDispatchToProps(dispatch, ownProps),
			sysRestState: bindActionCreators(
				() => dispatch => {
					dispatch({ type: `${pageName}_sys_restState` });
				},
				dispatch
			)
		};
	};

	return connect(mapStateToPropsExt, mapDispatchToPropsExt)(ReactDomExtWillUnmount);
};
