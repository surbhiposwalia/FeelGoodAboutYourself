import React from 'react';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import StarDisplay from './StarDisplay';

const ThoughtItem = React.createClass({
    editThought:function(props){
        var editedThought= this.refs.input.value;
        console.log(editedThought);
        console.log(this.props.thoughts._id);
        this.props.dispatch(actions.updateThought(this.props.thoughts._id,editedThought,this.props.thoughts.from, this.props.thoughts.stars));
        this.refresh();
        
    },
    refresh:function(){
        this.props.dispatch(actions.fetchThoughtsFromUser(this.props.currentUser));
    },
    edit:function(props){
        this.props.dispatch(actions.editable(this.props.thoughts._id));
    },
    deleteThought:function(){
        this.props.dispatch(actions.deleteThought(this.props.thoughts._id));
        this.props.dispatch(actions.fetchThoughtsFromUser(this.props.currentUser));
    },
    
    render:function(props){
    return   (<p>
                    <i onClick={this.deleteThought} className="fa fa-trash trash" aria-hidden="true"></i>
                <li 
                    onDoubleClick={this.edit}>{this.props.thoughts.thought}
                    <br />
                    <StarDisplay  stars={this.props.thoughts.stars} />
                {this.props.editable==this.props.thoughts._id ?<div><br /><input contentEditable onBlur={this.editThought} ref="input" /></div>:null }
                </li>
            </p>
            );
    
}
});
let mapStateToProps= function(state, props){
    return{
            editable:state.editable,
            stars:state.stars
    };
};
const Container = connect(mapStateToProps)(ThoughtItem)
export default Container;