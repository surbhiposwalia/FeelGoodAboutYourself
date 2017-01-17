import React from 'react';

const StarDisplay = React.createClass({
    render: function(){
        let stars = [];
        for (let i=0; i<5; i++){
            let className;
            if(i < this.props.stars || 0){
                className = 'fa fa-heart';
            }
            else {
                className ='fa fa-heart-o';
            }
            const star = (
                <i className={className} key={i}>
                </i>
                );
                stars.push(star);
        }
        return(<span className="star-rater">{stars}</span>);
    }
});

 export default StarDisplay;