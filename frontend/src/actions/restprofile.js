import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_REST_PROFILE,
    REST_PROFILE_ERROR
} from './types';

// Get current restaurant profile

export const getCurrentRestProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/restprofile/me');
        dispatch({
            type: GET_REST_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: REST_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}