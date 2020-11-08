import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_REST_PROFILE,
    REST_PROFILE_ERROR,
    GET_ALL_REST_PROFILES
} from './types';

// Get current restaurant profile

export const getCurrentRestProfile = () => async(dispatch) => {
    console.log("inside get current rest profile")
    try {
        console.log("before query")
        const res = await axios.get('/api/restprofile/me');
        console.log("after query")
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
            '/api/restprofile',
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

// get all the restaurant profiles


export const getAllRestProfiles = () => async(dispatch) => {
    try {
        const res = await axios.get('api/restprofile');
        dispatch({
            type: GET_ALL_REST_PROFILES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: REST_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Write reviews 
export const writeReview = (restuser_id, formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.put(
            `/api/reviews/customer/${restuser_id}`,
            formData,
            config
        );
        dispatch({
            type: GET_REST_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Review Updated' : 'Review Added', 'success'));
        if (!edit) {
            history.push('/restaurantspage');
        }
        history.push('/restaurantspage');
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

// get restaurant profile by Id
export const getRestProfilebyId = (rest_id) => async(dispatch) => {
    // dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get(`/api/restprofile/restaurant/${rest_id}`);
        dispatch({
            type: GET_REST_PROFILE,
            payload: res.data,
        });
    } catch (err) {
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