import React from 'react';
import ReactDOM from 'react-dom';
import router from 'react-router';
import {Router} from 'react-router';
import {Route} from 'react-router';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';
import {IndexRoute} from 'react-router';
import RandomThought from './RandomThought';
import LogIn from './LogIn';
import Register from './Register';
import AddThought from './addThought';
import routes from './routes';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import Error from './Error';
  
var Thought = React.createClass({
    randomThought: function(){
        console.log('in randomthought');
     //return   props.thought[Math.floor(Math.random()*props.thought.length+1)];
     return "thought";
    },
    
    render: function(){
        return (
            <div>
                <nav>
                    <Link to="/logIn">
                      Log In
                    </Link> &nbsp; 
                    <Link to="/register">
                        Register
                    </Link>
                    <Error error={this.props.error} />
                </nav>
                
                <main>
                    <h1>Thought of the Day</h1><br />
                    <RandomThought random={this.randomThought()} />
                    <Link to="/addThought">
                        Wanna add a new thought??
                    </Link> <input type = 'button' value="Change the Thought" />
                </main>
        </div>
        );
    
   
    }
})
 //

// let mapStateToProps= function(state, props){
//     thought: state.thought,
//      error: state.error
    
// }

// const Container = (mapStateToProps)(Thought)



export default Thought;// should be container when adding redux

