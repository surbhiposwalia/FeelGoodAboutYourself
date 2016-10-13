import React from 'react';
import ReactDOM from 'react-dom';
import router from 'react-router';
import {Router} from 'react-router';
import {Route} from 'react-router';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';
import {IndexRoute} from 'react-router';
import LogIn from './LogIn';
import Register from './Register';
import AddThought from './addThought';
import routes from './routes';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import Error from './Error';
  
var Thought = React.createClass({
    componentWillMount:function(){
        this.props.dispatch(actions.fetchThoughts());
    },
    randomThought: function(){
        const random=Math.floor(Math.random()*this.props.thoughts.length);
        this.props.dispatch(actions.selectThought(this.props.thoughts[random]));
    },
    logOut:function(){
        
    },
    
    render: function(){
        return (
            <div>
                <nav>
                    <Error error={this.props.error} />
                    <Link to="/logIn">
                        Log In
                    </Link>
                    &nbsp; 
                    <Link to="/register">
                        Register
                    </Link>
                </nav>
                
                <main>
                    <h1>Thought: "{this.props.currentThought.thought}"</h1>
                    <p>- {this.props.currentThought.from}</p>
                    <Link to="/addThought">
                        Want to add a thought?
                    </Link>
                    <input type = 'button' value="Change the Thought" onClick={this.randomThought} />
                </main>
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

export default connect(mapStateToProps)(Thought);

//if isLoggedIn == true then , on home page add link to logout;
//should render thought on page loads
//should refresh feedback when changing pages
