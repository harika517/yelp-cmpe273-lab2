import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//  import yelplogo from '../../../public/images'

const CustomerProfileItem = ({attendee}) => {
        
    return (
        <div className="profile" >
            <img src={attendee.image} alt=""/>
            <div>
            <h3 className="lead text-dark"> {attendee.userName} </h3>
            <p><i className="fas fa-envelope-open-text text-dark"> </i>{' '}{attendee.userEmail}</p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Link to={`/registereduser/${attendee.user}`} className="btn btn-dark"> View Profile</Link>
            </div>
        </div>
        
    )
}

CustomerProfileItem.propTypes = {
    event: PropTypes.object.isRequired,

}

export default CustomerProfileItem
