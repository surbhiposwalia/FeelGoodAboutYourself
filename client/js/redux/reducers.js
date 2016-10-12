//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [], //needs to get the list of thoughts from the database,
    currentUser: null,
    error: null,
    //what other things in state do I need?
    //do I need seperate actions/reducers/store for thoughts and users?
};

var thoughtReducer = function(state = initialState, action) { //ES6 babyyyyy
    //state = state || initialState;
    switch(action.type) {
        case actions.FETCH_THOUGHTS_SUCCESS:
            console.log(action.payload);
            return Object.assign({}, state, {
                thoughts: action.payload
            });
            
        case actions.FETCH_THOUGHTS_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });
            
        case actions.CREATE_SESSION_SUCCESS:
            // return state object with currentUser: action.payload
            return;
        
        case actions.CREATE_SESSION_FAIL:
            // return state object with error: action.payload
            return;

        case actions.DESTROY_SESSION:
            // return state object currentUser: null
            return;
            
        default:
            return state;
    }
};

exports.thoughtReducer = thoughtReducer;