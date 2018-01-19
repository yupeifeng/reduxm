import fetch from 'fetch/fetch';
import ModalTip from 'modalTip';
import { Store, action, actionProps } from 'reduxm/index';
import immutable from 'immutable';

const demo1Type = Store.getActionType('demo1Store');
const demo1AllInitStore = Store.getAllInitData('demo1Store');

let checkNeedCode = nickName => {
	let params = {};
	params.nickName = nickName;
	params.t = new Date().getTime();

	return fetch
		.post('/oauth/checkLogin', params)
		.then(res => {
			return res.needCode;
		})
		.catch(e => {
			ModalTip.warningTip(e.message);
		});
};

@action('demo1Action')
class demo1Action {
	@actionProps('changeNeedCode')
	static changeNeedCode = nickName => async (dispatch, _this) => {
		let needCode = await checkNeedCode(nickName);
		dispatch({ type: demo1Type.change_needCode, needCode: needCode });
	};

	@actionProps('changeImmutableList', 'error')
	static changeImmutableList = demo1Store => async (dispatch, _this) => {
		let immutableList = demo1Store.immutableList;
		let immutableInList = demo1Store.immutableInList;

		immutableList = immutable.set(immutableList, 0, 4);
		immutableInList.immutableList[0] = immutable.set(immutableInList.immutableList[0], 0, 10);

		dispatch({
			type: demo1Type.change_demo1Store,
			demo1Store: {
				immutableList: immutableList,
				immutableInList: immutableInList
			}
		});

		demo1AllInitStore.welcomeText = 'www---www';
		console.log(demo1AllInitStore);
	};
}
