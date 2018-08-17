/**
 *事件工厂
 */
export default class ActionFactory {
	//按actionName(事件层名称)存储所有action
	static action = {};

	//存储全局性action,可供各个页面调用
	static globalAction = {};

	/**
	 * initAction方法,按actionName(事件层名称)存储所有actions
	 * @params actionName(事件层名称),actions(action集合对象)
	 */
	static initAction(actionName = '', actions = {}) {
		this.action[actionName] = actions;
	}

	/**
	 * initGlobalAction方法,按actionName(事件层名称)存储全局性action,可供各个页面调用
	 * @params actionName(事件层名称),globalAction(全局性action集合对象)
	 */
	static initGlobalAction(actionName = '', globalAction = {}) {
		this.globalAction[actionName] = globalAction;
	}

	/**
	 * getAction方法,按actionName(事件层名称)获取所有actions
	 * @param actionName(事件层名称)
	 * @return actions
	 */
	static getAction(actionName = '') {
		return this.action[actionName];
	}

	/**
	 * getGlobalAction方法,获取全局性action
	 * @return actions
	 */
	static getGlobalAction() {
		return this.globalAction;
	}
}
