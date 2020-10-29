import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_EVENT,
    GET_EVENTS,
    EVENT_ERROR
} from './types';

// Create or update Events by current restaurant

export const createSocialEvent = (formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            '/api/events/restaurant',
            formData,
            config
        );
        dispatch({
            type: GET_EVENT,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
        if (!edit) {
            history.push('/restdashboard');
        }
        history.push('/restdashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Get all the events

export const getAllSocialEvents = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/events');
        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

// Get Eventdetails by event ID

export const getEventDetail = (event_id) => async(dispatch) => {
    // dispatch({ type: CLEAR_EVENT})
    try {
        const res = await axios.get(`/api/events/${event_id}`);
        dispatch({
            type: GET_EVENT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
// Customer registeration for events
//get all the events registered by current customer
//get all the customers registered for an event