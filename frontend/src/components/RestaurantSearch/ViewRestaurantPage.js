import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {getRestProfilebyId} from '../../actions/restprofile'
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';

const ViewRestaurantPage = ({getRestProfilebyId, restprofile:{restprofile, loading}, match}) => {
    
    useEffect(()=>{
        getRestProfilebyId(match.params.id)
    }, [])

    return (
        loading && restprofile === null ? <Spinner /> : <Fragment>
        <Navbar />
        <div className='container'>
        <div className="container_2columns">
            <div className="column1">
                <Link to="/" className="btn btn-dark">Home</Link>
                <br/>
                <br/>
                {restprofile !== null ? <Fragment>
                    <img
                       src={restprofile.restuser.image}
                       alt="Profile Picture"
                    />
                    <h1 className="large text-black">{restprofile.restuser.restName}</h1>
                <h3 className='lead'> Ratings: {restprofile.reviews? (restprofile.reviews[0]? restprofile.reviews[0].rating: 'No reviews yet'): 'No reviews yet'}</h3>
                <h3 className="lead">{restprofile.cuisine} Cuisine </h3>
                <h4>
                <i className="far fa-clock"> </i> {restprofile.timings}
                </h4>
            <hr/>
            <h4>
             {restprofile.description}
                </h4>
            <h2> Services Update</h2>
            <div className='list'>
              <ul>
                <li>
                {restprofile.DineIn === 'yes' ? (
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
                {restprofile.curbSidePickUp === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> CurbSidePickUp{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> CurbSidePickUp{' '}
              </h3>
            )}
                </li>
                <li>
                {restprofile.yelpDelivery === 'yes' ? (
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
            
            <hr/>
            <h2> Reviews</h2>
            {restprofile.reviews
              ? restprofile.reviews.map((item) => (
                  <div>
                  <h4>
                    {item.rating} {' '} {item.date} 
                    <br/>
                    {item.review}
                  </h4>
                  <hr/>
                  </div>
                ))
              : 'No reviews yet'}
                </Fragment> : <Fragment>
                    <p className='lead text-dark'> This restaurant does not have profile yet</p>
                    <Link className='small text-primary' to='/createprofile'>Create One ?</Link>
                    </Fragment>}
            </div>
            <div  className="column2">
                <div className = "info">
                    {restprofile? <Fragment> 
                        <h4>
                <i className="fas fa-phone-alt text-dark" ></i> {' '}{restprofile.contact}
                </h4>
                <h4>
                <i className="fas fa-map-marked-alt text-dark"> </i> {' '}{restprofile.restuser.location}
                </h4>
                <h4>
                <i className="fas fa-envelope-open-text text-dark"> </i> {' '}{restprofile.restuser.restEmail}
                </h4>
                    </Fragment>: <p className="lead text-dark">No contact Info</p>}
                
                </div>

            </div>
        </div>
        </div>
    </Fragment>
    )
}

ViewRestaurantPage.propTypes = {
getRestProfilebyId: PropTypes.func.isRequired,
restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})

export default connect(mapStateToProps, {getRestProfilebyId})(ViewRestaurantPage)
