import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_REST_PROFILE,
    REST_PROFILE_ERROR
} from './types';

// Get current restaurant profile

export const getCurrentRestProfile = () => async(dispatch) => {
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

//create or update profile
export const createRestProfile = (formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            '/api/restprofile?',
            formData,
            config
        );
        dispatch({
            type: GET_REST_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
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
            type: REST_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//edit profile
// export const editProfile = (formData, history, edit = false) => async(
//     dispatch
// ) => {
//     try {
//         const config = {
//             headers: { 'Content-Type': 'application/json' },
//         };
//         const res = await axios.post(
//             'http://54.215.250.62:3002/customer/profile/updateprofile/me',
//             formData,
//             config
//         );
//         dispatch({
//             type: GET_PROFILE,
//             payload: res.data,
//         });
//         dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Updated', 'success'));
//         if (!edit) {
//             history.push('/dashboard');
//         }
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }
//         dispatch({
//             type: PROFILE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };