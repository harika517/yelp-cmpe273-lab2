import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REST_REGISTER_SUCCESS,
    REST_REGISTER_FAIL,
    REST_USER_LOADED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REST_LOGIN_SUCCESS,
    REST_LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
        case REST_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case REST_REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case REST_LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case REST_REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REST_LOGIN_FAIL:
        case LOGOUT:
            console.log("123456")
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }
}