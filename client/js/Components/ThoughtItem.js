import React from 'react';
import ReactDOM from 'react-dom';

var ThoughtItem = React.createClass({
    editThought:function(){
        var editedThought= this.refs.input.value;
        console.log(editedThought);
    },
    render:function(props){
    return    <li contentEditable onBlur={this.editThought} ref="input">{this.props.thoughts.thought}</li>
    
}
});

export default ThoughtItem;