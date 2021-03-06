import React from 'react';
import Error from './Error';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import actions from '../redux/actions';

const Register= React.createClass({
    componentDidMount:function(){
      this.props.dispatch(actions.changeFeedback(''));  
    },
    addUser: function(event){
        event.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;
        if(password === confirmPassword){
            this.props.dispatch(actions.registerUserAsync(username, password));
            this.context.router.push('/');
        }
        else {
            this.props.dispatch(actions.changeFeedback('Sorry, we could\'nt process your request! '));
        }
        this.refs.username.value='';
        this.refs.password.value='';
        this.refs.confirmPassword.value='';
    },
    
    render:function(){
        return(
            <div>
                <nav>
                    <h1 className="title">Register</h1>
                    <div className="nav-link">
                        <Link id="no-dash" to="/">
                            Home
                        </Link>
                    </div>
                </nav>
                <form className="center" onSubmit={this.addUser}>
                    <div className="login-user">
                        Username: <input className="inputs" type='text' ref='username' placeholder="Enter your username" />
                    </div>
                    <div className="login-user">
                        Password: <input type='password' className="inputs" ref='password' placeholder="Enter your password" />
                    </div>
                    <div className="login-user">
                        Confirm Password: <input className="inputs" type='password' ref='confirmPassword' placeholder="Confirm your password" />
                    </div>
                    <center>
                        <input className="fancy-button" type="submit" value='Register' onClick={this.addUser} />
                    </center>
                    <Error error={this.props.feedback} />
                </form>
            </div>
        );
    }
});

Register.contextTypes = {
    router: React.PropTypes.object.isRequired
};

let mapStateToProps= function(state, props){
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

export default connect(mapStateToProps)(Register);