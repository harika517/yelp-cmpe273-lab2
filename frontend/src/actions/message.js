import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_MESSAGES,
    SEND_MESSAGE,
    MESSAGE_ERROR,
    GET_CONVERSATION
} from './types';

// start the conversation
export const startConversation = (user_id, formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `/api/chat/conversation/${user_id}`,
            formData,
            config
        );
        dispatch({
            type: GET_CONVERSATION,
            payload: res.data,
        });
        // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
        // dispatch(setAlert('Menu Item Added', 'success'));
        // if (!edit) {
        //     history.push('/restdashboard');
        // }
        // history.push('/viewmenu');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Restaurant send message

// export const restSendMsg = (user_id, formData) => async(
//     dispatch
// ) => {
//     console.log("inside action")
//     try {
//         const config = {
//             headers: { 'Content-Type': 'application/json' },
//         };
//         console.log("before axios")
//         const res = await axios.put(
//             `/api/chat/message/${user_id}`,
//             formData,
//             config
//         );
//         console.log("after axios")
//         dispatch({
//             type: SEND_MESSAGE,
//             payload: res.data,
//         });
//         // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
//         dispatch(setAlert('Message sent successfully', 'success'));
//         // if (!edit) {
//         //     history.push('/restdashboard');
//         // }
//         // history.push('/viewmenu');
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }
//         dispatch({
//             type: MESSAGE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };

// User send message

// export const userSendMsg = (rest_id, formData, history) => async(
//     dispatch
// ) => {
//     try {
//         const config = {
//             headers: { 'Content-Type': 'application/json' },
//         };
//         const res = await axios.put(
//             `/api/chat/usermessage/${rest_id}`,
//             formData,
//             config
//         );
//         dispatch({
//             type: SEND_MESSAGE,
//             payload: res.data,
//         });
//         // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
//         dispatch(setAlert('Message sent successfully', 'success'));
//         // if (!edit) {
//         //     history.push('/restdashboard');
//         // }
//         // history.push('/viewmenu');
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }
//         dispatch({
//             type: MESSAGE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };

// Get all the conversations

export const getAllConversations = () => async(dispatch) => {
    try {
        const res = await axios.get(`/api/chat`);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Get conversations from logged in rest to a particular user

export const getRestConversationsByUserID = (user_Id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/chat/conversation/${user_Id}`);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Get all conversations of logged in customer 

export const getUserConversations = () => async(dispatch) => {
    try {
        const res = await axios.get(`/api/chat/userconversation`);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// User reply

export const updateUserReponse = (msg_id, formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("Inside Try")
        console.log("inside try, message id is", msg_id)
        console.log("inside try, formData is", formData)
        const res = await axios.put(
            `/api/chat/user/${msg_id}`,
            formData,
            config
        );
        // console.log("Form Data message is", formData.get('message'))
        // console.log("Form Data from is", formData.get('from'))
        // console.log("Form Data to is", formData.get('to'))
        dispatch({
            type: SEND_MESSAGE,
            payload: res.data,
        });
        // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
        dispatch(setAlert('Message Sent', 'success'));
        // if (!edit) {
        //     history.push('/restdashboard');
        // }
        //history.push('/userdashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// get conversation by converstaion ID

export const getConversationById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/chat/${id}`);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const updateRestReponse = (msg_id, formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("Inside Try")
        console.log("inside try, message id is", msg_id)
        console.log("inside try, formData is", formData)
        const res = await axios.put(
            `/api/chat/rest/${msg_id}`,
            formData,
            config
        );
        // console.log("Form Data message is", formData.get('message'))
        // console.log("Form Data from is", formData.get('from'))
        // console.log("Form Data to is", formData.get('to'))

        dispatch({
            type: SEND_MESSAGE,
            payload: res.data,
        });
        // dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));
        dispatch(setAlert('Message Sent', 'success'));
        // if (!edit) {
        //     history.push('/restdashboard');
        // }
        //history.push('/userdashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};