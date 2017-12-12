import { Modal, Button } from 'antd';

export default class ModalTip {
	/**
	 * success
	 * @param title
	 * @param content
	 */
	static successTip = function(content, title = '提示') {
		const modal = Modal.success({
			title: title,
			content: content
		});
		setTimeout(() => modal.destroy(), 3000);
	};

	/**
	 * 信息窗口
	 * @param title
	 * @param content
	 */
	static infoTip = function(content, title = '提示') {
		const modal = Modal.info({
			title: title,
			content: content
		});
		setTimeout(() => modal.destroy(), 3000);
	};

	/**
	 * 错误提示
	 * @param title
	 * @param content
	 */
	static errorTip = function(content, title = '提示') {
		const modal = Modal.error({
			title: title,
			content: content
		});
		setTimeout(() => modal.destroy(), 3000);
	};

	/**
	 * 警告窗口
	 * @param title
	 * @param content
	 */
	static warningTip = function(content, title = '提示') {
		const modal = Modal.warning({
			title: title,
			content: content
		});
		setTimeout(() => modal.destroy(), 3000);
	};
}
