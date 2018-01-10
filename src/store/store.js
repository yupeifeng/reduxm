import ReducerFactory from './reducerfactory';
import ActionTypeFactory from '../actiontype/actiontypefactory';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//redux的DevTools视图
let DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" />
	</DockMonitor>
);

//按名称存储actionType
let storePropsSign = {};
//按名称存储是否需要销毁
let storeDestroySign = {};
//按名称存储是否需要日志的级别
let storeLogsSign = {};

/**
 * 数据注入层
 */
export default class Store {
	/**
	 * store修饰器,处理整个store层存入数据工厂
	 * @param storeName(数据层名称)
	 * @return true
	 */
	static store = (storeName = '') => target => {
		if (!storeName) {
			return;
		}

		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for store.`);
		}

		/**
		 * initialData storeName下,离开页面需要销毁的数据
		 * excludeData storeName下,离开页面需要保留的数据
		 * actionTypes  storeName下,所有actionType
		 * actions      storeName下,所有数据改变函数
		 */
		let initialData = {};
		let excludeData = {};
		let actionTypes = {};
		let actions = {};
		//循环整个store原目标对象,按要求提取以上数据
		for (let key in target) {
			//提取initialData、excludeData
			if (storeDestroySign[key]) {
				initialData[key] = target[key];
			} else {
				excludeData[key] = target[key];
			}

			if (storePropsSign[key]) {
				//提取actionTypes
				actionTypes[storePropsSign[key]] = `${storeName}_${storePropsSign[key]}`;

				//提取actions
				let storeLogsSignKey = storeLogsSign[key];
				let storePropsSignKey = storePropsSign[key];
				actions[`${storeName}_${storePropsSign[key]}`] = (state, action) => {
					//埋入日志输出点,便于使用人员定位数据流向
					if (storeLogsSignKey) {
						switch (storeLogsSignKey) {
							case 'waring':
								console.warn(`---actionType:${storePropsSignKey}---  \n ---storeName:${key}--- \n  ---storeSource:`);
								console.warn(action[key]);
								break;
							case 'log':
								console.warn(`---actionType:${storePropsSignKey}---  \n ---storeName:${key}--- \n  ---storeSource:`);
								console.log(action[key]);
								break;
							case 'error':
								console.warn(`---actionType:${storePropsSignKey}---  \n ---storeName:${key}--- \n  ---storeSource:`);
								console.error(action[key]);
								break;
							default:
								break;
						}
					}

					//改变redux的state并返回(真正改变值的方法)
					let arg = {};
					arg[key] = action[key];
					return Object.assign({}, state, arg);
				};
			}
		}

		//按名称将actionTypes存入ActionTypeFactory
		ActionTypeFactory.initActionType(storeName, actionTypes);
		//按名称将数据、数据改变函数存入ReducerFactory
		ReducerFactory.initReducer(storeName, initialData, excludeData, actions);

		//清空记录标识等待下次数据存入
		storePropsSign = {};
		storeDestroySign = {};
		storeLogsSign = {};
		return true;
	};

	/**
	 * storeProps修饰器,按名称录入actionType
	 * @param actionType(数据改变响应type)
	 * @return target
	 */
	static storeProps = (actionType = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for appStoreProps.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for appStoreProps.`);
		}

		//按名称存储actionType
		storePropsSign[key] = actionType;
		return target;
	};

	/**
	 * storeDestroy修饰器,按名称录入是否需要销毁
	 * @return target
	 */
	static storeDestroy = (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeDestroy.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeDestroy.`);
		}

		//按名称存储是否需要销毁
		storeDestroySign[key] = true;
		return target;
	};

	/**
	 * storeLogs修饰器,按名称录入日志级别
	 * @param level(日志级别)
	 * @returns target
	 */
	static storeLogs = level => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeLogs.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeLogs.`);
		}

		//按名称存储是否需要日志的级别
		storeLogsSign[key] = level;
		return target;
	};

	/**
	 * createStore方法,绑定数据到整个react路由层
	 * @params router(react路由), debug(是否开启调试工具)
	 * @return reactRouter
	 */
	static createStore = (router, debug) => {
		if (!router || typeof router != 'object') {
			throw new Error(`target Invalid value of type ${typeof router} for createStore.`);
		}

		let store = null;

		if (debug) {
			let enhancer = compose(applyMiddleware(thunk), DevTools.instrument());

			store = createStore(ReducerFactory.getReducer(), enhancer);
		} else {
			store = createStore(ReducerFactory.getReducer(), applyMiddleware(thunk));
		}
		return <Provider store={store}>{router}</Provider>;
	};

	/**
	 * getDevTools方法,获取调试工具视图
	 * @return DevTools(调试工具视图)
	 */
	static getDevTools = () => {
		return <DevTools />;
	};

	/**
	 * getActionType方法,获取storeName下所有actionType
	 * @param storeName(数据层名称)
	 * @return {}(storeName下所有actionType)
	 */
	static getActionType = (storeName = '') => {
		return ActionTypeFactory.getActionType(storeName);
	};

	/**
	 * getAllInitData方法,获取storeName下所有初始数据
	 * @param storeName(数据层名称)
	 * @return {}(storeName下所有初始数据)
	 */
	static getAllInitData = (storeName = '') => {
		return ReducerFactory.getAllInitData(storeName);
	};
}
