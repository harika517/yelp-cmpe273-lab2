import { GET_USER_PROFILE, USER_PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
    userprofile: null,
    userprofiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                userprofile: payload,
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