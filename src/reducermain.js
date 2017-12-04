import { combineReducers } from 'redux';
import Immutable from 'immutable';

export default class ReducerMain {
	static reducer = [];

	static actionType = {};

	static saveInitialState = {};

	static extend(target, source) {
		let allObject = {};

		for (let obj in target) {
			allObject[obj] = target[obj];
		}
		for (let obj in source) {
			allObject[obj] = source[obj];
		}
		return allObject;
	}

	static addPageName(actionType, pageName) {
		for (let i in actionType) {
			actionType[i] = `${pageName}_${actionType[i]}`;
		}

		actionType.sys_restState = `${pageName}_sys_restState`;

		return actionType;
	}

	static addSysRestState(pageReducer, pageName) {
		this.saveInitialState[pageName] = Immutable.fromJS(pageReducer.initialState).toJS();

		let initialState = pageReducer.initialState;
		let excludeState = pageReducer.excludeState;
		let actionFun = pageReducer.actionFun;

		let reducerExt = (state = this.extend(initialState, excludeState), action = {}) => {
			switch (action['type']) {
				case `${pageName}_sys_restState`:
					return this.extend(state, Immutable.fromJS(this.saveInitialState[pageName]).toJS());
				default:
					return actionFun(state, action);
			}
		};

		return reducerExt;
	}

	static initReducer(actionType, initialState, excludeState, actionFun, pageName) {
		this.reducer.push({
			pageName: pageName,
			pageReducer: {
				initialState: initialState,
				excludeState: excludeState,
				actionFun: actionFun
			}
		});

		this.actionType[pageName] = this.addPageName(actionType, pageName);

		return this.reducer;
	}

	static getReducer() {
		let combineReducersParams = {};

		this.reducer.forEach(item => {
			if (item) {
				combineReducersParams[item.pageName] = this.addSysRestState(item.pageReducer, item.pageName);
			}
		});

		return combineReducers(combineReducersParams);
	}

	static getActionType(pageName) {
		return this.actionType[pageName];
	}
}
