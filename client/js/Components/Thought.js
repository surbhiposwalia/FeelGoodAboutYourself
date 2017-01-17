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
import StarRater from './StarRater';
import {Provider} from 'react-redux';
  
const Thought = React.createClass({
    componentWillMount:function(){
        if(!this.props.currentUser){
            this.props.dispatch(actions.fetchThoughts());
        }
        else {
            this.props.dispatch(actions.fetchThoughtsFromUser(this.props.currentUser));
        }
    },
    randomThought: function(){
        const random = Math.floor(Math.random()*this.props.thoughts.length);
        this.props.dispatch(actions.selectThought(this.props.thoughts[random]));
    },
    logOut:function(){
        this.props.dispatch(actions.destroySession());
    },
    addAfterLoginFeedback:function(){
        this.props.dispatch(actions.changeFeedback("Please LogIn to add thoughts!"));
    },
    homeToLoginFeedback:function(){
        this.props.dispatch(actions.changeFeedback(''));  
    },
    homeToAddThoughtFeedback:function(){
        this.props.dispatch(actions.changeFeedback(''));
    },
    changeRating:function(rating){
        this.props.dispatch(actions.updateThought(this.props.currentThought._id, this.props.currentThought.thought, this.props.currentThought.from, rating));
        this.props.dispatch(actions.fetchThoughtById(this.props.currentThought._id));
      this.props.dispatch(actions.fetchThoughts());
    },
    
    render: function(){
        if(!this.props.isLoggedIn){
            return (
                <div>
                    <nav>
                        <h1 className="title">Feel Good About Yourself</h1>
                        <div className="nav-link">
                            <Link id="no-dash" to="/">
                            Home
                            </Link>
                            &nbsp; 
                            <Link to="/logIn" onClick={this.homeToLoginFeedback}>
                                Log In
                            </Link>
                            &nbsp; 
                            <Link to="/register">
                                Register
                            </Link>
                        </div>
                    </nav>
                    
                    <main>
                        <h2>"{this.props.currentThought.thought}"</h2><br /><StarRater stars={this.props.currentThought.stars} onChange={this.changeRating} /><br />
                        <input className="the-button" type = 'button' value="Change the Thought" onClick={this.randomThought} />
                        <br />
                        <br />
                        <Link to="/logIn" onClick={this.addAfterLoginFeedback}>
                            Want to add a thought?
                        </Link>
                    </main>
                </div>
            );
        }
        else{
            return (
                <div>
                    <nav>
                        <h1 className="title">Feel Good About Yourself</h1>
                        <div className="nav-link">
                            <Link id="no-dash" to="/">
                            Home
                            </Link>
                            &nbsp; 
                            <Link to="/" onClick={this.logOut}>
                                Log Out   
                            </Link>
                        </div>
                        
                        <div className="welcome">Welcome, {this.props.currentUser}!</div>
                    </nav>
                    <main>
                        <h2>"{this.props.currentThought.thought}"</h2><br /><StarRater stars={this.props.currentThought.stars} onChange={this.changeRating} /><br />
                        <input className="the-button" type = 'button' value="Change the Thought" onClick={this.randomThought} />
                        <br />
                        <br />
                        <Link to="/addThought" onClick={this.homeToAddThoughtFeedback}>
                            Want to add a thought?
                        </Link>
                    </main>
                </div>
            );
        }
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
        feedback:state.feedback,
        stars:state.stars
    };
};

export default connect(mapStateToProps)(Thought);


 