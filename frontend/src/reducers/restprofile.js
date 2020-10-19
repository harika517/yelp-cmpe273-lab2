import { GET_REST_PROFILE, REST_PROFILE_ERROR } from '../actions/types';

const initialState = {
    restprofile: null,
    restprofiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_REST_PROFILE:
            return {
                ...state,
                restprofile: payload,
                loading: false
            }
        case REST_PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}