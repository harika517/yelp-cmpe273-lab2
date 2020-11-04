import {
    GET_USER_PROFILE,
    USER_PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_USER_PROFILES,
    SEARCH_USERS_NAME,
    UPDATE_FOLLOWING,
    GET_YELPUSER_PROFILE
} from '../actions/types';

const initialState = {
    yelpuser: null,
    userprofile: null,
    userprofiles: [],
    usersearchresults: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_YELPUSER_PROFILE:
            return {
                ...state,
                yelpuser: payload,
                loading: false
            }
        case GET_USER_PROFILE:
        case UPDATE_FOLLOWING:
            return {
                ...state,
                userprofile: payload,
                loading: false
            }
        case GET_USER_PROFILES:
            return {
                ...state,
                userprofiles: payload,
                loading: false
            }
        case SEARCH_USERS_NAME:
            return {
                ...state,
                usersearchresults: payload,
                loading: false
            }
        case USER_PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                userprofile: null,
                loading: false
            }
        default:
            return state;
    }
}