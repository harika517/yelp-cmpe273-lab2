import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';


//Resgister User
export const register = ({ userName, firstName, lastName, userEmail, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ userName, firstName, lastName, userEmail, password });
    try {
        const res = await axios.post('http://localhost:3001/api/users', body, config);
        console.log("Register/actions", res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }

}