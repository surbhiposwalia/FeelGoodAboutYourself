//store
import redux from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {thoughtReducer} from './reducers';
import actions from './actions';

const store = createStore(thoughtReducer, applyMiddleware(thunk));


module.exports = store;