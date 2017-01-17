import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import LogIn from './LogIn';
import Register from './Register';
import AddThought from './addThought';
import Thought from './Thought';

const routes = (
    <Router history={hashHistory} >
        <Route path="/" component={Thought} />
        <Route path="/logIn" component= {LogIn} />
        <Route path="/register" component= {Register} />
        <Route path="/addThought" component= {AddThought} />
    </Router>
);
    
export default routes;