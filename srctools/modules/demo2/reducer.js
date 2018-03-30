import { store, storeActionType } from 'reduxm/index';

@store('demo2Store', 'change_demo2Store')
class demo2Store {
	@storeActionType('change_columnName') static columnName = '';

	@storeActionType('change_newsTitle') static newsTitle = '';

	@storeActionType('change_selectText') static selectText = '选择器1';
}
