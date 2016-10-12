var fetch = require('isomorphic-fetch');

//How do we take the input from the register functionality and store that in the database?
//How do we input information from the front end and save it to the back end?
//Because we have to input a thought from the front end and save it to the database...

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

var addThoughtAsync = function(){
    return function(dispatch) {
        // make POST request to Api
        fetch('endpoint')
            .then(response = response.json())
            .then(response => {
                console.log(response.status);
                dispatch(addThoughtSuccess(response.data))
            })
            .catch(err => console.log(err));
            
        // if success, dispatch addThoughtSuccess(response);
        // if fail, dispatch addThoughtFail(error);
    };
};


//CREATE_SESSION_SUCCESS
var CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
var createSessionSuccess = function(user) {
    return {
        type: CREATE_SESSION_SUCCESS,
        payload: user
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
var createSessionAsync = function() {
    return function(dispatch) {
        
    }
}

//DESTROY_SESSION_SUCCESS
var DESTROY_SESSION_SUCCESS = 'DESTROY_SESSION_SUCCESS';
var destroySessionSuccess = function(user) {
    return {
        type: DESTROY_SESSION_SUCCESS,
        payload: user
    };
};

//DESTROY_SESSION_ERROR
var DESTROY_SESSION_ERROR = 'DESTROY_SESSION_ERROR';
var destroySessionError = function(error) {
    return {
        type: DESTROY_SESSION_ERROR,
        error: error
    };
};

//destorySessionAsync (log out user)
var destroySessionAsync = function() {
    return function(dispatch) {
        
    }
}




//Is this how to save information to the database?

// var SAVE_FEWEST_GUESSES = SAVE_FEWEST_GUESSES;
// var saveFewestGuesses = function(currentCount) {
//     return function(dispatch){
//         console.log(currentCount);
//     var url='https://redux-michellen.c9users.io/fewest-guesses';
//         fetch(url,{
//             method:'post',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({
//                 currentGuess:currentCount
//             })}).then(function(res){
//             if (res.status < 200 || res.status >= 300) {
//                 var error = new Error(res.statusText)
//                 error.res = res
//                 throw error;
//             }
//             return res;
//         }).then(function(res){
            
//             return res.json();
//         }).then(function(data){
//              console.log( "inside saveFewestGuesses",data);
//             var fewestGuess = data.fewestGuess;
           
//             return dispatch(fetchFewestGuessesSuccess(fewestGuess))
//         })
//         .catch(function(error){
//             return dispatch(fetchFewestGuessesError(error));
//         });
            
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

exports.DESTROY_SESSION_SUCCESS = DESTROY_SESSION_SUCCESS;
exports.destroySessionSuccess = destroySessionSuccess;

exports.DESTROY_SESSION_ERROR = DESTROY_SESSION_ERROR;
exports.destroySessionError = destroySessionError;

exports.destroySessionAsync = destroySessionAsync;