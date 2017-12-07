import { combineReducers } from 'redux';
import Immutable from 'immutable';

export default class ReducerFactory {
	static reducer = {};

	static actionType = {};

	static initialData = {};

	static initReducer(target = {}) {
		if (!target.name || typeof target.name != 'string') {
			throw new Error(`target.name Invalid value of type ${typeof target.name} for initReducer.`);
		}

		let storeName = target.name;
		let initialState = {};
		let excludeState = {};
		let actionTypes = {};
		let actions = {};

		for (let i in target) {
			if (target[i].destroy) {
				initialState[i] = target[i].value;
			} else {
				excludeState[i] = target[i].value;
			}

			if (target[i].actionType) {
				actionTypes[target[i].actionType] = `${storeName}_${target[i].actionType}`;

				actions[`${storeName}_${target[i].actionType}`] = (state, action) => {
					let arg = {};
					arg[i] = action[i];
					return Object.assign({}, state, arg);
				};
			}
		}

		actionTypes.sys_restState = `${storeName}_sys_restState`;

		this.actionType[storeName] = actionTypes;

		this.initialData[storeName] = Immutable.fromJS(initialState).toJS();

		let reducer = (state = Object.assign({}, initialState, excludeState), action = {}) => {
			switch (action['type']) {
				case `${storeName}_sys_restState`:
					return Object.assign({}, state, Immutable.fromJS(this.initialData[storeName]).toJS());
				default:
					if (actions[action['type']]) {
						return actions[action['type']](state, action);
					} else {
						return { ...state };
					}
			}
		};

		this.reducer[storeName] = reducer;
	}

	static getReducer() {
		return combineReducers(this.reducer);
	}

	static getActionType(pageName) {
		return this.actionType[pageName];
	}
}
