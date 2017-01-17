import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {thoughtReducer} from './reducers';

const store = createStore(thoughtReducer, applyMiddleware(thunk));

export default store;