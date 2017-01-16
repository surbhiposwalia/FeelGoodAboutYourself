const fetch = require('isomorphic-fetch');

const SELECT_THOUGHT = 'SELECT_THOUGHT';
function selectThought(thought) {
    return {
        type: SELECT_THOUGHT,
        payload: thought
    };
}

const CHANGE_FEEDBACK= 'CHANGE_FEEDBACK';
const changeFeedback= function(feedback){
    return {
        type:CHANGE_FEEDBACK,
        payload:feedback
    }
}

const EDIT_THOUGHT_SUCCESS='EDIT_THOUGHT_SUCCESS';
const editThoughtSucess=function(){
    return{
        type:EDIT_THOUGHT_SUCCESS
    }
}

const EDIT_THOUGHT_ERROR='EDIT_THOUGHT_ERROR';
const editThoughtError=function(error){
    return{
        type:EDIT_THOUGHT_ERROR,
        error:error
    }
}

const EDITABLE= 'EDITABLE';
const editable=function(key){
    return{
        type:EDITABLE,
        key:key
    }
}

const FETCH_THOUGHTS_SUCCESS_FROM_USER = 'FETCH_THOUGHTS_SUCCESS_FROM_USER';
function fetchThoughtsSuccessFromUser(thoughts) {
    return {
        type: FETCH_THOUGHTS_SUCCESS_FROM_USER,
        payload: thoughts
    };
}

const FETCH_THOUGHTS_ERROR_FROM_USER = 'FETCH_THOUGHTS_ERROR_FROM_USER';
function fetchThoughtsErrorFromUser(error) {
    return {
        type: FETCH_THOUGHTS_ERROR_FROM_USER,
        error: error
    };
}

const FETCH_THOUGHTS_SUCCESS = 'FETCH_THOUGHTS_SUCCESS';
function fetchThoughtsSuccess(thoughts) {
    return {
        type: FETCH_THOUGHTS_SUCCESS,
        payload: thoughts
    };
}

const FETCH_THOUGHTS_ERROR = 'FETCH_THOUGHTS_ERROR';
function fetchThoughtsError(error) {
    return {
        type: FETCH_THOUGHTS_ERROR,
        error: error
    };
}
const FETCH_THOUGHT_SUCCESS = 'FETCH_THOUGHT_SUCCESS';
function fetchThoughtSuccess(thought) {
    return {
        type: FETCH_THOUGHT_SUCCESS,
        payload: thought
    };
}

const FETCH_THOUGHT_ERROR = 'FETCH_THOUGHT_ERROR';
function fetchThoughtError(error) {
    return {
        type: FETCH_THOUGHT_ERROR,
        error: error
    };
}

const ADD_THOUGHT_SUCCESS = 'ADD_THOUGHT_SUCCESS';
const addThoughtSuccess = function(thought){
    return {
        type: ADD_THOUGHT_SUCCESS,
        payload: thought,
        stars: thought.stars
    };
};

const ADD_THOUGHT_ERROR = 'ADD_THOUGHT_ERROR';
const addThoughtError = function(error){
    return {
        type: ADD_THOUGHT_ERROR,
        error: error
    };
};

const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
const createSessionSuccess = function(username) {
    return {
        type: CREATE_SESSION_SUCCESS,
        payload: username
    };
};


const CREATE_SESSION_ERROR = 'CREATE_SESSION_ERROR';
const createSessionError = function(error) {
    return {
        type: CREATE_SESSION_ERROR,
        error: error
    };
};

const REGISTER_USER_SUCCESS= 'REGISTER_USER_SUCCESS';
const registerUserSuccess= function(){
    return{
        type:REGISTER_USER_SUCCESS
    }
}

const REGISTER_USER_ERROR= 'REGISTER_USER_ERROR';
const registerUserError= function(err){
    return{
        type:REGISTER_USER_ERROR,
        error:err
    }
}

const updateThought= function(thoughtId, newThought, currentUser,stars){
    return function(dispatch) {
        const endpoint = '/thoughts/'+thoughtId;
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
                if(res.status < 200 || res.status >= 300){
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(response => {
                dispatch(editThoughtSucess());
            })
        .catch(err => {
            dispatch(editThoughtError(err));
        });
    };}
    
const deleteThought= function(thoughtId){
    return function(dispatch) {
        const endpoint = '/thoughts/'+thoughtId;
        fetch(endpoint, {
            method:'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(response => {
                dispatch(editThoughtSucess());
            })
        .catch(err => {
            dispatch(editThoughtError(err));
        });
    };}

function fetchThoughts() {
    return function(dispatch) {
        const endpoint = '/thoughts';
        return fetch(endpoint)
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    const error = new Error(res.statusText);
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



function fetchThoughtById(thoughtId) {
    return function(dispatch) {
        const endpoint = '/thoughts/thought/'+thoughtId;
        return fetch(endpoint)
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    const error = new Error(res.statusText);
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

function fetchThoughts() {
    return function(dispatch) {
        const endpoint = '/thoughts';
        return fetch(endpoint)
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    const error = new Error(res.statusText);
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


function fetchThoughtsFromUser(currUser) {
    return function(dispatch) {
        const endpoint = '/thoughts/' + currUser;
        return fetch(endpoint)
            .then(function(res) {
                if(res.status < 200 || res.status >= 300) {
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(function(data) {
                dispatch(fetchThoughtsSuccessFromUser(data));
            })
        .catch(function(error) {
            dispatch(fetchThoughtsErrorFromUser(error));
        });
    };
}

const addThoughtAsync = function(thought, currentUser){
    return function(dispatch) {
        const endpoint = '/thoughts';
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
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                return res.json();
            })
            .then(response => {
                dispatch(addThoughtSuccess(response));
            })
        .catch(err => {
            dispatch(addThoughtError(err));
        });
    };
};

const registerUserAsync = function(username, password) {
    return function(dispatch) {
        const endpoint = '/users';
        fetch(endpoint, {
            method:'post',
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
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                res = res.json();
            })
            .then(response => {
                return dispatch(registerUserSuccess());
            })
            
        .catch(err => {
            console.log(err);
            return dispatch(registerUserError(err));
        });
    };
};

const createSessionAsync = function(username, password, login) {
    return function(dispatch) {
        const endpoint = '/users/login';
        return fetch(endpoint, {
            method:'post',
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
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
                res = res.json();
            })
            .then(response => {
                return dispatch(createSessionSuccess(username));
            }).then(function(){
                login.transitionToHome();
            })
        .catch(err => {
            return dispatch(createSessionError(err));
        });
    };
};

const DESTROY_SESSION = 'DESTROY_SESSION';
const destroySession = function() {
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