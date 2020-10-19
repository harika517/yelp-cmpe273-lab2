import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REST_REGISTER_SUCCESS,
    REST_REGISTER_FAIL,
    USER_LOADED,
    REST_USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REST_LOGIN_SUCCESS,
    REST_LOGIN_FAIL,
    LOGOUT

} from './types';
import setAuthToken from '../utils/setAuthToken'

//Load user 
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Load restaurant user 
export const restLoadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/restauth');
        dispatch({
            type: REST_USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Resgister User
export const register = ({ userName, firstName, lastName, userEmail, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ userName, firstName, lastName, userEmail, password });
    try {
        const res = await axios.post('http://localhost:3001/api/users', body, config);
        console.log("Register/actions", res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }

}

//Login User
export const login = (userEmail, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ userEmail, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }

}

//logout / clear profile

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}

//Resgister Restaurant User
export const restregister = ({ restName, restEmail, restpassword, location }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ restName, restEmail, restpassword, location });
    try {
        const res = await axios.post('/api/restusers', body, config);
        dispatch({
            type: REST_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(restLoadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REST_REGISTER_FAIL
        })
    }

}

//Login Restaurant User
export const restLogin = (restEmail, restpassword) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ restEmail, restpassword });
    try {
        const res = await axios.post('http://localhost:3001/api/restauth', body, config);
        dispatch({
            type: REST_LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(restLoadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REST_LOGIN_FAIL
        })
    }

}