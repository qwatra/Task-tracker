import React from 'react'
import {render} from 'react-dom'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './components/App'
import Login from './components/Auth/Login'
import Registration from './components/Auth/Registration'
import Tasks from './components/Tasks'
import TaskView from './components/TaskView'
import TaskEditor from './components/TaskEditor'



import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const NotFound = () => <h1>Oops, page not found</h1>
const Auth = (props) => {
  if(!store.getState().auth.user) {
    return <Redirect to="/login"/>
  } else {
    return props.children;
  }
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration}/>
          <Auth>
            <Switch>
              <Redirect from="/" to="/tasks" exact/>
              <Route path="/tasks/edit/:id" component={TaskEditor}/>
              <Route path="/tasks/:id" component={TaskView}/>
              <Route path="/tasks" component={Tasks}/>
              <Route path="*" component={NotFound} component={TaskEditor}/>
            </Switch>
          </Auth>
        </Switch> 
      </App>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);