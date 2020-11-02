import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_ALL_ORDERS,
    GET_ORDERS_ERROR
} from './types';

// Placing Orders

export const placingOrder = (restId, itemId, formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `/api/orders/create/${restId}/${itemId}`,
            formData,
            config
        );
        dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Order Updated' : 'Order Placed', 'success'));
        if (!edit) {
            history.push('/userdashboard');
        }
        history.push('/userdashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// get all the orders raised by current logged in customer

export const getOrderHistory = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/orders/me');
        dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}