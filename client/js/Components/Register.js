import React from 'react';
import Error from './Error';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import actions from '../redux/actions';

var Register= React.createClass({
    componentDidMount:function(){
      this.props.dispatch(actions.changeFeedback(''));  
    },
    addUser: function(){

        var username= this.refs.username.value;
        var password= this.refs.password.value;
        var confirmPassword= this.refs.confirmPassword.value;
        // if(password !== confirmPassword){
        //     alert('password and confirm password is not same!!');
        // }
        if(password === confirmPassword){
            this.props.dispatch(actions.registerUserAsync(username,password));
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
                <div className="center">
                    <div className="login-user">
                        Username: <input type='text' ref='username' placeholder="Enter your username" />
                    </div>
                    <div className="login-user">
                        Password: <input type='password' ref='password' placeholder="Enter your password" />
                    </div>
                    <div className="login-user">
                        Confirm Password: <input type='password' ref='confirmPassword' placeholder="Confirm your password" />
                    </div>
                    <center>
                        <input className="fancy-button" type='submit' value='Register' onClick={this.addUser} />
                    </center>
                    <Error error={this.props.feedback} />
                </div>
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