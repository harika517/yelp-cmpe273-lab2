import { GET_EVENT, GET_EVENTS, EVENT_ERROR, REGISTERED_EVENTS, SEARCH_EVENTS, VIEW_ATTENDEES } from '../actions/types';

const initialState = {
    socialevent: null,
    socialevents: [],
    registeredevents: [],
    searcheevnts: [],
    viewattendees: [],
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
        case REGISTERED_EVENTS:
            return {
                ...state,
                registeredevents: payload,
                loading: false
            }
        case SEARCH_EVENTS:
            return {
                ...state,
                searcheevnts: payload,
                loading: false
            }
        case VIEW_ATTENDEES:
            return {
                ...state,
                viewattendees: payload,
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