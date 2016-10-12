import React from 'react';
import ReactDOM from 'react-dom';
var Register= React.createClass({
    addUser: function(){
        event.preventDefault();
        var username= this.refs.username.value;
        var password= this.refs.password.value;
        var confirmPassword= this.refs.confirmPassword.value;
        if(password !== confirmPassword){
            alert('password and confirm password is not same!!');
        }
        this.refs.username.value='';
        this.refs.password.value='';
        this.refs.confirmPassword.value='';
    },
    
    render:function(){
    return <div><h1>Register</h1><br />
            Username:<input type='text' ref='username' placeholder="Enter your username" />
            Password:<input type='text' ref='password' placeholder="Enter your password" />
            Confirm Password:<input type='text' ref='confirmPassword' placeholder="Confirm your password" />
            <input type='submit' value='Register' onClick={this.addUser} /></div>
}
});






export default Register;