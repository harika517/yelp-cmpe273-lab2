import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const YelpUserItem = ({profile: {user: {_id, userName, firstName, lastName, userEmail, image}, headline}}) => {
    return (
        <div className="profile" >
            <img src={image} alt=""/>
            <div>
    <h3 className="lead text-dark"> Name: {' '} {firstName} {' '} {lastName}  </h3>
    
    <hr/>
    <p>"{headline}"</p>
    <br/>
    <p><i className="fas fa-envelope-open-text text-dark"> </i> Email: {' '}{userEmail}</p>
    <br/>
    <br/>
            <Link to={`/yelpuserdetail/${_id}`} className="btn btn-dark"> Know more..</Link>
            </div>
        </div>
    )
}

YelpUserItem.propTypes = {
 userprofile: PropTypes.object.isRequired,
}

export default YelpUserItem
