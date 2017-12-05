## Redux's reducer management and leave page data destruction
### 处理Redux的reducer集中管理的问题以及离开页面再次进入该页面的数据初始化问题
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

### Example
```markdown
 action.js:

    import { ReducerMain } from 'reducermanger';
    const evaluationStaType = ReducerMain.getActionType('evaluationSta');

 index.js:

    import { RtRdCon, ReducerMain } from 'reducermanger';
    const evaluationStaType = ReducerMain.getActionType('evaluationSta');
    export default RtRdCon(mapStateToProps, mapDispatchToProps, EvaluationSta, 'evaluationSta');

 reducer.js:

    import { ReducerMain } from 'reducermanger';
    export const evaluationSta = ReducerMain.initReducer(
    	{
    		change_projectList: 'change_projectList',
    		change_searchForm: 'change_searchForm',
    		change_selectProjectId: 'change_selectProjectId',
    		change_projectStatistics: 'change_projectStatistics'
    	},
    	{
    		searchForm: {
    			count: 0,
    			pageIndex: 1,
    			pageSize: 100000
    		},
    		selectProjectId: '',
    		projectList: [],
    		projectStatistics: {}
    	},
    	{},
    	(state, action) => {
    		switch (action.type) {
    			case ReducerMain.getActionType('evaluationSta').change_projectList:
    				return { ...state, projectList: action.projectList };
    			case ReducerMain.getActionType('evaluationSta').change_searchForm:
    				return { ...state, searchForm: action.searchForm };
    			case ReducerMain.getActionType('evaluationSta').change_selectProjectId:
    				return { ...state, selectProjectId: action.selectProjectId };
    			case ReducerMain.getActionType('evaluationSta').change_projectStatistics:
    				return { ...state, projectStatistics: action.projectStatistics };
    			default:
    				return { ...state };
    		}
    	},
    	'evaluationSta'
    );

 app.js:
    import './statistics/evaluationsta/reducer';
    import { ReducerMain } from 'reducermanger';
    const store = createStore(ReducerMain.getReducer(), applyMiddleware(thunk));

```