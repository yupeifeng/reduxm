import ReducerFactory from './reducerfactory';
import ActionTypeFactory from '../actiontype/actiontypefactory';

let storePropsSign = {};

let storeDestroySign = {};

let storeLogsSign = {};

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

		for (let key in target) {
			if (storeDestroySign[key]) {
				initialState[key] = target[key];
			} else {
				excludeState[key] = target[key];
			}

			if (storePropsSign[key]) {
				actionTypes[storePropsSign[key]] = `${storeName}_${storePropsSign[key]}`;

				actions[`${storeName}_${storePropsSign[key]}`] = (state, action) => {
					if (storeLogsSign[key]) {
						switch (storeLogsSign[key]) {
							case 'waring':
								console.warn(
									`actionType:${storePropsSign[key]}  storeName:${key}  storeSource:${JSON.stringify(action[key])}`
								);
								break;
							case 'log':
								console.log(
									`actionType:${storePropsSign[key]}  storeName:${key}  storeSource:${JSON.stringify(action[key])}`
								);
								break;
							case 'error':
								console.error(
									`actionType:${storePropsSign[key]}  storeName:${key}  storeSource:${JSON.stringify(action[key])}`
								);
								break;
							default:
								break;
						}
					}

					let arg = {};
					arg[key] = action[key];

					return Object.assign({}, state, arg);
				};
			}
		}

		actionTypes.sys_restState = `${storeName}_sys_restState`;

		ActionTypeFactory.initActionType(storeName, actionTypes);

		ReducerFactory.initReducer(storeName, initialState, excludeState, actions);

		storePropsSign = {};

		storeDestroySign = {};

		storeLogsSign = {};

		return true;
	};

	static storeProps = (actionType = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for appStoreProps.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for appStoreProps.`);
		}

		storePropsSign[key] = actionType;

		return target;
	};

	static storeDestroy = (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeDestroy.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeDestroy.`);
		}

		storeDestroySign[key] = true;

		return target;
	};

	static storeLogs = level => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for storeLogs.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for storeLogs.`);
		}

		storeLogsSign[key] = level;

		return target;
	};

	static getStore = () => {
		return ReducerFactory.getReducer();
	};

	static getActionType = (storeName = '') => {
		return ActionTypeFactory.getActionType(storeName);
	};
}
