import { combineReducers } from 'redux';
import deepCopy from 'deepcopy';

/**
 *组件级数据工厂
 */
export default class StoreFactory {
	//按storeName名称存储store纯函数给redux的combineReducers方法使用
	static store = {};
	//按storeName名称存储需要销毁的数据字段
	static initialData = {};
	//按storeName名称存储需要不需要销毁的数据字段
	static excludeData = {};

	/**
	 * initStore方法,按名称将数据、数据改变函数存入StoreFactory
	 * @params storeName(数据层名称), initialData(离开页面需要销毁的数据), excludeData(离开页面不需要销毁的数据), actions(数据改变函数)
	 */
	static initStore(storeName = '', initialData = {}, excludeData = {}, actions = {}) {
		//存储initialData、excludeData,注意使用deepCopy确保数据安全
		this.initialData[storeName] = deepCopy(initialData);
		this.excludeData[storeName] = deepCopy(excludeData);

		//生成reducer纯函数
		let store = (state = Object.assign({}, initialData, excludeData), action = {}) => {
			switch (action['type']) {
				//离开也能数据销毁响应
				case `${storeName}_sys_restState`:
					//注意使用deepCopy确保数据安全
					return Object.assign({}, state, deepCopy(this.initialData[storeName]));
				//改变数据响应actions
				default:
					if (actions[action['type']]) {
						return actions[action['type']](state, action);
					} else {
						return { ...state };
					}
			}
		};

		//存储reducer
		this.store[storeName] = store;
	}

	/**
	 * getStore方法,按名称获取组件级数据
	 * @params storeName(数据层名称)
	 * @return Reducer
	 */
	static getStore(storeName) {
		let reducer = {};
		reducer[storeName] = this.store[storeName];

		return combineReducers(reducer);
	}

	/**
	 * getAllInitData方法,获取storeName下所有初始数据
	 * @param storeName(数据层名称)
	 * @return {}
	 */
	static getAllInitData(storeName = '') {
		//获取initialData、excludeData,注意使用deepCopy确保数据安全
		let initialData = deepCopy(this.initialData[storeName]);
		let excludeData = deepCopy(this.excludeData[storeName]);
		return Object.assign({}, initialData, excludeData);
	}
}
