export default class ActionFactory {
	static action = {};

	static initAction(actionName = '', actions = {}) {
		this.action[actionName] = actions;
	}

	static getAction(actionName = '') {
		return this.action[actionName];
	}
}
