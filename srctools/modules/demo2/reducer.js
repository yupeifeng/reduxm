import { store, storeActionType, storeUnDestroy } from 'reduxm/index';

@store('demo2Store', 'change_demo2Store')
class demo2Store {
	@storeActionType('change_columnName') static columnName = '';

	@storeActionType('change_newsTitle') static newsTitle = '';

	@storeActionType('change_selectText')
	@storeUnDestroy
	static selectText = '选择器1';

	@storeActionType('change_dUserCode') static dUserCode = '';
}
