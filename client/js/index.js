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