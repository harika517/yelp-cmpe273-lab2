import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//  import yelplogo from '../../../public/images'

const EventItem = ({event: {restuser: {restName, location}, _id,
    eventName, eventTimings, eventDate, eventLocation }}) => {
    return (
        <div className="Event_Cards" >
            <div className="Event_Card">
            {/* <img className='Event_img' src='./yelp_events.jpeg' alt=""/> */}
            
            
            <div className= "Event_Content">
     <h3 className="lead text-dark"> {eventName} </h3>
    <br/>
    <p><i className="far fa-clock text-dark"> </i> {' '}{eventTimings}</p>
    <p><i className="fas fa-calendar-alt text-dark"> </i>{' '}{eventDate}</p>
    <p><i className="fas fa-map-marked-alt text-dark"> </i>{' '}{eventLocation}</p>
    <div className='Event_info'>
    <Link to={`/event/${_id}`} className="text-dark"> view details</Link>
    </div>
    </div>
            
            </div>

        </div>
        
    )
}

EventItem.propTypes = {
    event: PropTypes.object.isRequired,

}

export default EventItem
