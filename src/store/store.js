import ReducerFactory from './reducerfactory';
import ActionTypeFactory from '../actiontype/actiontypefactory';

export default class Store {
	static store = (storeName = '') => target => {
		if (!storeName) {
			return;
		}

		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for store.`);
		}

		let initialState = {};
		let excludeState = {};
		let actionTypes = {};
		let actions = {};

		for (let i in target) {
			if (target[i]['reducerManager_storeDestroy']) {
				if (target[i]['reducerManager_storeValue'] === undefined) {
					initialState[i] = target[i];
				} else {
					initialState[i] = target[i]['reducerManager_storeValue'];
				}
			} else {
				if (target[i]['reducerManager_storeValue'] === undefined) {
					excludeState[i] = target[i];
				} else {
					excludeState[i] = target[i]['reducerManager_storeValue'];
				}
			}

			if (target[i]['reducerManager_actionType']) {
				actionTypes[target[i]['reducerManager_actionType']] = `${storeName}_${target[i]['reducerManager_actionType']}`;

				actions[`${storeName}_${target[i]['reducerManager_actionType']}`] = (state, action) => {
					if (target[i]['reducerManager_storeLogs']) {
						switch (target[i]['reducerManager_storeLogs']) {
							case 'waring':
								console.warn(
									`actionType:${target[i]['reducerManager_actionType']}  storeName:${i}  storeSource:${JSON.stringify(
										action[i]
									)}`
								);
								break;
							case 'log':
								console.log(
									`actionType:${target[i]['reducerManager_actionType']}  storeName:${i}  storeSource:${JSON.stringify(
										action[i]
									)}`
								);
								break;
							case 'error':
								console.error(
									`actionType:${target[i]['reducerManager_actionType']}  storeName:${i}  storeSource:${JSON.stringify(
										action[i]
									)}`
								);
								break;
							default:
								break;
						}
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

		if (target[key]['reducerManager_storeValue'] === undefined) {
			target[key] = {
				reducerManager_storeValue: target[key],
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

		if (target[key]['reducerManager_storeValue'] === undefined) {
			target[key] = {
				reducerManager_storeValue: target[key],
				reducerManager_storeDestroy: true
			};
		} else {
			target[key]['reducerManager_storeDestroy'] = true;
		}
		return target;
	};

	static storeLogs = level => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeLogs.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeLogs.`);
		}

		if (target[key]['reducerManager_storeValue'] === undefined) {
			target[key] = {
				reducerManager_storeValue: target[key],
				reducerManager_storeLogs: level
			};
		} else {
			target[key]['reducerManager_storeLogs'] = level;
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
