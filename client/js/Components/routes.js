var React= require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
import LogIn from './LogIn';
import Register from './Register';
import AddThought from './addThought';
import Thought from './Thought';

var routes = (
    <Router history={hashHistory} >
            <Route path="/" component={Thought} />
            <Route path="/logIn" component= {LogIn} />
            <Route path="/register" component= {Register} />
            <Route path="/addThought" component= {AddThought} />
   </Router>
    );
    
    export default routes;