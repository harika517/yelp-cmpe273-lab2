import React, {Fragment, useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {placingOrder} from '../../actions/orders'


const PlaceOrder = ({placingOrder, auth:{user}, match, history}) => {

    const [formData, setFormData] = useState({
        userId: user._id,
        restId: match.params.rest_id,
        menuId: match.params.item_id,
        Quantiy: '',
        deliveryMethod: '',
        // orderStatus: ''
      });

      const {
        Quantiy,
        deliveryMethod,
      } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    placingOrder(match.params.rest_id, match.params.item_id, formData, history);
  };

   

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'> 
            <h1 className="text-dark medium">Place Order</h1>
     <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
           <label for="Quantiy">Quantiy</label>
           <small className="form-text">This field is required.</small>
           <input
             type="text"
             name="Quantiy"
             pattern="[0-9]{1}"
             title="Please Enter one digit number only"
             value={Quantiy}
             onChange={(e) => onChange(e)}
           />
                    </div>
         <div className="form-group">
         <div>
            <label for="deliveryMethod">Choose Delivery Method</label>
            {' '}
  <select name="deliveryMethod" className="btn btn-light"
                value={deliveryMethod}
                onChange={(e) => onChange(e)}>
    <option>Choose one..</option>
    <option value="Delivery">Delivery</option>
    <option value="Pick Up">Pick Up</option>
  </select>
            </div>
           
         </div>
         <input type="submit" className="btn btn-dark my-1" value="Submit"/>
        <Link className="btn btn-light my-1" to="/userdashboard">
          Cancel
        </Link>
         </form>
         </div>
         </Fragment>
    )
}

PlaceOrder.propTypes = {
    placingOrder: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, {placingOrder})(withRouter(PlaceOrder))
