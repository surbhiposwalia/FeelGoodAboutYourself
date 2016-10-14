import React from 'react';

const Error = props => {
    return (
        <div className="error" >{"" + props.error}</div>  
    );
};

export default Error;
