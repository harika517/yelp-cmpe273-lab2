import { REST_SEARCH_RESULTS, REST_SEARCH_RESULTS_ERROR } from '../actions/types';

const initialState = {
    restsearchresults: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case REST_SEARCH_RESULTS:
            return {
                ...state,
                restsearchresults: payload,
                loading: false
            }

        case REST_SEARCH_RESULTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}