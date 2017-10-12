import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import Signin from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome'
import {AUTH_USER} from './actions/type'

import App from './components/app';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store=createStoreWithMiddleware(reducers);

// If the localStorage has the token from previous signin or signup, then use it when the user refreshes the page or closes the page after signin and then opens another window.
const token=localStorage.getItem('token');
if(token){
  // We need to update our Application state (redux state) by calling an Action Creator dispatch method. dispath method is a property of store
  // The AUTH_USER has the value for state authenticated:true in the \reducers\auth_reducer.js file
  // Since dispath is used to pass the state to all components, now we pass authenticated=true to them
  store.dispatch({type:AUTH_USER});

}
/*
1. IndexRoute is used if you want to show the users some page when the home page URL 'http://localhost:8080' has nothing in it.


2. 'RequireAuth' is the Higher Order component wrapping the 'Feature' component. If RequireAuth is not successful, then 'Feature' component will not be visible.
In our application, RequireAuth has a state 'authenticatedprop'. If state value is true, then show the 'Feature' component. Else push('/') to home page. This is done in the componentWillUpdate() method of /components/auth/require_auth.js

<Route path="feature" component={RequireAuth(Feature)} />

*/

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="signin" component={Signin} />
        <Route path="signout" component={SignOut} />
        <Route path="signup" component={SignUp} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
