//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [], //needs to get the list of thoughts from the database
    error: null,
    //what other things in state do I need?
    //do I need seperate actions/reducers/store for thoughts and users?
    //how do I pull my information from my database, select one random element from that array of thoughts, and show that one element? 
};

var thoughtReducer = function(state = initialState, action) { //ES6 babyyyyy
    //state = state || initialState;
    switch(action.type) {
        case actions.FETCH_THOUGHTS_SUCCESS:
            return Object.assign({}, state, {
                thoughts: action.payload
            });
            
        case actions.FETCH_THOUGHTS_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });
        default:
            return state;
    }
};

exports.thoughtReducer = thoughtReducer;