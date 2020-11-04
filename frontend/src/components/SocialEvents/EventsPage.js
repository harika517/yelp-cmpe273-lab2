import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllSocialEvents, getEventsBySearch} from '../../actions/socialevent'
import DashboardNav from '../layout/DashboardNav';
import EventItem from './EventItem';

const EventsPage = ({getAllSocialEvents, event:{socialevents, loading}, getEventsBySearch}) => {
    useEffect(()=>{
        getAllSocialEvents();
    }, [])

    const [formData, setFormData] = useState({
        search: '',
      });

      const { search } = formData;

      const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getEventsBySearch(search);
  };
    return (
        <Fragment>
            <DashboardNav/>
            {loading ? <Spinner/> : <Fragment>
                <div className="container">
                <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label for="search" className="lead text-primary">Search Events</label>
              <input
                type="text"
                placeholder="Event Name"
                name="search"
                value={search}
                onChange={(e) => onChange(e)}
              ></input>
            <br/>
            <button className="btn btn-dark" type="submit"> Search</button>
            </div>
            
          </form>
                <h1 className="lead text-dark"> Event Results
                </h1>
                <Link to='/userdashboard' className="btn btn-dark"> Go Back</Link>
                <Link to='/myevents' className="btn btn-dark"> Events Registered</Link>
                <hr/>
                <div className="container_2columns">
                <div className="column1">
                <div claasName='profiles'>
                    {socialevents.length > 0 ? (
                        socialevents.map(event=>(
                            <EventItem key={event._id} event={event}/>
                        ))): <p>No Events were found ...</p>}
                </div> 
                </div>
                </div>
                </div>
                </Fragment>}
        </Fragment>
    )
}

EventsPage.propTypes = {
    getAllRestProfiles: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    getEventsBySearch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, {getAllSocialEvents, getEventsBySearch})(EventsPage);
