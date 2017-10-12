import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {signinUser} from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component{

  handleFormSubmit({email,password}){
    console.log('Signin handleFormSubmit:',email,password);
    //  debugger;
    // Need to do something to log user in
    this.props.signinUser({email,password});// call action creator function

  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!!</strong>{this.props.errorMessage}
        </div>
      );
    }

  }

  render(){
    //handleSubmit,email and password come from the redux form
    const {handleSubmit,fields:{email,password}}=this.props;
    /*
    Since these were not passing values to the handleFormSubmit, I replaced them with <Field

    <fieldset className="form-group">
      <label>Email:</label>
      <input className="form-control"  {...email} />
    </fieldset>
    <fieldset className="form-group">
      <label>Password:</label>
      <input  className="form-control"  {...password}/>
    </fieldset>
    */

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <label>Email:</label>
          <Field className="form-control"   name="email" component="input" type="email"  {...email} />


          <label>Password:</label>
          <Field className="form-control"   name="password" component="input" type="password"   {...password}/>

          {this.renderAlert()}

        <button type="submit" className="btn btn-primary ">Sign In</button>
      </form>
    );
  }
}

// To handle state 'auth' from combine reducer reducer\index.js
/* the 'error' in 'state.auth.error' is from reducer 'auth_reducer.js'
case AUTH_ERROR:
  return {...state,error:action.payload};//return all the state values and error from the Action creator \actions\index.js file
  */
function mapStateToProps(state){
  return {errorMessage:state.auth.error};
}

//Redux 5.3.3
/*export default reduxForm({
  form:'signin',
  fields:['email','password']
},null,actions)(Signin);*/

// Redux 6 and above
export default reduxForm({
  form:'signin',
  fields:['email','password']
})(connect(mapStateToProps,{signinUser})(Signin));
