import React from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import { connectStore, actionInjection } from 'reduxm/index';
import ModalTip from 'modalTip';

const { Content } = Layout;

/**
 * demo1
 */

@connectStore(['demo1Store'], ['demo1Store'])
@actionInjection('demo1Action')
export default class demo1 extends React.Component {
	componentDidMount() {
		this.props.changeNeedCode('zhanghao');
		this.props.changeImmutableList(this.props.demo1Store);
	}

	render() {
		let that = this;

		console.log(that.props.demo1Store.immutableList);
		console.log(that.props.demo1Store.immutableList.toJS());

		console.log(that.props.demo1Store.immutableInList.immutableList[0]);
		console.log(that.props.demo1Store.immutableInList.immutableList[0].toJS());

		console.log(that.props.demo1Store.needCodeComputed);
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
					<Breadcrumb.Item>demo</Breadcrumb.Item>
					<Breadcrumb.Item>demo1</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
					<div>
						<div>{new Date().format('yyyy-MM-dd hh:mm:ss')}</div>
						<div>{that.props.demo1Store.welcomeText}</div>
						<div>是否需要验证码{that.props.demo1Store.needCode}</div>
						<div>
							<Button onClick={() => that._showModalTip('info')}>Info</Button>
							<Button onClick={() => that._showModalTip('success')}>Success</Button>
							<Button onClick={() => that._showModalTip('error')}>Error</Button>
							<Button onClick={() => that._showModalTip('warning')}>Warning</Button>
						</div>
					</div>
				</Content>
			</Layout>
		);
	}

	_showModalTip(type) {
		switch (type) {
			case 'info':
				ModalTip.infoTip('info');
				break;
			case 'success':
				ModalTip.successTip('success');
				break;
			case 'error':
				ModalTip.errorTip('error');
				break;
			case 'warning':
				ModalTip.warningTip('warning');
				break;
		}
	}
}
