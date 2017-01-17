import React from 'react';
import actions from '../redux/actions';
import {Link} from 'react-router';
import Error from './Error';
import {connect} from 'react-redux';

const LogIn= React.createClass({

    addUser: function(event){
        event.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        this.props.dispatch(actions.createSessionAsync(username, password, this));
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
                <form className="center" onSubmit={this.addUser}>
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
                </form>
                  
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
