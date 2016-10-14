import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../redux/actions';
import {connect} from 'react-redux';

var ThoughtItem = React.createClass({
    editThought:function(props){
        var editedThought= this.refs.input.value;
        console.log(editedThought);
        console.log(this.props.thoughts._id);
        this.props.dispatch(actions.updateThought(this.props.thoughts._id,editedThought,this.props.currentUser))
    },
    render:function(props){
    return    <li><input contentEditable onBlur={this.editThought} ref="input" />{this.props.thoughts.thought}</li>
    
}
});

var Container= connect()(ThoughtItem)
export default Container;