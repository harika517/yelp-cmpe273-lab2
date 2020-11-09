import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//  import yelplogo from '../../../public/images'

const CustomerProfileItem = ({ attendee }) => {

    const backendimageserver = "http://3.101.107.33:3001/api/userimages/user/"

    return ( <
        div className = "profile" >
        <
        img src = {
            attendee.image.file ?
            `${backendimageserver}${attendee.image}` :
                `${backendimageserver}image`
        }
        alt = "Profile Picture" /
        >
        <
        div >
        <
        h3 className = "lead text-dark" > { attendee.userName } < /h3>

        <
        br / >
        <
        br / >

        <
        p > < i className = "fas fa-envelope-open-text text-dark" > < /i>{' '}{attendee.userEmail}</p >

        <
        br / >
        <
        br / >
        <
        br / >
        <
        br / >
        <
        Link to = { `/registereduser/${attendee.user}` }
        className = "btn btn-dark" > View Profile < /Link> <
        /div> <
        /div>

    )
}

CustomerProfileItem.propTypes = {
    event: PropTypes.object.isRequired,

}

export default CustomerProfileItem