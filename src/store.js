import ReducerFactory from './reducerfactory';

export const store = target => {
	if (!target || typeof target != 'function') {
		throw new Error(`target Invalid value of type ${typeof target} for appStore.`);
	}

	ReducerFactory.initReducer(target);
};

export const storeProps = (actionType = '', destroy = true) => (target, key) => {
	if (!target || typeof target != 'function') {
		throw new Error(`target Invalid value of type ${typeof target} for appStoreProps.`);
	}

	if (!key || typeof key != 'string') {
		throw new Error(`key Invalid value of type ${typeof key} for appStoreProps.`);
	}

	target[key] = {
		value: target[key],
		actionType: actionType,
		destroy: destroy
	};
	return target;
};

export const getStore = () => {
	return ReducerFactory.getReducer();
};

export const getActionType = pageName => {
	return ReducerFactory.getActionType(pageName);
};
