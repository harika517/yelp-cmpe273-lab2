import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getEventsRegistered} from '../../actions/socialevent'
import DashboardNav from '../layout/DashboardNav';

const EventsRegistered = ({getEventsRegistered, event:{registeredevents, loading}}) => {
    useEffect(()=>{
        getEventsRegistered();
    },[])
    return (
       <Fragment>
           <DashboardNav/>
           {loading ? <Spinner/> : <Fragment>
<div className="container">
<h1 className="lead text-dark"> Events Attending
                </h1>
                <Link to='/events' className="btn btn-dark"> Go Back</Link>
                <hr/>
                <div className="container_2columns">
                <div className="column1">
                <div claasName='profiles'>
                    {registeredevents.length > 0 ? (
                        registeredevents.map(event=>(
                            <Fragment>
                                <div className="cardbox">
                                <h1 className="lead text-dark"> {event.eventName}</h1>
                                <p> {' '} "{event.eventDescription}"</p>
                                <br/>
                                <p className='small'> <i className='fas fa-clock text-dark'></i> {' '} Timings : {event.eventTimings}</p>
                                <br/>
                                <p className='small'><i className='fas fa-calendar-alt text-dark'></i> {' '}Date : {event.eventDate}</p>
                                <br/>
                                <p className='small'><i className='fas fa-map-marker-alt text-dark'></i> {' '}Location : {event.eventLocation}</p>
                                <br/>
                                </div>

                            </Fragment>
                        ))): <p>You have not registered for any events ...</p>}
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

EventsRegistered.propTypes = {
    getEventsRegistered: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
event: state.event
})

export default connect(mapStateToProps, {getEventsRegistered})(EventsRegistered);
