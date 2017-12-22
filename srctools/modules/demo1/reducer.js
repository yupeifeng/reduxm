import { store, storeProps, storeDestroy, storeLogs } from 'reducermanager/index';

@store('demo1Store')
class demo1 {
	@storeProps('change_welcomeText')
	@storeDestroy
	static welcomeText = 'Welcome to Redux test!';

	@storeProps('change_needCode')
	@storeDestroy
	@storeLogs('log')
	static needCode = 1;
}
