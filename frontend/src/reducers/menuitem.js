import { GET_MENUITEM, GET_MENUITEMS, GET_MENUITEMS_ERROR } from '../actions/types';

const initialState = {
    menuitem: null,
    menuitems: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MENUITEMS:
            return {
                ...state,
                menuitems: payload,
                loading: false
            }
        case GET_MENUITEM:
            return {
                ...state,
                menuitem: payload,
                loading: false
            }
        case GET_MENUITEMS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}