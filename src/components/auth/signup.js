import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';


class SignUp extends Component{


  handleFormSubmit({email,password}){
    console.log('handleFormSubmit > ',email,password);
    //  debugger;
    // call action creator function from /actions/index.js
    this.props.signupUser({email,password});

  }

  renderAlert(){
    console.log("renderAlert:this.props.errorMessage >",this.props.errorMessage)
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!! </strong>{this.props.errorMessage}
        </div>
      );
    }

  }


  //http://redux-form.com/7.0.1/examples/syncValidation/

  renderField(field){
  // RED color for both field and error messages only when they are touched and error thrown
  //const className=`form-group ${field.meta.touched && field.meta.error? 'has-danger':''}`;
  // OR with destructuring on field TO meta using ES6
  /*const {meta}=field;
  const className=`form-group ${meta.touched && meta.error? 'has-danger':''}`;
  */
  // OR with destructuring on nested objects field, touched and error TO meta
  const {meta:{touched,error}}=field;
  const customcssclass=`form-group ${touched && error? 'has-danger':''}`;
  /*<div className="form-group  has-danger">
      To
    <div className={customcssclass}>
  */
    return(
      <div className={customcssclass}>
        <label>{field.labelToShow}</label>
        <input className={field.className} type={field.type} {...field.input} />
        <div className="text-help">
          {touched? error:''}
        </div>
      </div>
    );
  }

  render(){

  const {handleSubmit,fields:{email,password,passwordConfirm}}=this.props;

  //http://redux-form.com/7.0.1/examples/syncValidation/
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <Field className="form-control" labelToShow="Email:"  name="email" component={this.renderField} type="email"   />

          <Field className="form-control" labelToShow="Password:"  name="password" component={this.renderField} type="password"    />

          <Field className="form-control" labelToShow="Confirm Password:"  name="passwordconfirm" component={this.renderField} type="password"   />

        {this.renderAlert()}
        <button type="submit" className="btn btn-primary ">Sign Up/Register</button>
      </form>
    );
  }
}

// Redux form's validate function - will instantly be called onChange event in any of the three fields in the form
function validate(formProps){
  const errors={};
  console.log('validate > formProps:',formProps);

  if(!formProps.email){
    errors.email='Please enter an email';
  }

  if(!formProps.password){
    errors.password='Please enter a password';
  }

  if(!formProps.passwordconfirm){
    errors.passwordconfirm='Please enter a password confirmation';
  }

  if(formProps.password!=formProps.passwordconfirm){
    errors.password='Passwords must match';
  }
  console.log('errors.password:',errors.password);

  return errors;
}

// To handle state 'auth' from combine reducer reducer\index.js
/* the 'error' in 'state.auth.error' is from reducer 'auth_reducer.js'
case AUTH_ERROR:
  return {...state,error:action.payload};//return all the state values and error from the Action creator \actions\index.js file
  */
function mapStateToProps(state){
  return{errorMessage:state.auth.error};
}

export default reduxForm({
  form:'signup',
  fields:['email','password','passwordConfirm'],
  validate:validate
//}) (connect(null,actions)(SignUp));
})(connect(mapStateToProps,actions)(SignUp));
