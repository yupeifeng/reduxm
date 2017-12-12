import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

/**
 * Header
 */
export default class HeaderMenu extends React.Component {
	render() {
		return (
			<Header className="header">
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
					<Menu.Item key="1">demo的主站</Menu.Item>
				</Menu>
			</Header>
		);
	}
}
