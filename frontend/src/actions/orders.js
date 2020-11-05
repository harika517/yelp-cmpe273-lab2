import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_ALL_ORDERS,
    GET_ORDERS_ERROR,
    CLEAR_ORDERS,
    UPDATE_ORDER,
    GET_ORDER,
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

// get the orders filtered by orderStatus - Users

export const getOrdersByOrderStatusUsers = (order_status) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/orders/me/${order_status}`);
        dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// get all the orders raised by current logged in customer

export const getRestaurantOrders = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/orders/restaurant');
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

// get the orders filtered by orderStatus - Restaurants

export const getOrdersByOrderStatusRest = (order_status) => async(dispatch) => {
    // dispatch({ type: CLEAR_ORDERS })
    try {
        const res = await axios.get(`/api/orders/restaurant/${order_status}`);
        dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Updating Order

export const updateOrderStatus = (order_id, formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `/api/orders/restaurant/updateorder/${order_id}`,
            formData,
            config
        );
        dispatch({
            type: UPDATE_ORDER,
            payload: res.data,
        });
        dispatch(setAlert('OrderStatus Updated', 'success'));
        history.push('/restaurantorders');
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

// Get Order by OrderId

export const getOrderByOrderId = (order_id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/orders/restaurant/updateorder/${order_id}`);
        dispatch({
            type: GET_ORDER,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}