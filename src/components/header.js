import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component{

  renderLinks(){
    console.log('renderLinks > this.props.authenticated:',this.props.authenticated)
    if(this.props.authenticated){
      // IF the signin is valid, show link to sign output
      return (
            <li className="nav-item">
              <Link className="nav-link" to ="/signout">Sign Out</Link>
            </li>
          )
    }else{
      // Show a link to Sing In or Sign up
      // Return array for Sign In and Sign Up
      // {1} abd {2} are some static values as key
      return(
            [
              <li className="nav-item" key={1}>
                <Link className="nav-link" to ="/signin">Sign In</Link>
              </li>,
              <li className="nav-item" key={2}>
                <Link className="nav-link" to ="/signup">Sign Up</Link>
              </li>
           ]
         )
    }

  }

  render(){
    return(
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand"> Redux Auth </Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}


function mapStateToProps(state){
  return{
    //From the Reducer return {...state,authenticated:true};
    // auth - state from combined reducer
    // authenticated - from the auth_reducer.js
    authenticated:state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
