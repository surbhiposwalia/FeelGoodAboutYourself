//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [], //needs to get the list of thoughts from the database,
    currentUser: "",
    basicAuth: "",
    error: "",
    currentThought: "",
    feedback:""
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
                thoughts: newThoughts,
                feedback:"The thought is successfully added!"
            });
            
        case actions.ADD_THOUGHT_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                feedback: 'Sorry! we could\'nt process your request' 
            });
            
        case actions.REGISTER_USER_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                feedback: 'Sorry! we could\'nt process your request' 
            });
        
        case actions.REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                feedback:"You are successfully registered!"
            });
            
        case actions.CREATE_SESSION_SUCCESS:
            // return state object with currentUser: action.payload.username, basicAuth: action.payload.basicAuth
           console.log(action.payload);
           
            return Object.assign({}, state, {
                currentUser: action.payload,
                isLoggedIn:true,
                feedback:'You are successfully logged In!, Welcome!'+ action.payload
            });
        
        case actions.CREATE_SESSION_ERROR:
            
            // return state object with error: action.error
            return Object.assign({}, state, {
                error: action.error,
                feedback: 'Sorry! you are not authorized. Please register to logIn!!' 
            });

        case actions.DESTROY_SESSION:
            // return state object currentUser: null
            return Object.assign({}, state, {
                currentUser: null,
                isLoggedIn:false
            });
            
        case actions.SELECT_THOUGHT:
            //console.log(action.payload);
            return Object.assign({}, state, {
                currentThought: action.payload
            });
            
        default:
            return state;
    }
};

exports.thoughtReducer = thoughtReducer;

