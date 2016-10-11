var fetch = require('isomorphic-fetch');

/*

state:
isLoggedIn: false; //once the user is logged in, isLoggedIn = true;
thoughts: [] //needs to get the list of thoughts from the database

*/


//action for random thought
var RANDOM_THOUGHT = 'RANDOM_THOUGHT';
function randomThought() {
    return {
        type: RANDOM_THOUGHT
    };
}

//actions to fetch thoughts (sync)
var FETCH_THOUGHTS_SUCCESS = 'FETCH_THOUGHTS_SUCCESS';
function fetchThoughtsSuccess(thought) {
    return {
        type: FETCH_THOUGHTS_SUCCESS,
        payload: thought
    };
}

var FETCH_THOUGHTS_ERROR = 'FETCH_THOUGHTS_ERROR';
function fetchThoughtsError(error) {
    return {
        type: FETCH_THOUGHTS_ERROR,
        error: error
    };
}

var FETCH_THOUGHTS_REQUEST = 'FETCH_THOUGHTS_REQUEST';
function fetchThoughtsRequest() {
    return {
        type: FETCH_THOUGHTS_REQUEST
    };
}

//action to fetch thought endpoint for API (async)
function fetchThoughts() {
    return function(dispatch) {
        var endpoint = '/thoughts';
        dispatch(fetchThoughtsRequest());
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


exports.RANDOM_THOUGHT = RANDOM_THOUGHT;
exports.randomThought = randomThought;

exports.FETCH_THOUGHTS_SUCCESS = FETCH_THOUGHTS_SUCCESS;
exports.fetchThoughtsSuccess = fetchThoughtsSuccess;

exports.FETCH_THOUGHTS_ERROR = FETCH_THOUGHTS_ERROR;
exports.fetchThoughtsError = fetchThoughtsError;

exports.FETCH_THOUGHTS_REQUEST = FETCH_THOUGHTS_REQUEST;
exports.fetchThoughtsRequest = fetchThoughtsRequest;

exports.fetchThoughts = fetchThoughts;