import ActionFactory from './actionfactory';
import { bindActionCreators } from 'redux';

export default class Action {
	static action = (actionName = '') => target => {
		if (!actionName) {
			return;
		}

		let actions = {};
		for (let i in target) {
			if (target[i]['reducerManager_actionFunName']) {
				actions[target[i]['reducerManager_actionFunName']] = target[i]['reducerManager_actionProps'];
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

		if (target[key]['reducerManager_actionProps']) {
			target[key]['reducerManager_actionFunName'] = actionFunName;
		} else {
			target[key] = {
				reducerManager_actionProps: target[key],
				reducerManager_actionFunName: actionFunName
			};
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
