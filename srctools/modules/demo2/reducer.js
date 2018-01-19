import { store, storeActionType, storeDestroy } from 'reduxm/index';

@store('demo2Store', 'change_demo2Store', 'warn')
class demo2Store {
	@storeActionType('change_columnName')
	@storeDestroy
	static columnName = '';

	@storeActionType('change_newsTitle')
	@storeDestroy
	static newsTitle = '';

	@storeActionType('change_selectText') static selectText = '选择器1';

	@storeActionType('change_dUserCode')
	@storeDestroy
	static dUserCode = { a: '', b: { c: '' } };
}
