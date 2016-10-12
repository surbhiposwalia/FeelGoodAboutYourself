// var React = require("react");
// var ReactDOM = require("react-dom");
// var Provider = require("react-redux").Provider;

// var store = require("./redux/store");

// document.addEventListener('DOMContentLoaded', function(){
//     ReactDOM.render(
//         <Provider store={store}>
//             <p>This is a test</p>
//         </Provider>,
//         document.getElementById('app')
//     );
// });

import 'babel-polyfill';
import routes from './routes';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

var React= require('react');
var ReactDOM = require('react-dom');
import Thought from './Thought';
//var createStore = require('redux').createStore;

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});