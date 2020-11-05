import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_MENUITEMS,
    GET_MENUITEMS_ERROR,
    UPDATE_REST_PROFILE,
    REST_PROFILE_ERROR,
    GET_MENUITEM
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

// get meunitems by current customer

export const getCurrentRestMenuItems = () => async(dispatch) => {
    try {
        const res = await axios.get(`/api/restaurant/menuitems`);
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

// add meunitems by current restaurant

export const addMenuItem = (formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.put(
            '/api/restaurant/menuitems',
            formData,
            config
        );
        dispatch({
            type: UPDATE_REST_PROFILE,
            payload: res.data,
        });
        // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
        dispatch(setAlert('Menu Item Added', 'success'));
        // if (!edit) {
        //     history.push('/restdashboard');
        // }
        history.push('/viewmenu');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REST_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// get menuItem by Id

export const getMenuItemById = (menu_id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/restaurant/menuitems/itemdetail/${menu_id}`);
        console.log("after query")
        dispatch({
            type: GET_MENUITEM,
            payload: res.data,
        });
        console.log("after dispatch")
    } catch (err) {
        dispatch({
            type: GET_MENUITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Update Menu Item 
export const updateMenuItem = (menu_id, formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.put(
            `/api/restaurant/menuitems/${menu_id}`,
            formData,
            config
        );
        dispatch({
            type: UPDATE_REST_PROFILE,
            payload: res.data,
        });
        // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
        dispatch(setAlert('Menu Item Updated', 'success'));
        // if (!edit) {
        //     history.push('/restdashboard');
        // }
        history.push('/viewmenu');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REST_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};