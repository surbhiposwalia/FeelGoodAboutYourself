var React= require('react');

var StarRater = React.createClass({
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
                <i className={className} key={i} onClick={this.props.onChange.bind(null, i + 1)}>
                </i>);
                stars.push(star);
        }
        return(<span className="star-rater">{stars}</span>);
    }

});

module.exports = StarRater;

//onClick={this.props.onChange.bind(null, i + 1)}