import React from 'react';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import ThoughtItem from './ThoughtItem';

var ThoughtList = React.createClass({
    componentWillMount: function() {
        this.props.dispatch(actions.fetchThoughtsFromUser(this.props.currentUser));
    },
    render: function() {
        var currentUser = this.props.currentUser;
        var ThoughtItems = this.props.userThoughts.map(function(thought, index) {
                    return (<ThoughtItem thoughts={thought} key={thought._id} currentUser={currentUser}/>);
                });
        return (
            <div>
                <ul>
                    {ThoughtItems} 
                </ul>
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
        userThoughts: state.userThoughts,
    };
};

export default connect(mapStateToProps)(ThoughtList);