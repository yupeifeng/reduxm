import fetch from 'fetch/fetch';
import ModalTip from 'modalTip';
import { Store, action, actionProps, actionLogs } from 'reducermanager/index';

const demo1Type = Store.getActionType('demo1Store');

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
	@actionLogs('log')
	static changeNeedCode = nickName => async dispatch => {
		let needCode = await checkNeedCode(nickName);
		dispatch({ type: demo1Type.change_needCode, needCode: needCode });
	};
}
