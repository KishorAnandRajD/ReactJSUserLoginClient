import React,{Component} from 'react';
import {connect} from 'react-redux';

// ComposedComponent is a combination of methods
export default function(ComposedComponent){
  class Authentication extends Component{

    //Class level property - static. Authentication.contextTypes can be used anywhere inside the class
    static contextTypes={
      router:React.PropTypes.object
    }

    // Runs before render()
    componentWillMount(){
      // IF the user is not authenticated, then move back to home page using router context
      console.log('componentWillMount() this.props.authenticatedprop:',this.props.authenticatedprop);
      if (!this.props.authenticatedprop){
        this.context.router.push('/');
      }
    }

    // Runs when state is updated (new set of props) re-rendered
    // nextProps - represents what the next set of props the component will be rendered with
    // This is done because componentWillMount will only run before render. So once SignedIn, we do Signout, and click 'Resources' - won't work even when the authenticatedprop is updated.
    // So now, in this method, when Signout is clicked, the props(authenticatedprop) value changes to false and context routed to the home page
    componentWillUpdate(nextProps){
      console.log("componentWillUpdate");
      console.log("nextProps:",nextProps);
      console.log("nextProps.authenticatedprop",nextProps.authenticatedprop);

      if(!nextProps.authenticatedprop){
        this.context.router.push('/');
      }
    }

    render(){
      console.log("this.context",this.context);
      console.log("this.props",this.props);
      console.log('Rendering:',ComposedComponent);
      return <ComposedComponent {...this.props} />
    }
  }

// mapStateToProps - to use the state 'authenticated' value from the reducer as a prop in this file
  function mapStateToProps(state){
    //'auth' state from combined reducer
    // 'authenticated' is the value (true or false) retured from the auth_reducer.js
    // So authenticatedprop will be assigned with either true or false based on whether its signedin or not
    return {authenticatedprop: state.auth.authenticated};
  }

  return connect(mapStateToProps)(Authentication);
}

// In some other location (not in this file), we want to use this higher order component (HOC)
/*
import Authentication // This is my HOC
import Resources  // This is the component I want to wrap

const ComposedComponent=Authentication(Resources);

// In some render methods
<ComposedComponent resources={resourceList}/>
*/
