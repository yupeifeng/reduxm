import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { asyncComponent } from 'AsyncComponent';
import HeaderMenu from './components/heard';
import SiderMenu from './components/sider';
import 'date-util';
import './css/main.css';

(r => {
	r.keys().forEach(r);
})(require.context('./', true, /reducer\.js/));
(r => {
	r.keys().forEach(r);
})(require.context('./', true, /action\.js/));

import { Store } from 'reduxm';

const demo1 = asyncComponent(() => import(/* webpackChunkName: 'demo1' */ './demo1'));
const demo2 = asyncComponent(() => import(/* webpackChunkName: 'demo2' */ './demo2'));

let debug = true;
const router = Store.createStore(
	<HashRouter>
		<div>
			<HeaderMenu />
			<div className="ant-layout ant-layout-has-sider layout">
				<SiderMenu />
				<Route exact path="/" component={demo1} />
				<Route exact path="/demo/demo1" component={demo1} />
				<Route exact path="/demo/demo2" component={demo2} />
				{debug ? Store.getDevTools() : null}
			</div>
		</div>
	</HashRouter>,
	debug
);

ReactDOM.render(router, document.getElementById('content'));
