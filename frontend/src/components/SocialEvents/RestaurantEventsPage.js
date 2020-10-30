import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllSocialEvents} from '../../actions/socialevent'
//Change the action
import DashboardNav from '../layout/DashboardNav';
import RestEventItem from './RestEventItem';

const RestaurantEventsPage = ({getAllSocialEvents, event:{socialevents, loading}}) => {
    useEffect(()=>{
        getAllSocialEvents();
    }, [])

    return (
        <Fragment>
            <DashboardNav/>
            {loading ? <Spinner/> : <Fragment>
                <div className="container">
                <h1 className="lead text-dark"> Event Results
                </h1>
                <Link to='/restdashboard' className="btn btn-dark"> Go Back</Link>
                <Link to='/createvents' className="btn btn-dark"> Create Events</Link>
                <hr/>
                <div className="container_2columns">
                <div className="column1">
                <div claasName='profiles'>
                    {socialevents.length > 0 ? (
                        socialevents.map(event=>(
                            <RestEventItem key={event._id} event={event}/>
                        ))): <p>No Events were found ...</p>}
                </div>
                 <div className="column2">
                    
                </div> 
                </div>
                </div>
                </div>
                </Fragment>}
        </Fragment>
    )
}

RestaurantEventsPage.propTypes = {
    getAllRestProfiles: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    event: state.event
})


export default connect(mapStateToProps, {getAllSocialEvents})(RestaurantEventsPage)
