import React, { Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createSocialEvent} from '../../actions/socialevent'

const CreateEvent = ({createSocialEvent, history})=> {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventTimings: '',
        eventDate: '',
        eventLocation: '',
        eventHashtags: '',
      });

      const {
        eventName,
        eventDescription,
        eventTimings,
        eventDate,
        eventLocation,
        eventHashtags,
      } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      createSocialEvent(formData, history);
    };

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'> 
            <h1 className="text-dark medium">Create Profile</h1>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
          <label for="eventName">Name</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="eventName"
            value={eventName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="eventDescription">Description</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="eventDescription"
            value={eventDescription}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="eventTimings">Timings</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="eventTimings"
            value={eventTimings}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Contact">Date</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="eventDate"
            value={eventDate}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="eventLocation">Location</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="eventLocation"
            value={eventLocation}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="eventHashtags">HashTags</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="eventHashtags"
            value={eventHashtags}
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

CreateEvent.propTypes = {
    createSocialEvent: PropTypes.func.isRequired,
}

export default connect(null, {createSocialEvent})(CreateEvent);
