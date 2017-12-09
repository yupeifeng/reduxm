import ActionFactory from './actionfactory';
import { bindActionCreators } from 'redux';

let actionPropsSign = {};
let actionLogsSign = {};

export default class Action {
	static action = (actionName = '') => target => {
		if (!actionName) {
			return target;
		}

		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for action.`);
		}

		let actions = {};
		for (let key in target) {
			if (actionPropsSign[key]) {
				actions[actionPropsSign[key]] = (...args) => dispatch => {
					if (actionLogsSign[key]) {
						switch (actionLogsSign[key]) {
							case 'waring':
								console.warn(`actionFunName:${actionPropsSign[key]} actionParams:${JSON.stringify(...args)}`);
								break;
							case 'log':
								console.log(`actionFunName:${actionPropsSign[key]} actionParams:${JSON.stringify(...args)}`);
								break;
							case 'error':
								console.error(`actionFunName:${actionPropsSign[key]} actionParams:${JSON.stringify(...args)}`);
								break;
							default:
								break;
						}
					}
					target[key](...args)(dispatch);
				};
			}
		}

		ActionFactory.initAction(actionName, actions);

		return target;
	};

	static actionProps = (actionFunName = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionProps.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for actionProps.`);
		}

		actionPropsSign[key] = actionFunName;

		return target;
	};

	static actionLogs = level => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionLogs.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for actionLogs.`);
		}

		actionLogsSign[key] = level;

		return target;
	};

	static actionInjection = (actionName = '') => target => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionInjection.`);
		}

		if (!actionName) {
			return target;
		}

		let actions = ActionFactory.getAction(actionName);

		target.mapDispatchToProps = dispatch => {
			let mapDispatchToPropsParams = {};

			for (let key in actions) {
				if (actions[key]) {
					mapDispatchToPropsParams[key] = bindActionCreators(actions[key], dispatch);
				}
			}
			return mapDispatchToPropsParams;
		};

		return target;
	};
}
