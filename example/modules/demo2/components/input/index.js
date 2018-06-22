import React from 'react';
import { Input } from 'antd';
import { connectStore, actionInjection } from 'reduxm';

/**
 * demo2Input
 */
@connectStore(['demo2Store'], [''])
@actionInjection('demo2Action')
export default class demo2Input extends React.Component {
	render() {
		let that = this;
		console.log('demo2Input');
		return (
			<Input
				size="large"
				placeholder="请输入D编号D00222然后回车"
				value={that.props.demo2Store.dUserCode}
				onChange={e => that._handleChangeDUserCode(e, 'dUserCode')}
				onPressEnter={() => that._onPressEnter()}
			/>
		);
	}

	_handleChangeDUserCode(e, dUserCode) {
		console.log(`${dUserCode}: ${e.target.value}`);
		let that = this;

		that.props.changeDUserCode(e.target.value);
	}

	_onPressEnter() {
		let that = this;

		that.props.changeColumn(that.props.demo2Store.dUserCode);
	}
}
