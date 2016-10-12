var fetch = require('isomorphic-fetch');

var SELECT_THOUGHT = 'SELECT_THOUGHT';
function selectThought(thought) {
    return {
        type: SELECT_THOUGHT,
        payload: thought
    };
}

//actions to fetch thoughts (sync)
var FETCH_THOUGHTS_SUCCESS = 'FETCH_THOUGHTS_SUCCESS';
function fetchThoughtsSuccess(thoughts) {
    return {
        type: FETCH_THOUGHTS_SUCCESS,
        payload: thoughts
    };
}

var FETCH_THOUGHTS_ERROR = 'FETCH_THOUGHTS_ERROR';
function fetchThoughtsError(error) {
    return {
        type: FETCH_THOUGHTS_ERROR,
        error: error
    };
}

//action to fetch thought endpoint for API (async)
function fetchThoughts() {
    return function(dispatch) {
        var endpoint = '/thoughts';
        return fetch(endpoint)
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    //bad response :(
                    var error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(function(data) {
                console.log("THIS IS THE DISPATCHED DATA: " + data);
                dispatch(fetchThoughtsSuccess(data));
            })
        .catch(function(error) {
            dispatch(fetchThoughtsError(error));
        });
    };
}

var ADD_THOUGHT_SUCCESS = 'ADD_THOUGHT_SUCCESS';
var addThoughtSuccess = function(thought){
    return {
        type: ADD_THOUGHT_SUCCESS,
        payload: thought
    };
};

var ADD_THOUGHT_ERROR = 'ADD_THOUGHT_ERROR';
var addThoughtError = function(error){
    return {
        type: ADD_THOUGHT_ERROR,
        error: error
    };
};

var addThoughtAsync = function(thought, currentUser){
    return function(dispatch) {
        // make POST request to Api
        var endpoint = '/thoughts';
        fetch(endpoint, {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
                body:JSON.stringify({
                thought: thought,
                from: currentUser
        })})
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    //bad response :(
                    var error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                res = res.json();
            })
            .then(response => {
                //if success, dispatch addThoughtSuccess(response);
                console.log(response.status);
                dispatch(addThoughtSuccess(response.data));
            })
        .catch(err => {
            //if fail, dispatch addThoughtFail(error);
            console.log(err);
            dispatch(addThoughtError(err));
        });
    };
};

//CREATE_SESSION_SUCCESS
var CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
var createSessionSuccess = function(username) {
    return {
        type: CREATE_SESSION_SUCCESS,
        payload: username
    };
};

//CREATE_SESSION_ERROR
var CREATE_SESSION_ERROR = 'CREATE_SESSION_ERROR';
var createSessionError = function(error) {
    return {
        type: CREATE_SESSION_ERROR,
        error: error
    };
};

//createSessionAsync (log in user)
var createSessionAsync = function(username, password) {
    return function(dispatch) {
        var endpoint = '/users/login';
        fetch(endpoint, {
            method:'post',
            //var headers = new headers
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
                body:JSON.stringify({
                username: username,
                password: password
        })})
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    //bad response :(
                    var error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                res = res.json();
            })
            .then(response => {
                //if success, dispatch addThoughtSuccess(response);
                return dispatch(createSessionSuccess(username));
            })
        .catch(err => {
            //if fail, dispatch addThoughtFail(error);
            console.log(err);
            return dispatch(createSessionError(err));
        });
    };
};

//DESTROY_SESSION
var DESTROY_SESSION = 'DESTROY_SESSION';
var destroySession = function() {
    return {
        type: DESTROY_SESSION,
    };
};

// //DESTROY_SESSION_ERROR
// var DESTROY_SESSION_ERROR = 'DESTROY_SESSION_ERROR';
// var destroySessionError = function(error) {
//     return {
//         type: DESTROY_SESSION_ERROR,
//         error: error
//     };
// };

// //destorySessionAsync (log out user)
// var destroySessionAsync = function() {
//     return function(dispatch) {
        
//     }
// }

exports.FETCH_THOUGHTS_SUCCESS = FETCH_THOUGHTS_SUCCESS;
exports.fetchThoughtsSuccess = fetchThoughtsSuccess;

exports.FETCH_THOUGHTS_ERROR = FETCH_THOUGHTS_ERROR;
exports.fetchThoughtsError = fetchThoughtsError;

exports.fetchThoughts = fetchThoughts;

exports.ADD_THOUGHT_SUCCESS = ADD_THOUGHT_SUCCESS;
exports.addThoughtSuccess = addThoughtSuccess;

exports.ADD_THOUGHT_ERROR = ADD_THOUGHT_ERROR;
exports.addThoughtError = addThoughtError;

exports.addThoughtAsync = addThoughtAsync;

exports.CREATE_SESSION_SUCCESS = CREATE_SESSION_SUCCESS;
exports.createSessionSuccess = createSessionSuccess;

exports.CREATE_SESSION_ERROR = CREATE_SESSION_ERROR;
exports.createSessionError = createSessionError;

exports.createSessionAsync = createSessionAsync;

exports.DESTROY_SESSION = DESTROY_SESSION;
exports.destroySession = destroySession;

exports.SELECT_THOUGHT = SELECT_THOUGHT;
exports.selectThought = selectThought;

// exports.DESTROY_SESSION_ERROR = DESTROY_SESSION_ERROR;
// exports.destroySessionError = destroySessionError;

// exports.destroySessionAsync = destroySessionAsync;