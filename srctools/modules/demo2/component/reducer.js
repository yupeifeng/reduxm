import { localStore, storeActionType } from 'reduxm/index';

@localStore('demo2Input', 'change_demo2Input')
class demo2Input {
	@storeActionType('change_dUserCode') static dUserCode = '';
}
