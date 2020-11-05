import { GET_ALL_ORDERS, GET_ORDERS_ERROR, CLEAR_ORDERS, UPDATE_ORDER, GET_ORDER } from '../actions/types';

const initialState = {
    order: null,
    ordersplaced: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_ORDER:
        case GET_ORDER:
            return {
                ...state,
                order: payload,
                loading: false
            }
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
        case CLEAR_ORDERS:
            return {
                ...state,
                ordersplaced: null,
                loading: false
            }
        default:
            return state;
    }
}