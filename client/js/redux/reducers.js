//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [], //needs to get the list of thoughts from the database,
    currentUser: null,
    basicAuth: null,
    error: null,
    currentThought: "",
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
            
        case actions.ADD_THOUGHT_SUCCESS:
            var newThoughts = state.thoughts.concat(action.payload);
            return Object.assign({}, state, {
                thoughts: newThoughts
            });
            
        case actions.ADD_THOUGHT_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });
            
        case actions.CREATE_SESSION_SUCCESS:
            // return state object with currentUser: action.payload.username, basicAuth: action.payload.basicAuth
           console.log(state);
            return Object.assign({}, state, {
                currentUser: action.payload,
                isLoggedIn:true
            });
        
        case actions.CREATE_SESSION_ERROR:
            // return state object with error: action.error
            return Object.assign({}, state, {
                error: action.error
            });

        case actions.DESTROY_SESSION:
            // return state object currentUser: null
            return Object.assign({}, state, {
                currentUser: null,
                isLoggedIn:false
            });
            
        case actions.SELECT_THOUGHT:
            return Object.assign({}, state, {
                currentThought: action.payload
            });
            
        default:
            return state;
    }
};

exports.thoughtReducer = thoughtReducer;

