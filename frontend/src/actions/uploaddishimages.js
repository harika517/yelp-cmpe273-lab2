import axios from "axios";
import { setAlert } from "./alert";
import { POST_IMAGE, IMAGE_ERROR } from "./types";

//async

const insertDishImage = (image, itemName) => async(dispatch) => {
    console.log('inside insertDishImage')
    try {
        console.log("inside insertDishImage action, image is ", image);
        console.log("inside insertDishImage action, itemName is", itemName)
        let formData = new FormData();
        formData.append("image", image);
        //formData.append("DishName", itemName)
        //formData.append("RestName",RestName)
        console.log("inside insertDishImage action, formData content is", formData.get("image")) //, formData.get("DishName"))
            //console.log("inside insertImage action, formData is ", formData); // formData is not console loggable
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const res = await axios
            .post(`http://54.183.189.222:3001/api/adddishimages/${itemName}`, formData, config)
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

export default insertDishImage;