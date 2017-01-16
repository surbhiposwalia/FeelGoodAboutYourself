import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../redux/actions';
import routes from './routes';
import { browserHistory } from 'react-router'
import {Link} from 'react-router';
import Thought from './Thought';
import Error from './Error';
import router from 'react-router';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {connect} from 'react-redux';

const LogIn= React.createClass({

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
        return (
            <div>
                <nav>
                    <h1 className="title">Log In</h1>
                    <div className="nav-link">
                        <Link id="no-dash" to="/">Home</Link>
                    </div>
                </nav>
                <div className="center">
                    <div className="login-user">
                        Username: <input className="inputs" type='text' ref='username' placeholder="Enter your username" required />
                    </div>
                    <div className="login-user">
                        Password: <input className="inputs" type='password' ref='password' placeholder="Enter your password" required />
                    </div>
                    <center>
                        <input className="fancy-button" type='submit' value='Log In' onClick={this.addUser} />
                    </center>
                    <Error error={this.props.feedback} />
                </div>
                  
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
