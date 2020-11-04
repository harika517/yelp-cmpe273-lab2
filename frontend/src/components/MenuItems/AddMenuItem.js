import React, {Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addMenuItem} from '../../actions/menuitems'
import DashboardNav from '../layout/DashboardNav';

const AddMenuItem = ({addMenuItem, history}) => {

    const [formData, setFormData] = useState({
        itemName: '',
    itemDescription: '',
    itemIngredients: '',
    itemPrice: '',
    itemCategory: ''
    });

    const {
        itemName,
    itemDescription,
    itemIngredients,
    itemPrice,
    itemCategory
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'> 
            <h1 className="text-dark medium">Add Menu Item</h1>
            <form className="form" onSubmit={e=> {
                e.preventDefault();
                addMenuItem(formData, history)
            }}>
            <div className="form-group">
          <label for="itemName">Name</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="itemName"
            placeholder="itemName"
            value={itemName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemDescription">Description</label>
          <br />
          <small className="form-text">Briefly describe you item</small>
          <input
            type="text"
            name="itemDescription"
            placeholder="Description"
            value={itemDescription}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemIngredients">Ingrediants</label>
          <br />
          <small className="form-text">Ingrediants</small>
          <input
            type="text"
            name="itemIngredients"
            value={itemIngredients}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemPrice">Cost</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="itemPrice"
            value={itemPrice}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemCategory">Category</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="itemCategory"
            value={itemCategory}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
        <Link className="btn btn-light my-1" to="/viewmenu">
          Cancel
        </Link>
            </form>
            </div>
        </Fragment>
    )
}

AddMenuItem.propTypes = {
    addMenuItem: PropTypes.func.isRequired,
}

export default connect(null, {addMenuItem})(AddMenuItem)
