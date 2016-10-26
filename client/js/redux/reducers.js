//reducers

var actions = require('./actions');

var initialState = {
    isLoggedIn: false, //once the user is logged in, isLoggedIn = true;
    thoughts: [], //needs to get the list of thoughts from the database,
    currentUser: "",
    basicAuth: "",
    error: "",
    currentThought: "",
    feedback:"",
    userThoughts: [],
    editable:false,
    stars:0
};

var thoughtReducer = function(state = initialState, action) { //ES6 babyyyyy
    //state = state || initialState;
    switch(action.type) {
        case actions.FETCH_THOUGHTS_SUCCESS:
            return Object.assign({}, state, {
                thoughts: action.payload,
                stars:action.payload.stars,
                currentThought: action.payload[Math.floor(Math.random() * action.payload.length)]
            });
            
        case actions.FETCH_THOUGHT_SUCCESS:
            return Object.assign({}, state, {
                stars:action.payload.stars,
                currentThought: action.payload
            });
            
        case actions.FETCH_THOUGHTS_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });
            
        case actions.ADD_THOUGHT_SUCCESS:
            var newThoughts = state.thoughts.concat({thought: action.payload});
            return Object.assign({}, state, {
                thoughts: newThoughts,
                stars: action.stars,
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
            return Object.assign({}, state, {
                currentUser: action.payload,
                isLoggedIn: true,
                feedback:'You are successfully logged In!, Welcome ' + action.payload
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
            return Object.assign({}, state, {
                currentThought: action.payload
            });
            
        case actions.CHANGE_FEEDBACK:
            return Object.assign({},state,{
                feedback:action.payload
            });
            
        case actions.FETCH_THOUGHTS_SUCCESS_FROM_USER:
            return Object.assign({}, state, {
                userThoughts: action.payload
            });
            
        case actions.FETCH_THOUGHTS_ERROR_FROM_USER:
            return Object.assign({}, state, {
                error: action.error
            });
            
        case actions.EDITABLE:
            return Object.assign({}, state, {
                editable: action.key
            });
            
        case actions.EDIT_THOUGHT_SUCCESS:
            return Object.assign({}, state, {
                editable: false
            });
            
        default:
            return state;
    }
};

exports.thoughtReducer = thoughtReducer;

