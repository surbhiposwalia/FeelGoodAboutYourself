//store
var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;
var thoughtReducer = require('./reducers').thoughtReducer;

var actions = require('./actions');

var store = createStore(thoughtReducer, applyMiddleware(thunk));

store.dispatch(actions.fetchThoughts()); //test
store.dispatch(actions.createSessionAsync("user8191", "password"));


module.exports = store;