//store
var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;
var thoughtReducer = require('./reducers').thoughtReducer;

var actions = require('./actions');

var store = createStore(thoughtReducer, applyMiddleware(thunk));

module.exports = store;