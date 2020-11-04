import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_EVENT,
    GET_EVENTS,
    EVENT_ERROR,
    REGISTERED_EVENTS,
    SEARCH_EVENTS,
    VIEW_ATTENDEES
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

export const eventRegistration = (event_id) => {
    // dispatch({ type: CLEAR_EVENT})
    console.log("event registration", event_id)
    try {
        const res = axios.put(`/api/events/user/${event_id}`);
        console.log("Event Registration", res)
            // dispatch(setAlert('Event Registered', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => (setAlert(error.msg, 'danger')));
        }
    }
};

//get all the events registered by current customer

export const getEventsRegistered = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/events/user/me');
        dispatch({
            type: REGISTERED_EVENTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

//get all the events search by word

export const getEventsBySearch = (word) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/events/searchevent/${word}`);
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
//get all the customers registered for an event
export const getCustomersRegistered = (event_id) => async(dispatch) => {
    // dispatch({ type: CLEAR_EVENT})
    try {
        const res = await axios.get(`/api/events/restaurant/${event_id}`);
        dispatch({
            type: VIEW_ATTENDEES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};