import axios from "axios";
import { setAlert } from "./alert";
import { POST_IMAGE, IMAGE_ERROR } from "./types";

const insertUserImage = (image, Email) => async(dispatch) => {
    console.log('inside insertUserImage')
    try {
        console.log("inside insertImage action, image is ", image);
        console.log("inside insertImage action, Email is", Email);
        let formData = new FormData();
        console.log("inside insertImage action, before append, formData is", formData)
        formData.append("image", image);
        formData.append("Email", Email);
        console.log("inside insertImage action, formData content is", formData.get("image"), formData.get("Email"))
            //console.log("inside insertImage action, formData is ", formData); // formData is not console loggable
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const res = await axios
            .post(`http://localhost:3001/api/useraddimages/user/addprofilepic/`, formData, config)
            .then((response) => {
                alert("Image uploaded successfully");
                console.log("response is ", response);
            });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export default insertUserImage;