import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';


class SignOut extends Component{

  componentWillMount(){
    // Log the user out (clear token) as well. Call from Action Creator index.js file
    this.props.signoutUser();
  }


  render(){
      return <div> Sorry to see you go.. </div>;
  }
}

export default connect (null,actions) (SignOut);
