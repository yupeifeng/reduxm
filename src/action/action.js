import ActionFactory from './actionfactory';
import { bindActionCreators } from 'redux';

export default class Action {
	static action = (actionName = '') => target => {
		if (!actionName) {
			return;
		}

		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for action.`);
		}

		let actions = {};
		for (let i in target) {
			if (target[i]['reducerManager_actionFunName']) {
				actions[target[i]['reducerManager_actionFunName']] = (...args) => dispatch => {
					switch (target[i]['reducerManager_actionLogs']) {
						case 'waring':
							console.warn(
								`actionFunName:${target[i]['reducerManager_actionFunName']} actionParams:${JSON.stringify(...args)}`
							);
							break;
						case 'log':
							console.log(
								`actionFunName:${target[i]['reducerManager_actionFunName']} actionParams:${JSON.stringify(...args)}`
							);
							break;
						case 'error':
							console.error(
								`actionFunName:${target[i]['reducerManager_actionFunName']} actionParams:${JSON.stringify(...args)}`
							);
							break;
						default:
							break;
					}
					target[i]['reducerManager_actionProps'](...args)(dispatch);
				};
			}
		}

		ActionFactory.initAction(actionName, actions);
	};

	static actionProps = (actionFunName = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionProps.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for actionProps.`);
		}

		if (target[key]['reducerManager_actionProps'] === undefined) {
			target[key] = {
				reducerManager_actionProps: target[key],
				reducerManager_actionFunName: actionFunName
			};
		} else {
			target[key]['reducerManager_actionFunName'] = actionFunName;
		}
		return target;
	};

	static actionLogs = level => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionLogs.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for actionLogs.`);
		}

		if (target[key]['reducerManager_actionProps'] === undefined) {
			target[key] = {
				reducerManager_actionProps: target[key],
				reducerManager_actionLogs: level
			};
		} else {
			target[key]['reducerManager_actionLogs'] = level;
		}
		return target;
	};

	static actionInjection = (actionName = '') => (target, key) => {
		let actions = ActionFactory.getAction(actionName);

		target.mapDispatchToProps = (dispatch, ownProps) => {
			let mapDispatchToPropsParams = {};

			for (let i in actions) {
				if (actions[i]) {
					mapDispatchToPropsParams[i] = bindActionCreators(actions[i], dispatch);
				}
			}
			return mapDispatchToPropsParams;
		};
	};
}
