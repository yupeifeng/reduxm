/**
 *数据改变事件响应type工厂
 */
export default class ActionTypeFactory {
	//按storeName(数据层名称)存储所有actionType
	static actionType = {};

	/**
	 * initActionType方法,按storeName(数据层名称)存储所有actionType
	 * @param storeName(数据层名称)，actionTypes(actionTypes集合对象)
	 */
	static initActionType(storeName = '', actionTypes = {}) {
		this.actionType[storeName] = actionTypes;
	}

	/**
	 * getActionType方法,按storeName(数据层名称)获取所有actionType
	 * @param storeName(数据层名称)
	 * @return actionType
	 */
	static getActionType(storeName = '') {
		return this.actionType[storeName];
	}
}
