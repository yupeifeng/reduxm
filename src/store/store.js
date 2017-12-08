import ReducerFactory from './reducerfactory';
import ActionTypeFactory from '../actiontype/actiontypefactory';

export default class Store {
	static store = (storeName = '') => target => {
		if (!storeName) {
			return;
		}

		let initialState = {};
		let excludeState = {};
		let actionTypes = {};
		let actions = {};

		for (let i in target) {
			if (target[i]['reducerManager_destroy']) {
				if (target[i]['reducerManager_value'] === undefined) {
					initialState[i] = target[i];
				} else {
					initialState[i] = target[i]['reducerManager_value'];
				}
			} else {
				if (target[i]['reducerManager_value'] === undefined) {
					excludeState[i] = target[i];
				} else {
					excludeState[i] = target[i]['reducerManager_value'];
				}
			}

			if (target[i]['reducerManager_actionType']) {
				actionTypes[target[i]['reducerManager_actionType']] = `${storeName}_${target[i]['reducerManager_actionType']}`;

				actions[`${storeName}_${target[i]['reducerManager_actionType']}`] = (state, action) => {
					if (target[i]['reducerManager_log']) {
						console.log(
							`actionType:${target[i]['reducerManager_actionType']}  storeName:${i}  storeSource:${JSON.stringify(
								action[i]
							)}`
						);
					}
					let arg = {};
					arg[i] = action[i];
					return Object.assign({}, state, arg);
				};
			}
		}

		actionTypes.sys_restState = `${storeName}_sys_restState`;

		ActionTypeFactory.initActionType(storeName, actionTypes);

		ReducerFactory.initReducer(storeName, initialState, excludeState, actions);
	};

	static storeProps = (actionType = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for appStoreProps.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for appStoreProps.`);
		}

		if (target[key]['reducerManager_value'] === undefined) {
			target[key] = {
				reducerManager_value: target[key],
				reducerManager_actionType: actionType
			};
		} else {
			target[key]['reducerManager_actionType'] = actionType;
		}
		return target;
	};

	static storeDestroy = (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeDestroy.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeDestroy.`);
		}

		if (target[key]['reducerManager_value'] === undefined) {
			target[key] = {
				reducerManager_value: target[key],
				reducerManager_destroy: true
			};
		} else {
			target[key]['reducerManager_destroy'] = true;
		}
		return target;
	};

	static storeLogs = (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeLogs.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeLogs.`);
		}

		if (target[key]['reducerManager_value'] === undefined) {
			target[key] = {
				reducerManager_value: target[key],
				reducerManager_log: true
			};
		} else {
			target[key]['reducerManager_log'] = true;
		}
		return target;
	};

	static getStore = () => {
		return ReducerFactory.getReducer();
	};

	static getActionType = (storeName = '') => {
		return ActionTypeFactory.getActionType(storeName);
	};
}
