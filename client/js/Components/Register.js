import React from 'react';
import Error from './Error';
import {connect} from 'react-redux';

var Register= React.createClass({
    addUser: function(){
        event.preventDefault();
        var username= this.refs.username.value;
        var password= this.refs.password.value;
        var confirmPassword= this.refs.confirmPassword.value;
        // if(password !== confirmPassword){
        //     alert('password and confirm password is not same!!');
        // }
        this.refs.username.value='';
        this.refs.password.value='';
        this.refs.confirmPassword.value='';
    },
    
    render:function(){
        return(
            <div>
                <h1>Register</h1>
                <br />
                <Error error={this.props.error} />
                Username:<input type='text' ref='username' placeholder="Enter your username" />
                Password:<input type='text' ref='password' placeholder="Enter your password" />
                Confirm Password:<input type='text' ref='confirmPassword' placeholder="Confirm your password" />
                <input type='submit' value='Register' onClick={this.addUser} />
            </div>
        );
    }
});

let mapStateToProps= function(state, props){
    return {
        isLoggedIn: state.isLoggedIn, 
        thoughts: state.thoughts, 
        currentUser: state.currentUser,
        basicAuth: state.basicAuth,
        error: state.error,
        currentThought: state.currentThought,
    };
};

export default connect(mapStateToProps)(Register);