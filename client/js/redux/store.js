import redux from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {thoughtReducer} from './reducers';
import actions from './actions';
import {Provider} from 'react-redux';

const store = createStore(thoughtReducer, applyMiddleware(thunk));

export default store;