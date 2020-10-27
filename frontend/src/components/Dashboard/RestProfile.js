import React, { Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createRestProfile} from '../../actions/restprofile'

const RestProfile = ({createRestProfile, history}) => {
    const [formData, setFormData] = useState({
        description: '',
        contact: '',
        timings: '',
        cuisine: '',
        DineIn: '',
        curbSidePickUp: '',
        yelpDelivery: '',
      });
    
      const {
        description,
        contact,
        timings,
        cuisine,
        DineIn,
        curbSidePickUp,
        yelpDelivery,
      } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      createRestProfile(formData, history);
    };

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'>     
      <h1 className="text-dark medium">Create Profile</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        
        <div className="form-group">
          <label for="Contact">Contact</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <small className="form-text">
            Describe your restaurant in few words.
          </small>
          <textarea
            rows="4"
            cols="50"
            type="text"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          >
          </textarea>
        </div>

        <div className="form-group">
          <label for="Timings">Timings</label>
          <br />
          <small className="form-text">Restaurant Timings</small>
          <input
            type="text"
            name="timings"
            value={timings}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Yelp_Delivery">Cuisine</label>
          <br />
          <small className="form-text">Cuisine type</small>
          <input
            type="text"
            name="cuisine"
            value={cuisine}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="curbSidePickUp">Curbside PickUp</label>
          <br />
          <small className="form-text">Say yes or no</small>
          <input
            type="text"
            name="curbSidePickUp"
            value={curbSidePickUp}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="DineIn">Dine In</label>
          <br />
          <small className="form-text">Say yes or no</small>
          <input
            type="text"
            name="DineIn"
            value={DineIn}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="yelpDelivery">Yelp Delivery</label>
          <br />
          <small className="form-text">Say yes or no</small>
          <input
            type="text"
            name="yelpDelivery"
            value={yelpDelivery}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
        <Link className="btn btn-light my-1" to="/restdashboard">
          Cancel
        </Link>
      </form>
      </div>
    </Fragment>
    )
}

RestProfile.propTypes = {
    createRestProfile: PropTypes.func.isRequired,
}


export default connect(null, {createRestProfile})(withRouter(RestProfile)); 
