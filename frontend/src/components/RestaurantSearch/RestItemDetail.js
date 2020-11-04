import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

    const RestItemDetail = ({profile: {restuser: {_id, restName, image, location}, 
        contact, timings, cuisine, DineIn, curbSidePickUp, yelpDelivery }}) => {
 
          const backendimageserver = "http://127.0.0.1:3001/api/images/rest/"

        return (
            <div className="profile" >
                <img src={
               image
                 ? `${backendimageserver}${image}`
                 : `${backendimageserver}image`
             } alt=""/>
                <div>
        <h3 className="lead text-dark"> {restName} </h3>
        <h3> {cuisine}</h3>
        <hr/>
        <p><i className="far fa-clock text-dark"> </i> {' '}{timings}</p>
        <br/>
        <p><i className="fas fa-phone-alt text-dark"> </i>{' '}{contact}</p>
        <br/>
        <p><i className="fas fa-map-marked-alt text-dark"> </i>{' '}{location}</p>
        <hr/>
        <div className='list'>
          <ul>
            <li>
            {DineIn === 'yes' ? (
                    <h3 className="small text-dark">
                    <i className="fas fa-check" /> DineIn{' '}
                  </h3>
                ): (
                    <h3 className="small text-dark">
                    <i className="fas fa-times" /> DineIn{' '}
                  </h3>
                )}
            </li>
            <li>
            {curbSidePickUp === 'yes' ? (
                    <h3 className="small text-dark">
                    <i className="fas fa-check" /> curbSidePickUp{' '}
                  </h3>
                ): (
                    <h3 className="small text-dark">
                    <i className="fas fa-times" /> curbSidePickUp{' '}
                  </h3>
                )}
            </li>
            <li>
            {yelpDelivery === 'yes' ? (
                    <h3 className="small text-dark">
                    <i className="fas fa-check" /> YelpDelivery{' '}
                  </h3>
                ): (
                    <h3 className="small text-dark">
                    <i className="fas fa-times" /> YelpDelivery{' '}
                  </h3>
                )}
            </li>
          </ul>
        </div>
        <br/>
            <Link to={`/restaurantdetails/${_id}`} className="btn btn-dark"> View Details</Link>
                </div>
            </div>
        )
    }
    
    RestItemDetail.propTypes = {
     restprofile: PropTypes.object.isRequired,
    }
    
    export default RestItemDetail
    
