import { GET_MESSAGES, SEND_MESSAGE, MESSAGE_ERROR, GET_CONVERSATION } from '../actions/types';

const initialState = {
    converstaion: null,
    message: null,
    messages: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSATION:
            return {
                ...state,
                converstaion: payload,
                loading: false
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            }
        case SEND_MESSAGE:
            return {
                ...state,
                message: payload,
                loading: false
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}