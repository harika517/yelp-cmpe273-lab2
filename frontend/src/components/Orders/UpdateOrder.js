import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import DashboardNav from '../layout/DashboardNav';
import {updateOrderStatus, getOrderByOrderId} from '../../actions/orders'
import Spinner from '../layout/spinner';

const UpdateOrder = ({updateOrderStatus, getOrderByOrderId, orders:{order, loading}, match , history}) => {

    const [formData, setFormData] = useState({
     orderStatus: ''
      });

    useEffect(()=>{
        getOrderByOrderId(match.params.id)
        setFormData({
            orderStatus: loading || !order.orderStatus ? '': order.orderStatus,
            // deliveryMethod: loading || !order.deliveryMethod ? '': order.deliveryMethod,
        })
    }, [loading])

    const {
        orderStatus
      } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      updateOrderStatus(match.params.id, formData, history);
    };
    return (
        loading && order === null? <Spinner /> : 
        <Fragment>
            <DashboardNav/>
            <div className='container'>
            <div className="container_2columns">
            <div className="column1">
            
            </div>
            </div>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
            {/* <div className="form-group">
                <label for="deliveryMethod">Delivery Method</label>
                <br />
                {order? (<input type="text" name="deliveryMethod" value={order.deliveryMethod}/>) : "none"}
            </div> */}
            <div>
                 <label for="orderStatus">Update Order Status</label>{' '}
                 <select name="orderStatus" className="btn btn-light" name="orderStatus" 
                 value={orderStatus} onChange={(e) => onChange(e)}>
                     <option>Select One...</option>
                         <option value="Order received">Order received</option>
                         <option value="Preparing">Preparing</option>
                         <option value="On the way">On the way</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Pick up ready">Pick up ready</option>
                         <option value="Picked up">Picked up</option>
                        <option value="Cancelled">Cancelled</option>
                 </select>
                 <br/>
                <button className="btn btn-dark"> Go </button>
            </div>
            </form>
            </div>
            </Fragment>
    )
}

UpdateOrder.propTypes = {
    updateOrderStatus: PropTypes.func.isRequired,
    getOrderByOrderId: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    orders: state.orders
})

export default connect(mapStateToProps, {updateOrderStatus,getOrderByOrderId })(UpdateOrder)
