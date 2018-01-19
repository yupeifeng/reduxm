import { store, storeActionType, storeDestroy } from 'reduxm';
import immutable from 'immutable';

@store('demo1Store', 'change_demo1Store')
class demo1 {
	@storeActionType('change_welcomeText')
	@storeDestroy
	static welcomeText = 'Welcome to Redux test!';

	@storeActionType('change_needCode')
	@storeDestroy
	static needCode = 1;

	@storeActionType('change_immutableList', 'waring')
	@storeDestroy
	static immutableList = immutable.fromJS([1, 2, 3]);

	@storeActionType('change_immutableInList')
	@storeDestroy
	static immutableInList = {
		immutableList: [immutable.fromJS([7, 8, 9])]
	};
}
