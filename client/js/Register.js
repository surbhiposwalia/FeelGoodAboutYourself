import React from 'react';
import ReactDOM from 'react-dom';
var Register= React.createClass({
    addUser: function(){
        var username= this.props.refs.username.value;
        var password= this.props.refs.password.value;
        var confirmPassword= this.props.refs.confirmPassword.value;
        if(password !== confirmPassword){
            alert('password and confirm password is not same!!');
        }
    },
    
    render:function(){
    return <div><h1>Log IN</h1><br />
            Username:<input type='text' ref='username' placeholder="Enter your username" />
            Password:<input type='text' ref='password' placeholder="Enter your password" />
            Confirm Password:<input type='text' ref='confirmPassword' placeholder="Confirm your password" />
            <input type='submit' value='Register' onSubmit={this.addUser} /></div>
}
});






export default Register;