import { combineReducers } from 'redux';
import Immutable from 'immutable';

/**
 *数据工厂
 */
export default class ReducerFactory {
	//按storeName名称存储reducer纯函数给redux的combineReducers方法使用
	static reducer = {};
	//按storeName名称存储需要销毁的数据字段
	static initialData = {};
	//按storeName名称存储需要不需要销毁的数据字段
	static excludeData = {};
	//使用Immutable深度拷贝数据,初始数据已经是Immutable无需拷贝直接赋值
	static deepImmutableJS(data) {
		let result = {};
		for (let key in data) {
			if (Immutable.isImmutable(data[key])) {
				result[key] = data[key];
			} else {
				let item = Immutable.fromJS(data[key]);
				if (Immutable.isImmutable(item)) {
					result[key] = Immutable.fromJS(data[key]).toJS();
				} else {
					result[key] = Immutable.fromJS(data[key]);
				}
			}
		}
		return result;
	}

	/**
	 * initReducer方法,按名称将数据、数据改变函数存入ReducerFactory
	 * @params storeName(数据层名称), initialData(离开页面需要销毁的数据), excludeData(离开页面不需要销毁的数据), actions(数据改变函数)
	 */
	static initReducer(storeName = '', initialData = {}, excludeData = {}, actions = {}) {
		//存储initialData、excludeData,注意使用deepImmutableJS确保数据安全
		this.initialData[storeName] = this.deepImmutableJS(initialData);
		this.excludeData[storeName] = this.deepImmutableJS(excludeData);

		//生成reducer纯函数
		let reducer = (state = Object.assign({}, initialData, excludeData), action = {}) => {
			switch (action['type']) {
				//离开也能数据销毁响应
				case `${storeName}_sys_restState`:
					//注意使用deepImmutableJS确保数据安全
					return Object.assign({}, state, this.deepImmutableJS(this.initialData[storeName]));
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
		this.reducer[storeName] = reducer;
	}

	/**
	 * getReducer方法,获取整个Reducer数据树
	 * @return Reducer
	 */
	static getReducer() {
		return combineReducers(this.reducer);
	}

	/**
	 * getAllInitData方法,获取storeName下所有初始数据
	 * @param storeName(数据层名称)
	 * @return {}
	 */
	static getAllInitData(storeName = '') {
		//获取initialData、excludeData,注意使用Immutable.fromJS确保数据安全
		let initialData = this.deepImmutableJS(this.initialData[storeName]);
		let excludeData = this.deepImmutableJS(this.excludeData[storeName]);
		return Object.assign({}, initialData, excludeData);
	}
}
