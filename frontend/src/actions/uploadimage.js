import axios from "axios";
import { setAlert } from "./alert";
import { POST_IMAGE, IMAGE_ERROR } from "./types";

//async

const insertImage = (image, Email) => async(dispatch) => {
    console.log('inside insertImage')
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
            .post(`http://3.101.107.33:3001/api/addimages/rest/addprofilepic/`, formData, config)
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

export default insertImage;