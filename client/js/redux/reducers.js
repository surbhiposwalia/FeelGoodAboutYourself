//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [] //needs to get the list of thoughts from the database
    //what other things in state do I need?
    //do I need seperate actions/reducers/store for thoughts and users?
    //how do I pull my information from my database, select one random element from that array of thoughts, and show that one element? 
};

var thoughtReducer = function(state = initialState, action) { //ES6 babyyyyy
    //state = state || initialState;
    switch(action.type) {
        case actions.FETCH_THOUGHTS_REQUEST:
            return Object.assign({}, state, {
                
            });
            
        case actions.FETCH_THOUGHTS_SUCCESS:
            
        case actions.FETCH_THOUGHTS_ERROR:
            
        default:
            return state;
    }
}

exports.thoughtReducer = thoughtReducer;