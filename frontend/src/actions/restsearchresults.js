import axios from 'axios';
import { setAlert } from './alert';
import {
    REST_SEARCH_RESULTS,
    REST_SEARCH_RESULTS_ERROR,
    GET_REST_PROFILE,
    REST_PROFILE_ERROR,
    GET_ALL_REST_PROFILES
} from './types';


//get Restaurants whose DineIn is yes
export const getRestaurantsDineIn = () => async(dispatch) => {
    try {
        const res = await axios.get('api/search/restaurants/dinein');
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

//get Restaurants whose curbside is yes
export const getRestaurantsCurbSide = () => async(dispatch) => {
    try {
        const res = await axios.get('api/search/restaurants/curbside');
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

//get Restaurants whose yelpdelivery is yes
export const getRestaurantsYelpDelivery = () => async(dispatch) => {
    try {
        const res = await axios.get('api/search/restaurants/yelpdelivery');
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

//get Restaurants by serach criteria names, cuisines, location

export const getRestaurantsSearchCriteria = (word) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/search/restaurants/criteria/${word}`);
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