import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const RestPrfoileItem = ({profile: {restuser: {_id, restName, image, location}, 
    contact, timings, cuisine, DineIn, curbSidePickUp, yelpDelivery }}) => {
    return (
        <div className="profile" >
            <img src={image} alt=""/>
            <div>
    <h3 className="lead text-dark"> {restName} </h3>
    <h3> {cuisine}</h3>
    <br/>
    <p><i className="far fa-clock text-dark"> </i> {' '}{timings}</p>
    <p><i className="fas fa-phone-alt text-dark"> </i>{' '}{contact}</p>
    <p><i className="fas fa-map-marked-alt text-dark"> </i>{' '}{location}</p>
    <br/>
    {DineIn === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> DineIn{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> DineIn{' '}
              </h3>
            )}
    {curbSidePickUp === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> curbSidePickUp{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> curbSidePickUp{' '}
              </h3>
            )}
    {yelpDelivery === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> YelpDelivery{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> YelpDelivery{' '}
              </h3>
            )}
            <br/>
            <Link to="#" className="btn btn-dark"> Order Now</Link>
            </div>
        </div>
    )
}

RestPrfoileItem.propTypes = {
 restprofile: PropTypes.object.isRequired,
}

export default RestPrfoileItem
