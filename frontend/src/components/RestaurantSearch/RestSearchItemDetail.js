import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const RestSearchItemDetail = ({profile}) => {

    const backendimageserver = "http://127.0.0.1:3001/api/images/rest/"

    return (
profile.restuser? <Fragment>
    <div className="profile" >
                <img src={
               profile.restuser.image
                 ? `${backendimageserver}${profile.restuser.image}`
                 : `${backendimageserver}image`
             } alt=""/>
                <div>
        <h3 className="lead text-dark"> {profile.restuser.restName} </h3>
        <h3> {profile.restuser.restEmail}</h3>
        <br/>
        <p><i className="fas fa-map-marked-alt text-dark"> </i>{' '}{profile.restuser.location}</p>
        <hr/>
        <Link to={`/restaurantdetails/${profile.restuser._id}`} className="btn btn-dark"> More Details</Link>
        </div>
        
        
        </div>

</Fragment> : <Fragment>
<div className="profile" >
                <img src={
               profile.image
                 ? `${backendimageserver}${profile.image}`
                 : `${backendimageserver}image`
             } alt=""/>
                <div>
        <h3 className="lead text-dark"> {profile.restName} </h3>
        <h3> {profile.restEmail}</h3>
        <br/>
        <p><i className="fas fa-map-marked-alt text-dark"> </i>{' '}{profile.location}</p>
        <hr/>
        <Link to={`/restaurantdetails/${profile._id}`} className="btn btn-dark"> More Details</Link>
        </div>
        </div>

</Fragment>
     
    )
}

RestSearchItemDetail.propTypes = {
    profile: PropTypes.object.isRequired,

}

export default RestSearchItemDetail
