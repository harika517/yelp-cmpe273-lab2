import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_USER_PROFILE,
    USER_PROFILE_ERROR
} from './types';

// Get current restaurant profile

export const getCurrentUserProfile = () => async(dispatch) => {
    try {
        const res = await axios.get('api/profile/me');
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: USER_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}