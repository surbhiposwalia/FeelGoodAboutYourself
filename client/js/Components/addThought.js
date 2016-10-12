import React from 'react';
import ReactDOM from 'react-dom';

var AddThought = React.createClass({
    addThought: function(){
        event.preventDefault();
        const thought= this.refs.newThought.value;
        console.log(thought);
        this.refs.newThought.value='';
    },
    render: function(){
    return  <div><h1>Add a New Thought</h1><form onSubmit={this.addThought}>
            <input type="text" placeholder="Enter your Thought" ref="newThought" /> &nbsp;
            <input type="submit" value="Add" />
            </form>
            </div>
}
});

export default AddThought;