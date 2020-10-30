import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';
import {getEventDetail, eventRegistration} from '../../actions/socialevent';


const EventDetail = ({getEventDetail, event: {socialevent, loading}, auth, match}) => {
    useEffect(()=>{
        getEventDetail(match.params.id);
    }, [getEventDetail])

    const onSubmit = () => {
        eventRegistration(socialevent[0]._id);
      };

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'>
            
            {socialevent ===null || loading? <Spinner/> : <Fragment>
    
            <h1 className="lead text-dark">{socialevent[0].eventName}</h1>
            <p className='medium'> <i className='fas fa-clock text-dark'></i> {' '} Timings : {socialevent[0].eventTimings}</p>
            <p className='medium'><i className='fas fa-calendar-alt text-dark'></i> {' '}Date : {socialevent[0].eventDate}</p>
            <p className='medium'><i className='fas fa-map-marker-alt text-dark'></i> {' '}Location : {socialevent[0].eventLocation}</p>
            <br/>
            <p>{socialevent[0].eventDescription}</p>
            <br/>
            <p>{socialevent[0].eventHashtags}</p>
            <br/>
            <hr/>
            <Link to="/events" className="btn btn-dark" onClick={onSubmit} >
        Register
      </Link>
      <Link to='/events' className="btn btn-light" >Back</Link>
      
            </Fragment>}
            </div>
        </Fragment>
    )
}

EventDetail.propTypes = {
    getEventDetail: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    eventRegistration: PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
    event: state.event,
    auth: state.auth
})

export default connect(mapStateToProps, {getEventDetail, eventRegistration})(EventDetail);
