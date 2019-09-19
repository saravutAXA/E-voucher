// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
    SCOPE,
    GRANT_TYPE,
    CLIENT_ID,
    CLIENT_SECRET
} from '../../constants/actionTypes';


import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
    forgetAccessToken
} from './actions';
import axios from 'axios';

const gobleURL = 'http://10.16.201.17';

/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { 
                throw error 
        });
}


/**
 * Sets the session
 * @param {*} user 
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user)
        cookies.set("user", JSON.stringify(user), { path: "/" });
    else
        cookies.remove("user");
};

const setSessionToken = (token) => {
    let cookies = new Cookies();
    // if (token)
        cookies.set("token", JSON.stringify(token), { path: "/" });
    // else
    //     cookies.remove("token");
};

/**
 * Sets the session
 * @param {*} token 
 */ 
const  getToken = () => {
    // const options = {
    //     body: JSON.stringify({ scope: SCOPE,
    //         grant_type: GRANT_TYPE,
    //         client_id: CLIENT_ID,
    //         client_secret:CLIENT_SECRET}),
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' }
    // };
    let realFetch = window.fetch;
    

    // let cookies = new Cookies();

    // wrap in timeout to simulate server api call
    // axios.get('https://jsonplaceholder.typicode.com/users', {withCredentials: true})
    // .then(function (response) {
    //     console.log(response.data);
    //     // let accesstoken = JSON.parse(response.data);
    //     // cookies.set("token", response.data, { path: "/" });
    //     setSessionToken(response.data);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    return new Promise((resolve, reject) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {            
            // authenticate
            const options = {
                scope : 'promotion',
                grant_type : 'client_credentials',
                client_id : 'promotion.dev',
                client_secret : 'dM7CBvnrgbMKQUPasgRZLTzsG61PMJT9LHQ5wZ4v'
            };
            axios.post('http://localhost:51323/api/Values',{value : "5"})
            .then(function (response) {
                console.log(response.data);
                // let accesstoken = JSON.parse(response.data);
                // cookies.set("token", response.data, { path: "/" });
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

            // pass through any requests not handled above
            // realFetch('http://10.16.201.17/identityserver/connect/token', options).then(response => resolve(response));

        }, 100);
    });
    
    
    
    // axios.get('https://jsonplaceholder.typicode.com/users', {withCredentials: true});
    


    // axios.post(gobleURL +""+ url, {
    //     scope: 'promotion',
    //     grant_type: 'client_credentials',
    //     client_id: 'promotion.dev',
    //     client_secret: 'dM7CBvnrgbMKQUPasgRZLTzsG61PMJT9LHQ5wZ4v'
    // })
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    // return ;
    // return fetch(gobleURL +""+ url, options)
    //     .then(response => {
    //         if (!response.status === 200) {
    //             throw response.json();
    //         }
    //         return response.json();
    //     })
    //     .then(json => {
    //         return json;
    //     })
    //     .catch(error => { 
    //             throw error 
    //     });
};



/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password } }) {
    const options = {
        body: JSON.stringify({ username, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };


    try {
        // const responseToken = yield call(getToken, '/identityserver/connect/token');

        // const responseToken = yield call(forgetAccessToken, 'promotion','client_credentials','promotion.dev','dM7CBvnrgbMKQUPasgRZLTzsG61PMJT9LHQ5wZ4v');
        // setSessionToken(responseToken);
        const response = yield call(fetchJSON, '/users/authenticate', options);
        setSession(response);
        yield put(loginUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        setSessionToken(null)
        yield call(() => {
            history.push("/login");
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
    const options = {
        body: JSON.stringify({ fullname, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = yield call(fetchJSON, '/users/register', options);
        yield put(registerUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}


export function* watchLoginUser():any {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser():any {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser():any {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword():any {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga():any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;