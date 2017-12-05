import { combineReducers } from 'redux';
import Immutable from 'immutable';

export default class ReducerMain {
	static reducer = {};

	static actionType = {};

	static initialData = {};

	static initReducer(
		actionType = {},
		initialState = {},
		excludeState = {},
		actionFun = (state, action) => {},
		pageName = ''
	) {
		this.initialData[pageName] = Immutable.fromJS(initialState).toJS();

		let reducer = (state = Object.assign(initialState, excludeState), action = {}) => {
			switch (action['type']) {
				case `${pageName}_sys_restState`:
					return Object.assign(state, Immutable.fromJS(this.initialData[pageName]).toJS());
				default:
					return actionFun(state, action);
			}
		};

		this.reducer[pageName] = reducer;

		for (let i in actionType) {
			actionType[i] = `${pageName}_${actionType[i]}`;
		}

		actionType.sys_restState = `${pageName}_sys_restState`;

		this.actionType[pageName] = actionType;

		return true;
	}

	static getReducer() {
		return combineReducers(this.reducer);
	}

	static getActionType(pageName) {
		return this.actionType[pageName];
	}
}
