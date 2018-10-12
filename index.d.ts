/**
 * 数据注入层
 * 提供createStore、getDevTools、getActionType、getAllInitData四个方法
 *
 * createStore方法,绑定数据到整个react路由层
 * @params router(react路由), debug(是否开启调试工具)
 * @return reactRouter
 *
 * getDevTools方法,获取调试工具视图
 * @return DevTools(调试工具视图)
 *
 * getActionType方法,获取storeName下所有actionType
 * @param storeName(数据层名称)
 * @return {}(storeName下所有actionType)
 *
 * getAllInitData方法,获取storeName下所有初始数据
 * @param storeName(数据层名称)
 * @return {}(storeName下所有初始数据)
 */
declare class Store {
    /**
     * store修饰器,处理整个store层存入数据工厂
     * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
     * @return true
     */
    static store(storeName: string, allActionType?: string, allStoreLogs?: string): (target: any) => any;

    /**
     * storeActionType修饰器,按名称录入actionType
     * @params actionType(数据改变响应type), level(日志级别)
     * @return target
     */
    static storeActionType(actionType?: string, level?: string): (target: any, key: string) => any;

    /**
     * storeUnDestroy修饰器,按名称录入是否需要销毁
     * @return target
     */
    static storeUnDestroy(target: any, key: string): any;

    /**
     * storeComputed修饰器,按名称录入计算者(由某个值计算得来)
     * @params dependency(依赖的属性被计算者), level(日志级别)
     * @return target
     */
    static storeComputed(dependency: string, level?: string): (target: any, key: string) => any;

    /**
     * createStore方法,绑定数据到整个react路由层
     * @params router(react路由), debug(是否开启调试工具)
     * @return reactRouter
     */
    static createStore(router: any, debug: boolean): any;

    /**
     * getDevTools方法,获取调试工具视图
     * @return DevTools(调试工具视图)
     */
    static getDevTools(): any;

    /**
     * getActionType方法,获取storeName下所有actionType
     * @param storeName(数据层名称)
     * @return {}(storeName下所有actionType)
     */
    static getActionType(storeName: string): any;

    /**
     * getAllInitData方法,获取storeName下所有初始数据
     * @param storeName(数据层名称)
     * @return {}(storeName下所有初始数据)
     */
    static getAllInitData(storeName: string): any;
}

declare function store(storeName: string, allActionType?: string, allStoreLogs?: string): (target: any) => any;

declare function storeActionType(actionType?: string, level?: string): (target: any, key: string) => any;

declare function storeUnDestroy(target: any, key: string): any;

declare function storeComputed(dependency: string, level?: string): (target: any, key: string) => any;

/**
 * connectStore修饰器,连接数据,事件和reactDom,代理target并完善componentWillUnmount生命周期离开页面触发数据销毁
 * @params storeList[](页面所需数据层名称), destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
declare function connectStore(storeList?: Array<string>, destroyStoreList?: Array<string>): (target: any) => any;

/**
 * action修饰器,处理整个action层存入事件工厂
 * @param actionName(事件层名称)
 * @return target
 */
declare function action(actionName: string): (target: any) => any;

/**
 * actionProps修饰器,按名称录入action
 * @params actionFunName(事件名称), level(日志级别)
 * @return target
 */
declare function actionProps(actionFunName?: string, level?: string): (target: any, key: string) => any;

/**
 * actionGlobal修饰器,录入全局性action,页面使用this.props[actionName][actionFunName],谨慎使用
 * @params actionFunName(事件名称), level(日志级别)
 * @return target
 */
declare function actionGlobal(actionFunName?: string, level?: string): (target: any, key: string) => any;

/**
 * actionInjection修饰器,按名称反向注入事件到reactDom
 * @param actionName(事件名称)
 * @return target
 */
declare function actionInjection(actionName: string): (target: any) => any;

export {
    Store,
    store,
    storeActionType,
    storeUnDestroy,
    storeComputed,
    connectStore,
    action,
    actionProps,
    actionGlobal,
    actionInjection
}