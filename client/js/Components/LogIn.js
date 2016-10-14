import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../redux/actions';
import routes from './routes';
import { browserHistory } from 'react-router'
import {Link} from 'react-router';
import Thought from './Thought';
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var connect = require('react-redux').connect;
import Error from './Error';

var LogIn= React.createClass({
    
    componentDidMount:function(){
        // this.props.dispatch(actions.changeFeedback(''));
    },
    
    addUser: function(event){
        event.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.dispatch(actions.createSessionAsync(username, password,this));
        this.refs.username.value = '';
        this.refs.password.value = '';
        
    },

    transitionToHome:function(){
      if(this.props.isLoggedIn){
            this.context.router.push('/');
        }  
    }, 
    
    render: function(){
        console.log(this.props.feedback);
        return (
            <div>
                <h1>Log In</h1>
                <br />
                <Error error={this.props.feedback} />
                Username:<input type='text' ref='username' placeholder="Enter your username" />
                Password:<input type='password' ref='password' placeholder="Enter your password" />
                <input type='submit' value='LogIn' onClick={this.addUser} />
                <br />
                <Link to="/">Home</Link>  
            </div>
        );
    }
});

let mapStateToProps = function(state, props){
    return {
        isLoggedIn: state.isLoggedIn, 
        thoughts: state.thoughts, 
        currentUser: state.currentUser,
        basicAuth: state.basicAuth,
        error: state.error,
        currentThought: state.currentThought,
        feedback:state.feedback
    };
};

LogIn.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const Container = connect(mapStateToProps)(LogIn);

export default Container;
