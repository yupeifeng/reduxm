import { store, storeProps, storeDestroy, storeLogs } from 'reducermanager';
import immutable from 'immutable';

@store('demo1Store')
class demo1 {
	@storeProps('change_welcomeText')
	@storeDestroy
	static welcomeText = 'Welcome to Redux test!';

	@storeProps('change_needCode')
	@storeDestroy
	static needCode = 1;

	@storeProps('change_immutableList')
	@storeLogs('waring')
	@storeDestroy
	static immutableList = immutable.fromJS([1, 2, 3]);
}
