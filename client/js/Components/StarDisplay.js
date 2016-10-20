var React= require('react');

var StarDisplay = React.createClass({
    render: function(){
        var stars =[];
        for (var i=0; i<5; i++){
            
            var className;
            if(i < this.props.stars || 0){
                className = 'fa fa-heart';
            }
            else {
                className='fa fa-heart-o';
            }
            var star=(
                <i className={className} key={i}>
                </i>);
                stars.push(star);
        }
        return(<span className="star-rater">{stars}</span>);
    }

});

module.exports = StarDisplay;