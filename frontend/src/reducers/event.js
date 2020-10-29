import { GET_EVENT, GET_EVENTS, EVENT_ERROR } from '../actions/types';

const initialState = {
    socialevent: null,
    socialevents: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EVENT:
            return {
                ...state,
                socialevent: payload,
                loading: false
            }
        case GET_EVENTS:
            return {
                ...state,
                socialevents: payload,
                loading: false
            }
        case EVENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}