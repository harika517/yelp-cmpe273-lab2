import { POST_IMAGE, IMAGE_ERROR } from '../actions/types';

const initialState = {
    image: null,
    images: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_IMAGE:
            return {
                ...state,
                image: payload,
                loading: false,
            };
            // case POST_IMAGE:
            //     return {
            //         ...state,
            //         images: payload,
            //         loading: false,
            //     };
        case IMAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}