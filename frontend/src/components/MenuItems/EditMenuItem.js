import React, { Fragment, useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getMenuItemById} from '../../actions/menuitems'

const EditMenuItem = ({getMenuItemById, menuitem: {loading}, match}) => {

    // const [formData, setFormData] = useState({
    //     itemName: '',
    // itemDescription: '',
    // itemIngredients: '',
    // itemPrice: '',
    // itemCategory: ''
    // });

    useEffect(()=>{
        getMenuItemById(match.params.menu_id)
    }, [loading])


   

    console.log(match.params.menu_id)
    return (
        <Fragment>
            <DashboardNav/>
<div>
            Edit Menu Item form
        </div>
        </Fragment>
        
    )
}

EditMenuItem.propTypes = {
    getMenuItemById: PropTypes.func.isRequired,
    menuitem: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    menuitem: state.menuitem
   })

export default connect(mapStateToProps, {getMenuItemById})(EditMenuItem)
