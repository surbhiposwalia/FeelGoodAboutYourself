//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [] //needs to get the list of thoughts from the database
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