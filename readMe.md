## Redux's reducer management and leave page data destruction
### 
(1)处理Redux的reducer集中管理的问题

(2)防止action的type重复问题

(3)离开页面再次进入该页面的数据初始化问题
```markdown
├── lib
│
├── src
│
├── .babelrc
│
├── .gitignore
│
├── .npmignore
│
├── .prettierignore
│
├── .prettierrc
│
├── package.json
│
├── package-lock.json
│
└── readMe.md
```

### api
```markdown
    /**
     * 数据管理层
     */
    
    /**
     * 提供createStore方法(入参reactRouter,debug)绑定store后返回reactRouter
     * 提供getActionType方法获取对应store的actionType(入参storeName)
     * 提供getDevTools方法,返回调试工具视图和Route平级使用
     */
    import Store from './store/store';
    
    const store = Store.store; //store注解(入参storeName)
    const storeProps = Store.storeProps; //store数据更改响应type注解(入参actionType)
    const storeDestroy = Store.storeDestroy; //数据销毁注解(离开页面数据初始化）
    const storeLogs = Store.storeLogs; //数据改变日志跟踪注解(入参日志等级'waring','log','error')
    
    /**
     * 数据、reactDom、redux链接层
     */
    import ConnectStore from './connect/connectstore'; //链接层注解(入参storeList:页面所需storeName、destroyStoreList:离开页面初始化storeName)
    
    /**
     * 事件管理层
     */
    import Action from './action/action';
    
    const action = Action.action; //action注解(入参actionName)
    const actionProps = Action.actionProps; //action层响应函数注解(入参actionFunName)
    const actionInjection = Action.actionInjection; //action事件注入注解,注入的react页面(入参actionName)
    const actionLogs = Action.actionLogs; //action事件日志跟踪注解(入参日志等级'waring','log','error')
    
    export {
    	Store,
    	store,
    	storeProps,
    	storeDestroy,
    	storeLogs,
    	ConnectStore,
    	action,
    	actionProps,
    	actionInjection,
    	actionLogs
    };
```

### How to use it
```markdown
 reducer.js：
    import { store, storeProps, storeDestroy, storeLogs } from 'reducermanager';
    @store('demo1Store')
    class demo1 {
 	    @storeProps('change_welcomeText')
 	    @storeDestroy
 	    static welcomeText = 'Welcome to Redux test!';
 
 	    @storeProps('change_needCode')
 	    @storeDestroy
 	    @storeLogs('log')
 	    static needCode = 1;
    }
 
 action.js:
    ...
    import { Store, action, actionProps, actionLogs } from 'reducermanager';
    const demo1Type = Store.getActionType('demo1Store');
    @action('demo1Action')
    class demo1Action {
 	    @actionProps('changeNeedCode')
 	    @actionLogs('log')
 	    static changeNeedCode = nickName => async dispatch => {
 		    let needCode = await checkNeedCode(nickName);
 		    dispatch({ type: demo1Type.change_needCode, needCode: needCode });
 	    };
    }
 
 
 index.js:
    ...
    import './action';
    import { ConnectStore, actionInjection } from 'reducermanager'; 
    @ConnectStore(['demo1Store'], ['demo1Store'])
    @actionInjection('demo1Action')
    export default class demo1 extends React.Component {
	    componentDidMount() {
		    let that = this;
		    let changeNeedCode = that.props.changeNeedCode;
		    changeNeedCode('zhanghao');
	    }
	            
	    render() {
        	let that = this;
        	return (
        		<div>是否需要验证码{that.props.demo1Store.needCode}</div>
        	);
        }
	}
 
 
 app.js：
    ...
    import './demo1/reducer';
    import { Store } from 'reducermanager';
    let debug = true;
    const router = Store.createStore(
	    <HashRouter>
            <Route exact path="/demo/demo1" component={demo1} />
            {debug ? Store.getDevTools() : null}
	    </HashRouter>,
	    debug
    );
    ReactDOM.render(router, document.getElementById('content'));

```
