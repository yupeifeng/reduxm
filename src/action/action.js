import ActionFactory from './actionfactory';
import { bindActionCreators } from 'redux';

//按名称存储action
let actionPropsSign = {};
//按名称存储action日志级别
let actionLogsSign = {};

//按名称存储action(全局)
let actionGlobalSign = {};
//按名称存储action日志级别(全局)
let actionGlobalLogsSign = {};

/**
 * 事件注入层
 */
export default class Action {
	/**
	 * action修饰器,处理整个action层存入事件工厂
	 * @param actionName(事件层名称)
	 * @return target
	 */
	static action = (actionName = '') => target => {
		if (!actionName) {
			return target;
		}

		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for action.`);
		}

		//actions actionName下,所有响应事件
		let actions = {};
		let actionsGlobal = {};
		for (let key in target) {
			if (actionPropsSign[key]) {
				//提取actions
				let logType = actionLogsSign[key];
				let actionFunName = actionPropsSign[key];
				actions[actionPropsSign[key]] = (...args) => dispatch => {
					//埋入日志输出点,便于使用人员定位事件触发
					if (logType) {
						switch (logType) {
							case 'warn':
								console.warn(`---actionFunName:${actionFunName}--- \n ---actionParams:`);
								console.warn(...args);
								break;
							case 'log':
								console.log(`---actionFunName:${actionFunName}--- \n ---actionParams:`);
								console.log(...args);
								break;
							case 'error':
								console.error(`---actionFunName:${actionFunName}--- \n ---actionParams:`);
								console.error(...args);
								break;
							default:
								break;
						}
					}
					//传达target,给业务层action静态方法互相调用使用
					target[key](...args)(dispatch, target);
				};
			}

			if (actionGlobalSign[key]) {
				//提取全局性actions
				let logType = actionGlobalLogsSign[key];
				let actionFunName = actionGlobalSign[key];
				actionsGlobal[actionGlobalSign[key]] = (...args) => dispatch => {
					//埋入日志输出点,便于使用人员定位事件触发
					if (logType) {
						switch (logType) {
							case 'warn':
								console.warn(`---actionFunName:${actionFunName}--- \n ---actionParams:`);
								console.warn(...args);
								break;
							case 'log':
								console.log(`---actionFunName:${actionFunName}--- \n ---actionParams:`);
								console.log(...args);
								break;
							case 'error':
								console.error(`---actionFunName:${actionFunName}--- \n ---actionParams:`);
								console.error(...args);
								break;
							default:
								break;
						}
					}
					//传达target,给业务层action静态方法互相调用使用
					target[key](...args)(dispatch, target);
				};
			}
		}

		//按名称将事件存入ActionFactory
		ActionFactory.initAction(actionName, actions);

		//按名称将全局性action存入ActionFactory
		ActionFactory.initGlobalAction(actionName, actionsGlobal);

		//清空记录标识等待下次数据存入
		actionPropsSign = {};
		actionLogsSign = {};
		actionGlobalSign = {};
		actionGlobalLogsSign = {};

		return target;
	};

	/**
	 * actionProps修饰器,按名称录入action
	 * @params actionFunName(事件名称), level(日志级别)
	 * @return target
	 */
	static actionProps = (actionFunName = '', level = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionProps.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for actionProps.`);
		}

		//按名称录入action
		actionPropsSign[key] = actionFunName;

		//按名称录入日志级别
		if (level) {
			actionLogsSign[key] = level;
		}

		return target;
	};

	/**
	 * actionGlobal修饰器,录入全局性action,页面使用this.props[actionName][actionFunName],谨慎使用
	 * @params actionFunName(事件名称), level(日志级别)
	 * @return target
	 */
	static actionGlobal = (actionFunName = '', level = '') => (target, key) => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionGlobal.`);
		}

		if (!key || typeof key != 'string') {
			throw new Error(`key Invalid value of type ${typeof key} for actionGlobal.`);
		}

		//按名称录入action
		actionGlobalSign[key] = actionFunName;

		//按名称录入日志级别
		if (level) {
			actionGlobalLogsSign[key] = level;
		}

		return target;
	};

	/**
	 * actionInjection修饰器,按名称反向注入事件到reactDom
	 * @param actionName(事件名称)
	 * @return target
	 */
	static actionInjection = (actionName = '') => target => {
		if (!target || typeof target != 'function') {
			throw new Error(`target Invalid value of type ${typeof target} for actionInjection.`);
		}

		if (!actionName) {
			return target;
		}

		let actions = ActionFactory.getAction(actionName);

		//按名称反向注入事件到reactDom的mapDispatchToProps,供connectstore使用
		target.mapDispatchToProps = dispatch => {
			let mapDispatchToPropsParams = {};

			for (let key in actions) {
				if (actions[key]) {
					mapDispatchToPropsParams[key] = bindActionCreators(actions[key], dispatch);
				}
			}
			return mapDispatchToPropsParams;
		};

		return target;
	};
}
