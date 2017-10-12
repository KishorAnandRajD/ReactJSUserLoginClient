import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
//import {reducer as form} from 'redux-form'; // To use as ES6 syntax
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  //form:form
  //  or
  // form (ES6 syntax)
  form:formReducer,
  auth:authReducer
});

export default rootReducer;
