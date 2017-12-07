import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const RtRdCon = (storeName = '') => target => {
	if (!target.mapStateToProps || typeof target.mapStateToProps != 'function') {
		throw new Error(`mapStateToProps Invalid value of type ${typeof target.mapStateToProps} for RtRdCon.`);
	}

	if (!target.mapDispatchToProps || typeof target.mapDispatchToProps != 'function') {
		throw new Error(`mapStateToProps Invalid value of type ${typeof target.mapDispatchToProps} for RtRdCon.`);
	}

	class reactDom extends target {
		componentWillUnmount() {
			let that = this;
			let sysRestState = that.props.sysRestState;
			sysRestState();
		}
	}

	let mapStateToProps = (state, ownProps) => {
		return {
			...target.mapStateToProps(state, ownProps)
		};
	};

	let mapDispatchToProps = (dispatch, ownProps) => {
		return {
			...target.mapDispatchToProps(dispatch, ownProps),
			sysRestState: bindActionCreators(
				() => dispatch => {
					dispatch({ type: `${storeName}_sys_restState` });
				},
				dispatch
			)
		};
	};

	return connect(mapStateToProps, mapDispatchToProps)(reactDom);
};

export default RtRdCon;
