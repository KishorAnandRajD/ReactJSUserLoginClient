import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component{

  componentWillMount(){
    this.props.fetchMessage(); // Call the Action Creator function in /actions/index.js
  }

  render(){
    return(
      <div>
        <h3> This is a feature  </h3>
        <h4>{this.props.message}</h4>
      </div>
    );
  }

}

//From the Reducer   return {...state,message:action.payload};
// auth - state from combined reducer
// message - returned from the auth_reducer.js
function mapStateToProps(state){
  return {message:state.auth.message};
}

export default connect (mapStateToProps,actions)(Feature);
