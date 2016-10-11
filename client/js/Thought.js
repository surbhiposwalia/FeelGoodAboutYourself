import React from 'react';
import ReactDOM from 'react-dom';
var router =require ('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link= router.Link;
var IndexRoute= router.IndexRoute;
import RandomThought from './RandomThought';
import LogIn from './LogIn';
import Register from './Register';
import AddThought from './addThought';
import routes from './routes';

  
var Thought = React.createClass({
    randomThought: function(){
        console.log('in randomthought');
     //return   props.thought[Math.floor(Math.random()*props.thought.length+1)];
     return "thought";
    },
    
    render: function(){
        return (<div><Link to="/logIn">
                          Log In
                        </Link> &nbsp; 
                        <Link to="/register">
                            Register
                        </Link><h1>Thought of the Day</h1><br />
                        <RandomThought random={this.randomThought()} />
                        <Link to="/addThought">
                            Wanna add a new thought??
                        </Link> <input type = 'button' value="Change the Thought" /></div>);
    
   
    }
})
 //

// let mapStateToProps= function(state, props){
//     thought: state.thought
    
// }

// const Container = (mapStateToProps)(Thought)



export default Thought;// should be container when adding redux