import React from 'react';
import actions from '../redux/actions';
import {connect} from 'react-redux';

var ThoughtList = React.createClass({
    componentWillMount: function() {
        this.props.dispatch(actions.fetchThoughtsFromUser(this.props.currentUser));
    },
    
    render: function() {
        //Thoughts don't immediately appear as I add them
        var theThoughts = this.props.userThoughts.map(function(thoughts, index) {
                    return (<li key={index}>{thoughts.thought}</li>);
                });
        return (
            <div>
                <ul>
                    {theThoughts}
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