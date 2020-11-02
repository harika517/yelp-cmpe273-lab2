import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {placingOrder} from '../../actions/orders'

const PlaceOrder = ({placingOrder, match}) => {
    // const [formData, setFormData] = useState({
    //     userId: '',
    //     restId: '',
    //     menuId: '',
    //     Quantiy: '',
    //     deliveryMethod: '',
    //     orderStatus: ''
    //   });

    //   useEffect(() => {
    //     setFormData({
    //       //Cust_Name: loading || !profile.Cust_Name ? '' : profile.Cust_Name,
    //       // Rest_Name: loading || !menuitem[0].Rest_Name ? '' : menuitem[0].Rest_Name,
    //       item_name: loading || !menuitem[0].item_name ? '' : menuitem[0].item_name,
    //       Rest_email_id:
    //         loading || !menuitem[0].Rest_email_id ? '' : menuitem[0].Rest_email_id,
    //     });
    //   }, [loading]);

//       const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     placingOrder(match.params.restId, match.params.itemId, formData);
//   };

//   <Fragment>
//       <form className="form" onSubmit={(e) => onSubmit(e)}>
//         <div className="form-group">
//           <label for="Cust_Name">Name</label>
//           <small className="form-text">This field is required.</small>
//           <input
//             type="text"
//             name="Cust_Name"
//             value={Cust_Name}
//             onChange={(e) => onChange(e)}
//           />
//         </div>
//         <div className="form-group">
//           <label for="Rest_email_id">Restaurant Contact</label>
//           <small className="form-text">This field is required.</small>
//           <input
//             type="text"
//             name="Rest_email_id"
//             value={Rest_email_id}
//             //onChange={(e) => onChange(e)}
//           />
//         </div>
//         </form>
//         </Fragment>

    return (
        <div>
            place order form
        </div>
    )
}

PlaceOrder.propTypes = {

}

export default PlaceOrder
