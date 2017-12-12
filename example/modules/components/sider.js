import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

/**
 * Sider
 */
export default class SiderMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: ['/demo'],
			selectedKeys: '/demo/demo1'
		};
	}

	componentDidMount() {
		let that = this;
		let path = window.location.hash
			.split('#')
			.join('')
			.split('/')
			.filter(function(n) {
				return n;
			});

		if (path && path.length > 0) {
			if (path[0]) {
				that.setState({
					openKeys: ['/' + path[0]]
				});
			}
			that.setState({
				selectedKeys: '/' + path.join('/')
			});
		}
	}

	render() {
		let that = this;

		return (
			<Sider width={200} style={{ background: '#fff' }}>
				<Menu
					mode="inline"
					openKeys={that.state.openKeys}
					selectedKeys={[that.state.selectedKeys]}
					style={{ height: '100%' }}
					onOpenChange={openKeys => that._onOpenChange(openKeys)}
					onClick={e => that._handleClick(e)}>
					<SubMenu
						key="/demo"
						title={
							<span>
								<Icon type="api" />demo
							</span>
						}>
						<Menu.Item key="/demo/demo1">
							<a href="#/demo/demo1">demo1</a>
						</Menu.Item>
						<Menu.Item key="/demo/demo2">
							<a href="#/demo/demo2">demo2</a>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
		);
	}

	_onOpenChange(openKeys) {
		this.setState({
			openKeys: openKeys
		});
	}

	_handleClick(e) {
		this.setState({
			selectedKeys: e.key
		});
	}
}
