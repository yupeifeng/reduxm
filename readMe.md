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

### Example
```markdown
 action.js:

   import { getActionType } from 'reducermanger';
   const homeType = getActionType('Home');
   

 index.js:

    import { RtRdCon, getActionType } from 'reducermanger';
    const homeType = getActionType('Home');
    @RtRdCon
    export default class Home extends React.Component{
        static mapStateToProps = (state, ownProps) => {
            return {
                Home: state.Home
            };
        };
    
        static mapDispatchToProps = (dispatch, ownProps) => {
            return {
            };
        };
    }
    

 reducer.js:

    import { store, storeProps } from 'reducermanger';
    @store
    class Home {
        @storeProps('change_searchForm', true)
        static searchForm = {
            count: 0,
            pageIndex: 1,
            pageSize: 100000
        };
    
        @storeProps('change_selectProjectId', true)
        static selectProjectId = "";
    
        @storeProps('change_projectList', true)
        static projectList = [];
    
        @storeProps('change_statistics', true)
        static statistics = {};
    
        @storeProps('change_projectStatistics', true)
        static projectStatistics = {};
    }
    

 app.js:
    import './home/reducer';
    import { getStore } from 'reducermanger';
    const store = createStore(getStore(), applyMiddleware(thunk));

```