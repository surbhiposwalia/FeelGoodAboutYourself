import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {Link} from 'react-router';
import Error from './Error';
import ThoughtList from './ThoughtList';

const AddThought = React.createClass({
    addThought: function(event){
        event.preventDefault();
        const thought = this.refs.newThought.value;
        this.props.dispatch(actions.addThoughtAsync(thought, this.props.currentUser));
        this.refs.newThought.value='';
        this.context.router.push('/addThought');
        this.props.dispatch(actions.changeFeedback('You have successfully added the thought!!'));
        this.props.dispatch(actions.fetchThoughtsFromUser(this.props.currentUser));
    },
    
    render: function(){
        return(
            <div>
                <nav>
                    <h1 className="title">Add a New Thought</h1>
                    <div className="welcome">adding thoughts from: {this.props.currentUser}</div>
                    <div className="nav-link">
                        <Link id="no-dash" to="/">
                            Home
                        </Link>
                    </div>
                </nav>
                <form onSubmit={this.addThought}>
                    <Error error={this.props.feedback} />
                    <br />
                    <input id="thought-box" type="text" placeholder="Enter your Thought" ref="newThought" />
                    &nbsp;
                    <input className="fancy-button" type="submit" value="Add" />
                </form>
                <h1>Your previous thoughts</h1>
                <div>
                    <ThoughtList />
                </div>
            </div>  
        );
    }
});

AddThought.contextTypes = {
    router: React.PropTypes.object.isRequired
};

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

export default connect(mapStateToProps)(AddThought);