import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE} from '../actions/type';

export default function(state={},action){
  switch (action.type) {
    case AUTH_USER:
      return {...state,authenticated:true,error:''}; // return all the state values and authenticated =TRUE. error='' is mainly used to clear any error shown from previous check

    case UNAUTH_USER:
      return {...state,authenticated:false,error:''};// return all the state values and authenticated =False. error='' is mainly used to clear any error shown from previous check

    case AUTH_ERROR:
      return {...state,error:action.payload};//return all the state values and error from the Action creator \actions\index.js file

    case FETCH_MESSAGE:
      return {...state,message:action.payload};
  }
  return state;
}
