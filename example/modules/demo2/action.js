import fetch from 'fetch/fetch';
import ModalTip from 'modalTip';
import { Store, action, actionProps } from 'reduxm';
const demo2Type = Store.getActionType('demo2Store');

let getColumnList = userCode => {
	let params = {};
	params.userCode = userCode;

	return fetch
		.get('/newsCenrer/queryColumnList4Site', params)
		.then(res => {
			return res.dataList;
		})
		.catch(e => {
			ModalTip.warningTip(e.message);
		});
};

let getNewsList = (userCode, columnId) => {
	let params = {};
	params.pageSize = 20;
	params.pageNum = 0;
	params.userCode = userCode;
	params.columnId = columnId;

	return fetch
		.get('/newsCenrer/queryNewsList4Site', params)
		.then(res => {
			return res.dataList;
		})
		.catch(e => {
			ModalTip.warningTip(e.message);
		});
};

@action('demo2Action')
class demo2Action {
	@actionProps('changeDUserCode')
	static changeDUserCode = (value, dUserCode) => async (dispatch, _this) => {
		dUserCode.b.c = value;
		dispatch({ type: demo2Type.change_dUserCode, dUserCode: dUserCode });
	};

	@actionProps('changeColumn')
	static changeColumn = userCode => async (dispatch, _this) => {
		let columnList = await getColumnList(userCode);
		let newsList = await getNewsList(userCode, columnList[0].flowId);

		dispatch({
			type: demo2Type.change_demo2Store,
			demo2Store: {
				newsTitle: newsList[0].newsTitle,
				columnName: columnList[0].columnName
			}
		});

		_this.changeDUserCode('', { a: '', b: { c: '' } })(dispatch, _this);
	};

	@actionProps('changeState')
	static changeState = (type, name, value) => async (dispatch, _this) => {
		let store = { type: type };
		store[name] = value;
		dispatch(store);
	};
}
