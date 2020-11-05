import React, { Fragment, useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getMenuItemById, updateMenuItem} from '../../actions/menuitems'

const EditMenuItem = ({getMenuItemById, updateMenuItem, menuitem :{menuitem , loading}, history, match}) => {

    const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemIngredients: '',
    itemPrice: '',
    itemCategory: ''
    });

    useEffect(()=>{
        getMenuItemById(match.params.menu_id)
        setFormData({
            itemName: loading || !menuitem.itemName ? '': menuitem.itemName,
            itemDescription: loading || !menuitem.itemDescription ? '': menuitem.itemDescription,
            itemIngredients: loading || !menuitem.itemIngredients ? '': menuitem.itemIngredients,
            itemPrice: loading || !menuitem.itemPrice ? '': menuitem.itemPrice,
            itemCategory: loading || !menuitem.itemCategory ? '': menuitem.itemCategory,
        })
    }, [loading])

    const {
        itemName,
        itemDescription,
        itemIngredients,
        itemPrice,
        itemCategory,
      } = formData;

    console.log(match.params.menu_id)

    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      updateMenuItem(match.params.menu_id, formData, history, true);
    };

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'> 
            <h1 className="text-dark medium">Update Menu Item</h1>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
          <label for="itemName">Item Name</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemDescription">Item Description</label>
          <br />
          <input
            type="text"
            name="itemDescription"
            value={itemDescription}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemIngredients">Ingredients</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="itemIngredients"
            value={itemIngredients}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="itemPrice">Price</label>
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

EditMenuItem.propTypes = {
    getMenuItemById: PropTypes.func.isRequired,
    updateMenuItem: PropTypes.func.isRequired,
    menuitem: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    menuitem: state.menuitem
   })

export default connect(mapStateToProps, {getMenuItemById, updateMenuItem})(EditMenuItem)
