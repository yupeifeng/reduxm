/**
 *事件工厂
 */
export default class ActionFactory {
	//按actionName(事件层名称)存储所有action
	static action = {};

	/**
	 * initAction方法,按actionName(事件层名称)存储所有actions
	 * @params actionName(事件层名称)，actions(actions集合对象)
	 */
	static initAction(actionName = '', actions = {}) {
		this.action[actionName] = actions;
	}

	/**
	 * getAction方法,按actionName(事件层名称)获取所有actions
	 * @param actionName(事件层名称)
	 * @return actions
	 */
	static getAction(actionName = '') {
		return this.action[actionName];
	}
}
