import axios from 'axios';
import {browserHistory} from 'react-router'; // communicate information about the URL to the react-router
import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE} from './type';

const ROOT_URL='http://localhost:3090'; // Node Server URL

export function signinUser({email,password}){
  console.log('signinUser:',email,password);
  // In general Action creator returns TYPE and Payload objects
  // But since we are using redux thunk, we can return function
  // With this function, we get direct access to the DISPATCH methods
  return function(dispatch){
    // Submit email/password to node server
    //axios.post(`${ROOT_URL}/signin`,{email,password});

    // Thunk,promise
    // If request is success, then it goes into '.then'
    // If failure, it goes to '.catch'
    axios.post(`${ROOT_URL}/signin`,{email,password})
      .then(response =>{
        // IF request is good
        // - update state to indicate user is authenticated
        dispatch({type:AUTH_USER})
        // - Save the JWT token in localstorage
        //localStorage - Windows code
        // response.data.token - value returned from Server applications \controllers\authentication.js file Sing In section res.send({token:tokenForUser(req.user)}); // return the token for the user
        localStorage.setItem('token',response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');// communicate information about the URL to the react-router

      })
      .catch(()=>{
          // If request is bad...  Show an error to the user
          dispatch(authError('Bad Login Info')); //call authError and handle error message
      });

  }
}

// Same as signinUser except the Axios Post request URL contains '..'/signup'
export function signupUser({email,password}){
  console.log('signupUser:',email,password);
  // In general Action creator returns TYPE and Payload objects
  // But since we are using redux thunk, we can return function
  // With this function, we get direct access to the DISPATCH methods
  return function(dispatch){
    // Submit email/password to node server (\controllers\authentication.js)
    //axios.post(`${ROOT_URL}/signup`,{email,password});

    // Thunk,promise
    // If request is success, then it goes into '.then'
    // If failure, it goes to '.catch'
    axios.post(`${ROOT_URL}/signup`,{email,password})
      .then(response =>{
        // IF request is good
        // - update state to indicate user is authenticated
        dispatch({type:AUTH_USER})
        // - Save the JWT token in localstorage
        //localStorage - Windows code
        // response.data.token - value returned from Server applications \controllers\authentication.js file Sing In section res.send({token:tokenForUser(req.user)}); // return the token for the user
        localStorage.setItem('token',response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');// communicate information about the URL to the react-router

      })
      .catch(response=>{
          console.log("Catch response:",response);
          console.log("Catch response.message:",response.message);
          console.log("Catch response.response.data.error:",response.response.data.error);
        //  debugger;
          // If request is bad...  Show an error to the user
          // IDeally it should have been 'response.data.error', but it was throwing 'error' is undefined. So I went in debugger mode and checked the variable which was 'response.response.data.error'
          dispatch(authError(response.response.data.error)); //call authError and handle error message
      });

  }
}



export function authError(error){
  return{
    type:AUTH_ERROR,
    payload:error
  };
}

export function signoutUser(){

  //Clear the localStorage token during signout so that they can't login back without user and password
  localStorage.removeItem('token');

  return{
    type:UNAUTH_USER
  };
}

// Till now(all the features), the token  authorization was only within the Client application. This function is used to get a response when the Root URL of the node server is invoked with an authenticated user. i.e. a user already signed in can access the root url of the node server and get a response.
/*
This is the line of code to be invoked in the node server \server\router.js file.
app.get('/',requireAuth,function(req,res){
  res.send({message:'Kishor, the Super secrect code is ABC123'});
});
The expected response is 'message:'Kishor, the Super secrect code is ABC123'}'

*/
// This is used from the 'Feature' component (/components/feature.js)
export function fetchMessage(){
  return function(dispatch){
    // Pass the jwt token value in key 'authorization' and attach it to the header in the Root URL
    axios.get(ROOT_URL,{headers:{authorization:localStorage.getItem('token')}})
      .then(response =>{
          console.log(response);
          dispatch({type:FETCH_MESSAGE,payload:response.data.message})
      });
  }
}
