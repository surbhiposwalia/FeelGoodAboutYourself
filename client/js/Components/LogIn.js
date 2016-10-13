import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../redux/actions';
import routes from './routes';
import { browserHistory } from 'react-router'
import {Link} from 'react-router';

var connect = require('react-redux').connect;
import Error from './Error';

var LogIn= React.createClass({
    addUser: function(event){
        console.log('in add Userr');
        event.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.dispatch(actions.createSessionAsync(username, password));
        // console.log(username, password);
        this.refs.username.value = '';
        this.refs.password.value = '';
       
                        
                    
       // browserHistory.push('/');
        
    },
    render: function(){
        return (
            <div>
                <h1>Log In</h1>
                <br />
                <Error error={this.props.feedback} />
                Username:<input type='text' ref='username' placeholder="Enter your username" />
                Password:<input type='text' ref='password' placeholder="Enter your password" />
                <input type='submit' value='LogIn' onClick={this.addUser} /><Link to="/">Home</Link>
                
            </div>
        );
    }
});

let mapStateToProps= function(state, props){
    return{
        isLoggedIn: state.isLoggedIn, 
        thoughts: state.thoughts, 
        currentUser: state.currentUser,
        basicAuth: state.basicAuth,
        error: state.error,
        currentThought: state.currentThought,
        feedback:state.feedback
    };
};

const Container = connect(mapStateToProps)(LogIn);

export default Container;


