import React, { Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createUserProfile} from '../../actions/userprofile'

const UserProfile = ({createUserProfile, history}) => {
    const [formData, setFormData] = useState({
        contact: '',
        headline: '',
        city: '',
        country: '',
        dateOfBirth: '',
        findmein: '',
        myBlog: '',
        nickName: '',
        state: '',
        thingsILove: '',
        yelpingSince: ''
      });

      const {
        contact,
        headline,
        city,
        country,
        dateOfBirth,
        findmein,
        myBlog,
        nickName,
        state,
        thingsILove,
        yelpingSince
      } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      createUserProfile(formData, history);
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
          <label for="headline">Headline</label>
          <br />
          <input
            type="text"
            name="headline"
            value={headline}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="city">City</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="state">State</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="country">Country</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="dateOfBirth">Date Of Birth</label>
          <br />
          <input
            type="text"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="findmein">Find Me In </label>
          <br />
          <input
            type="text"
            name="findmein"
            value={findmein}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="myBlog">My Blog</label>
          <br />
          <input
            type="text"
            name="myBlog"
            value={myBlog}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="nickName">Nick Name</label>
          <br />
          <input
            type="text"
            name="nickName"
            value={nickName}
            onChange={(e) => onChange(e)}
          />
        </div>
        
        <div className="form-group">
          <label for="thingsILove">Things I Love</label>
          <br />
          <input
            type="text"
            name="thingsILove"
            value={thingsILove}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="yelpingSince">Yelping Since</label>
          <br />
          <input
            type="text"
            name="yelpingSince"
            value={yelpingSince}
            onChange={(e) => onChange(e)}
          />
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

UserProfile.propTypes = {
    createUserProfile: PropTypes.func.isRequired,
}

export default connect(null, {createUserProfile})(withRouter(UserProfile));
