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

//create or update profile
export const createUserProfile = (formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            'api/profile',
            formData,
            config
        );
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
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
            type: USER_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};