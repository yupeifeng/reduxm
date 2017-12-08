import { combineReducers } from 'redux';
import Immutable from 'immutable';

export default class ReducerFactory {
	static reducer = {};

	static initialData = {};

	static initReducer(storeName = '', initialState = {}, excludeState = {}, actions = {}) {
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
}
