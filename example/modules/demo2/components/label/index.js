import React from 'react';
import { connectStore, actionInjection } from 'reduxm';

/**
 * demo2Input
 */
@connectStore(['demo2Label'], ['demo2Label'])
@actionInjection('demo2Action')
export default class demo2Label extends React.Component {
	render() {
		console.log('demo2Label');
		return <div>{this.props.demo2Label.label}</div>;
	}
}
