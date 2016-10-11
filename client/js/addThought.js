import React from 'react';
import ReactDOM from 'react-dom';

var AddThought = React.createClass({
    addThought: function(){
        const newThought= this.props.refs.newThought.value;
        console.log(newThought);
    },
    
    render: function(props){
    return  <div><form onSubmit={this.addthought}>
            <input type="text-area" placeholder="Enter your Thought" ref='newThought' /> &nbsp;
            <input type="submit" value="Add" />
            </form></div>
}
});

export default AddThought;