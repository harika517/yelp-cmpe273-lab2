import axios from "axios";
import { setAlert } from "./alert";
import { POST_IMAGE, IMAGE_ERROR } from "./types";

//async

const insertRestImage = (image, RestName) => async(dispatch) => {
    console.log('inside insertRestImage')
    try {
        console.log("inside insertRestImage action, image is ", image);
        console.log("inside insertRestImage action, RestName is", RestName)
        let formData = new FormData();
        formData.append("image", image);
        formData.append("RestName", RestName)
            //formData.append("RestName",RestName)
        console.log("inside insertRestImage action, formData content is", formData.get("image"), formData.get("RestName"))
            //console.log("inside insertImage action, formData is ", formData); // formData is not console loggable
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const res = await axios
            .post(`http://54.183.189.222:3001/api/addrestimages/${RestName}`, formData, config)
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

export default insertRestImage;