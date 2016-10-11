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

//Do I really need these 3 sync functions to get the async function running smoothly? (I feel like I don't need request...)
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


exports.RANDOM_THOUGHT = RANDOM_THOUGHT;
exports.randomThought = randomThought;

exports.FETCH_THOUGHTS_SUCCESS = FETCH_THOUGHTS_SUCCESS;
exports.fetchThoughtsSuccess = fetchThoughtsSuccess;

exports.FETCH_THOUGHTS_ERROR = FETCH_THOUGHTS_ERROR;
exports.fetchThoughtsError = fetchThoughtsError;

exports.fetchThoughts = fetchThoughts;