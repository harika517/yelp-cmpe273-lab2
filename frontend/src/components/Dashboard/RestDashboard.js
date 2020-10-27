import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/restprofile';
import Spinner from '../layout/spinner';

const RestDashboard = ({ getCurrentRestProfile, auth: { user }, restprofile: { restprofile, loading } }) => {

    useEffect(() => {
        getCurrentRestProfile();
    }, [])
    
    return loading && restprofile === null ? <Spinner /> : <Fragment>
        <DashboardNav />
        <div className='container'>
        <div className="container_2columns">
            <div className="column1">
                {restprofile !== null ? <Fragment>
                    <h1 className="large text-black">{restprofile.restuser.restName}</h1>
                <h3 className='lead'> Ratings: {restprofile.reviews? (restprofile.reviews[0]? restprofile.reviews[0].rating: 'No reviews yet'): 'No reviews yet'}</h3>
                <h3 className="lead">{restprofile.cuisine} Cuisine </h3>
                <h4>
                <i className="far fa-clock"> </i> {restprofile.timings}
                </h4>
                <Link to="#" className=" btn btn-dark"><i className='fas fa-star'></i>
              Write a Review
            </Link>
            <Link to="#" className=" btn btn-light">
              Events
            </Link>
            <Link to="#" className=" btn btn-light">
              Menu
            </Link>
            <Link to="#" className=" btn btn-light">
              Orders
            </Link>
            <Link className='small text-primary' to='/updateprofile'>Update Profile</Link>
            <hr/>
            <h4>
             {restprofile.description}
                </h4>
            <h2> Services Update</h2>
            {restprofile.DineIn === 'yes' ? (
                <h3 className="bold text-dark">
                <i className="fas fa-check" /> DineIn{' '}
              </h3>
            ): (
                <h3 className="bold text-dark">
                <i className="fas fa-times" /> DineIn{' '}
              </h3>
            )}
            {restprofile.curbSidePickUp === 'yes' ? (
                <h3 className="bold text-dark">
                <i className="fas fa-check" /> CurbSidePickUp{' '}
              </h3>
            ): (
                <h3 className="bold text-dark">
                <i className="fas fa-times" /> CurbSidePickUp{' '}
              </h3>
            )}
            {restprofile.yelpDelivery === 'yes' ? (
                <h3 className="bold text-dark">
                <i className="fas fa-check" /> YelpDelivery{' '}
              </h3>
            ): (
                <h3 className="bold text-dark">
                <i className="fas fa-times" /> YelpDelivery{' '}
              </h3>
            )}
            <hr/>
            <h2> Reviews</h2>
            {restprofile.reviews
              ? restprofile.reviews.map((item) => (
                  <h4>
                    {item.rating} {' '} {item.date} 
                    <br/>
                    {item.review}
                  </h4>
                ))
              : 'No reviews yet'}
                </Fragment> : <Fragment>
                    <p className='lead text-dark'> This restaurant does not have profile yet</p>
                    <Link className='small text-primary' to='/createprofile'>Create One ?</Link>
                    </Fragment>}
            </div>
            <div  className="column2">
                <div className = "info">
                <h4>
                <i className="fa-phone-alt" ></i>{restprofile.contact}
                </h4>
                <h4>
                <i className="fa-map-marked-alt"> </i> {' '}{restprofile.restuser.location}
                </h4>
                </div>

            </div>
        </div>
        </div>
    </Fragment>
}

RestDashboard.propTypes = {
    getCurrentRestProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    restprofile: state.restprofile
})

export default connect(mapStateToProps, { getCurrentRestProfile })(RestDashboard);
