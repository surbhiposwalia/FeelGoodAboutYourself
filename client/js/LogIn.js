import React from 'react';
import ReactDOM from 'react-dom';

var LogIn= React.createClass({
    addUser: function(){
        var username= this.props.refs.username.value;
        var password= this.props.refs.password.value;
        console.log(username, password);
    },
    render: function(){
        return (<div><h1>Log IN</h1><br />
            Username:<input type='text' ref='username' placeholder="Enter your username" />
            Password:<input type='text' ref='password' placeholder="Enter your password" />
            <input type='submit' value='LogIn' onSubmit={this.addUser} /></div>);
    }
});






export default LogIn;