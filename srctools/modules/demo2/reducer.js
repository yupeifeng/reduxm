import { store, storeProps, storeDestroy } from 'reducermanager/index';

@store('demo2Store')
class demo2Store {
	@storeProps('change_columnName')
	@storeDestroy
	static columnName = '';

	@storeProps('change_newsTitle')
	@storeDestroy
	static newsTitle = '';

	@storeProps('change_selectText') static selectText = '选择器1';

	@storeProps('change_dUserCode')
	@storeDestroy
	static dUserCode = '';
}
