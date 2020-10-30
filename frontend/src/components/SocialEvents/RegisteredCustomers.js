import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getCustomersRegistered} from '../../actions/socialevent'
import DashboardNav from '../layout/DashboardNav';
 import CustomerProfileItem from './CustomerProfileItem';

const RegisteredCustomers = ({getCustomersRegistered, match, event:{viewattendees, loading}}) => {
    useEffect(()=>{
        getCustomersRegistered(match.params.id);
    }, [])

    return (
        <Fragment>
            <DashboardNav/>
            {loading ? <Spinner/> : <Fragment>
                <div className="container">
                <h1 className="lead text-dark"> Attendees List
                </h1>
                <Link to='/restdashboard' className="btn btn-dark"> Go Back</Link>
                {/* <Link to='/createvents' className="btn btn-dark"> Create Events</Link> */}
                <hr/>
                <div className="container_2columns">
                <div className="column1">
                <div claasName='profiles'>
                    {viewattendees.length > 0 ? (
                        viewattendees.map(attendee=>(
                            <CustomerProfileItem key={attendee._id} attendee={attendee}/>
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

RegisteredCustomers.propTypes = {
    getCustomersRegistered: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    event: state.event
})


export default connect(mapStateToProps, {getCustomersRegistered})(RegisteredCustomers)
