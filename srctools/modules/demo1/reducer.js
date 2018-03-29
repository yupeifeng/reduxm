import { store, storeActionType, storeComputed } from 'reduxm/index';

@store('demo1Store', 'change_demo1Store')
class demo1 {
	@storeActionType('change_welcomeText') static welcomeText = 'Welcome to Redux test!';

	@storeActionType('change_needCode') static needCode = 1;

	@storeComputed('needCode')
	static needCodeComputed = function() {
		return this.needCode + 1;
	};
}
