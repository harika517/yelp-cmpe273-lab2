import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_MENUITEMS,
    GET_MENUITEMS_ERROR
} from './types';

// get meunitems by id

export const getMenuItemsByRestID = (rest_id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/restaurant/menuitems/${rest_id}`);
        dispatch({
            type: GET_MENUITEMS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_MENUITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};