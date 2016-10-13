import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import {Link} from 'react-router';
import Error from './Error';
import ThoughtList from './ThoughtList';

var AddThought = React.createClass({
    addThought: function(event){
        event.preventDefault();
        const thought = this.refs.newThought.value;
        //dispatch action
        this.props.dispatch(actions.addThoughtAsync(thought, this.props.currentUser));
        this.refs.newThought.value='';
    },
    
    render: function(){
        return(
            <div>
                <Error error={this.props.error} />
                <h1>Add a New Thought</h1><form onSubmit={this.addThought}>
                <input type="text" placeholder="Enter your Thought" ref="newThought" />
                &nbsp;
                <input type="submit" value="Add" />
                </form>
                <Link to="/">
                    Home
                </Link>
                <h2>Your thoughts</h2>
                <div>
                    <ThoughtList />
                </div>
            </div>  
        );
    }
});

let mapStateToProps= function(state, props){
    return{
        isLoggedIn: state.isLoggedIn, 
        thoughts: state.thoughts, 
        currentUser: state.currentUser,
        basicAuth: state.basicAuth,
        error: state.error,
        currentThought: state.currentThought,
    };
};

export default connect(mapStateToProps)(AddThought);