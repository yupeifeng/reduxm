export default class ActionTypeFactory {
	static actionType = {};

	static initActionType(storeName = '', actionTypes = {}) {
		this.actionType[storeName] = actionTypes;
	}

	static getActionType(storeName = '') {
		return this.actionType[storeName];
	}
}
