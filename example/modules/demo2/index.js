import React from 'react';
import { Layout, Breadcrumb, Select } from 'antd';
import { Store, connectStore, actionInjection } from 'reduxm';
import Demo2Input from './components/input';
import Demo2Label from './components/label';

const demo2Type = Store.getActionType('demo2Store');

const { Option } = Select;
const { Content } = Layout;

/**
 * demo2
 */
@connectStore(['demo2Store'], ['demo2Store'])
@actionInjection('demo2Action')
export default class demo2 extends React.Component {
	render() {
		let that = this;

		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
					<Breadcrumb.Item>demo</Breadcrumb.Item>
					<Breadcrumb.Item>demo2</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
					<div>
						<div>
							<Demo2Input />
							<Demo2Label />
						</div>
						<div>栏目名称：{that.props.demo2Store.columnName}</div>
						<div>新闻标题：{that.props.demo2Store.newsTitle}</div>
						<div>
							<Select
								value={that.props.demo2Store.selectText}
								style={{ width: 120 }}
								onChange={value => that._handleChangeSelect(value)}>
								<Option value="选择器1">选择器1</Option>
								<Option value="选择器2">选择器2</Option>
								<Option value="选择器3">选择器3</Option>
								<Option value="选择器4">选择器4</Option>
							</Select>
							<span>选择为：{that.props.demo2Store.selectText}</span>
						</div>
					</div>
				</Content>
			</Layout>
		);
	}

	_handleChangeSelect(value) {
		let that = this;

		that.props.changeState(demo2Type.change_selectText, 'selectText', value);
	}

	componentWillUnmount() {
		this._cons();
	}

	_cons() {
		console.log('生命周期销毁');
	}
}
