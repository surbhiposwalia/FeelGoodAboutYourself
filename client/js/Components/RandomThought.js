import React from 'react';
import ReactDOM from 'react-dom';

var RandomThought = React.createClass({
    render: function(props){
       console.log(this.props);
        return (<div>"{this.props.random}"</div>); 
    }
})

export default RandomThought;