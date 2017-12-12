import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { asyncComponent } from 'AsyncComponent';
import HeaderMenu from './components/heard';
import SiderMenu from './components/sider';
import './css/main.css';

import { Store } from 'reducermanager/index';
import './demo1/reducer';
import './demo2/reducer';
const store = createStore(Store.getStore(), applyMiddleware(thunk));

const demo1 = asyncComponent(() => import(/* webpackChunkName: 'demo1' */ './demo1'));
const demo2 = asyncComponent(() => import(/* webpackChunkName: 'demo2' */ './demo2'));

const router = (
	<Provider store={store}>
		<HashRouter>
			<div>
				<HeaderMenu />
				<div className="ant-layout ant-layout-has-sider layout">
					<SiderMenu />
					<Route exact path="/" component={demo1} />
					<Route exact path="/demo/demo1" component={demo1} />
					<Route exact path="/demo/demo2" component={demo2} />
				</div>
			</div>
		</HashRouter>
	</Provider>
);

ReactDOM.render(router, document.getElementById('content'));
