var fetch = require('isomorphic-fetch');

var SELECT_THOUGHT = 'SELECT_THOUGHT';
function selectThought(thought) {
    return {
        type: SELECT_THOUGHT,
        payload: thought
    };
}

var CHANGE_FEEDBACK= 'CHANGE_FEEDBACK';
var changeFeedback= function(feedback){
    return {
        type:CHANGE_FEEDBACK,
        payload:feedback
    }
}

var EDIT_THOUGHT_SUCCESS='EDIT_THOUGHT_SUCCESS';
var editThoughtSucess=function(){
    return{
        type:EDIT_THOUGHT_SUCCESS
    }
}

var EDIT_THOUGHT_ERROR='EDIT_THOUGHT_ERROR';
var editThoughtError=function(error){
    return{
        type:EDIT_THOUGHT_ERROR,
        error:error
    }
}

var EDITABLE= 'EDITABLE';
var editable=function(key){
    return{
        type:EDITABLE,
        key:key
    }
}


var updateThought= function(thoughtId, newThought, currentUser,stars){
    return function(dispatch) {
        // make PUT request to Api
        var endpoint = '/thoughts/'+thoughtId;
        console.log('in update thought'+thoughtId, newThought, currentUser,stars )
        fetch(endpoint, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                thought: newThought,
                from: currentUser,
                stars:stars
        })})
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    //bad response :(
                    var error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(response => {
                //if success, dispatch 
                console.log(response);
                dispatch(editThoughtSucess());
            })
        .catch(err => {
            //if fail, dispatch 
            console.log(err);
            dispatch(editThoughtError(err));
        });
    };}
    
var deleteThought= function(thoughtId){
    return function(dispatch) {
        // make PUT request to Api
        var endpoint = '/thoughts/'+thoughtId;
        fetch(endpoint, {
            method:'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    //bad response :(
                    var error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(response => {
                //if success, dispatch 
                console.log(response);
                dispatch(editThoughtSucess());
            })
        .catch(err => {
            //if fail, dispatch 
            console.log(err);
            dispatch(editThoughtError(err));
        });
    };}

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
                dispatch(fetchThoughtsSuccess(data));
            })
        .catch(function(error) {
            dispatch(fetchThoughtsError(error));
        });
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
var FETCH_THOUGHT_SUCCESS = 'FETCH_THOUGHT_SUCCESS';
function fetchThoughtSuccess(thought) {
    console.log('inside action',thought);
    return {
        type: FETCH_THOUGHT_SUCCESS,
        payload: thought
    };
}

var FETCH_THOUGHT_ERROR = 'FETCH_THOUGHT_ERROR';
function fetchThoughtError(error) {
    return {
        type: FETCH_THOUGHT_ERROR,
        error: error
    };
}

function fetchThoughtById(thoughtId) {
    return function(dispatch) {
        var endpoint = '/thoughts/thought/'+thoughtId;
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
                dispatch(fetchThoughtSuccess(data));
            })
        .catch(function(error) {
            dispatch(fetchThoughtError(error));
        });
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
                dispatch(fetchThoughtsSuccess(data));
            })
        .catch(function(error) {
            dispatch(fetchThoughtsError(error));
        });
    };
}





//actions to fetch thoughts (sync)
var FETCH_THOUGHTS_SUCCESS_FROM_USER = 'FETCH_THOUGHTS_SUCCESS_FROM_USER';
function fetchThoughtsSuccessFromUser(thoughts) {
    return {
        type: FETCH_THOUGHTS_SUCCESS_FROM_USER,
        payload: thoughts
    };
}

var FETCH_THOUGHTS_ERROR_FROM_USER = 'FETCH_THOUGHTS_ERROR_FROM_USER';
function fetchThoughtsErrorFromUser(error) {
    return {
        type: FETCH_THOUGHTS_ERROR_FROM_USER,
        error: error
    };
}

//action to fetch thought endpoint for API (async)
function fetchThoughtsFromUser(currUser) {
    return function(dispatch) {
        var endpoint = '/thoughts/' + currUser;
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
                console.log(data);
                dispatch(fetchThoughtsSuccessFromUser(data));
            })
        .catch(function(error) {
            dispatch(fetchThoughtsErrorFromUser(error));
        });
    };
}





var ADD_THOUGHT_SUCCESS = 'ADD_THOUGHT_SUCCESS';
var addThoughtSuccess = function(thought){
    return {
        type: ADD_THOUGHT_SUCCESS,
        payload: thought,
        stars: thought.stars
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
                from: currentUser,
                stars: 5
        })})
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    //bad response :(
                    var error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(response => {
                //if success, dispatch addThoughtSuccess(response);
                console.log(response);
                dispatch(addThoughtSuccess(response));
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
var registerUserAsync = function(username, password) {
    return function(dispatch) {
        var endpoint = '/users';
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
                return dispatch(registerUserSuccess());
            })
            
        .catch(err => {
            //if fail, dispatch addThoughtFail(error);
            console.log(err);
            return dispatch(registerUserError(err));
        });
    };
};

var REGISTER_USER_SUCCESS= 'REGISTER_USER_SUCCESS';
var registerUserSuccess= function(){
    return{
        type:REGISTER_USER_SUCCESS
    }
}

var REGISTER_USER_ERROR= 'REGISTER_USER_ERROR';
var registerUserError= function(err){
    return{
        type:REGISTER_USER_ERROR,
        error:err
    }
}



//createSessionAsync (log in user)
var createSessionAsync = function(username, password, login) {
    return function(dispatch) {
        var endpoint = '/users/login';
        return fetch(endpoint, {
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
            }).then(function(){
                login.transitionToHome();
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


exports.CHANGE_FEEDBACK=CHANGE_FEEDBACK;
exports.changeFeedback=changeFeedback;

exports.REGISTER_USER_ERROR = REGISTER_USER_ERROR;
exports.registerUserError=registerUserError;

exports.REGISTER_USER_SUCCESS = REGISTER_USER_SUCCESS;
exports.registerUserSuccess=registerUserSuccess;

exports.registerUserAsync=registerUserAsync;

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

exports.FETCH_THOUGHTS_SUCCESS_FROM_USER = FETCH_THOUGHTS_SUCCESS_FROM_USER;
exports.fetchThoughtsSuccessFromUser = fetchThoughtsSuccessFromUser;

exports.FETCH_THOUGHTS_ERROR_FROM_USER = FETCH_THOUGHTS_ERROR_FROM_USER;
exports.fetchThoughtsErrorFromUser = fetchThoughtsErrorFromUser;

exports.fetchThoughtsFromUser = fetchThoughtsFromUser;

exports.updateThought=updateThought;

exports.EDITABLE=EDITABLE;
exports.editable=editable;

exports.EDIT_THOUGHT_SUCCESS=EDIT_THOUGHT_SUCCESS;
exports.EDIT_THOUGHT_ERROR=EDIT_THOUGHT_ERROR;

exports.deleteThought=deleteThought;
exports.FETCH_THOUGHT_SUCCESS = FETCH_THOUGHT_SUCCESS;
exports.fetchThoughtSuccess = fetchThoughtSuccess;

exports.FETCH_THOUGHT_ERROR = FETCH_THOUGHT_ERROR;
exports.fetchThoughtError = fetchThoughtError;

exports.fetchThoughtById = fetchThoughtById;