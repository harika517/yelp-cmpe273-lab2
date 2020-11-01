import { GET_ALL_ORDERS, GET_ORDERS_ERROR } from '../actions/types';

const initialState = {
    ordersplaced: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_ORDERS:
            return {
                ...state,
                ordersplaced: payload,
                loading: false
            }
        case GET_ORDERS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}