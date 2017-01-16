import React from 'react';

const StarRater = React.createClass({
    render: function(){
        let stars =[];
        for (let i=0; i<5; i++){
            
            let className;
            if(i < this.props.stars || 0){
                className = 'fa fa-heart';
            }
            else {
                className='fa fa-heart-o';
            }
            const star=(
                <i className={className} key={i} onClick={this.props.onChange.bind(null, i + 1)}>
                </i>);
                stars.push(star);
        }
        return(<span className="star-rater">{stars}</span>);
    }

});

export default StarRater;