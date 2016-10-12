var React = require("react");
var ReactDOM = require("react-dom");
var Provider = require("react-redux").Provider;

import routes from "./Components/routes";
 import Thought from './Components/Thought';
 import Register from './Components/Register';
 import LogIn from './Components/LogIn';

var store = require("./redux/store");

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<Provider store={store}>{routes}</Provider>,
        document.getElementById('app')
    );
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);