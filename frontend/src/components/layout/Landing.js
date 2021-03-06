import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {getRestaurantsSearchCriteria} from '../../actions/restsearchresults'

const Landing = ({ getRestaurantsSearchCriteria, isAuthenticated}) => {

    if (isAuthenticated) {
        return <Redirect to='/userdashboard' />
    }

    const [formData, setFormData] = useState({
        search: '',
      });
    
      const { search } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
        getRestaurantsSearchCriteria(formData);
        //get results Action
      };


    const guestLinks = (
        <ul className='search-options'>
            <li>
                <Link to="/events" className='bold'>Events</Link>
            </li>
            <li>
                <Link to="/reviews" className='bold'>Write a Review</Link>
            </li>
            <li>
                <Link to="/restlogin" className='bold'>Restaurant Users</Link>
            </li>
            <li>
                <Link to="/login" className='bold btn btn-light'>Login</Link>
            </li>
            <li>
                <Link to="/register" className='bold btn btn-trans' >SignUp</Link>
            </li>

        </ul>

    );

    return (
        <section className="landing ">
            <div className="landing-inner">
                <div className="main-options">
                    {/* {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)} */}
                    {guestLinks}
                </div>
                <img
                    className="logo-icon-large"
                    src="https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png"
                />
                <br />
                <div className="search-container">
                    <form className="search-form" onSubmit={(e) => onSubmit(e)}>
                        <input
                            type="text"
                            className="medium"
                            placeholder="Dishes, Location, Cuisine, Restaurants..."
                            name="search"
                          value={search}
                          onChange={(e) => onChange(e)}
                        />
                        <Link
                            to={`/restaurantresults/${search}`}
                            className="btn-search"
                            type="submit"
                        >
                            <i className="fa fa-search medium"></i>
                        </Link>
                    </form>
                </div>
                <br />
                <div className="options">
                    <ul className="search-options">
                        <li>
                            <Link to="/allrestaurants" className="text-light bold">
                                {' '}
                                <i className="fas fa-utensils" /> Restaurants
              </Link>
                        </li>
                        <li>
                            <Link to="/curbsidepickup" className="text-light bold">
                                {' '}
                                <i className="fas fa-gift" /> Curb Side PickUp
              </Link>
                        </li>
                        <li>
                            <Link to="/dinein" className="text-light bold">
                                {' '}
                                <i className="fas fa-glass-martini-alt" /> Dine In
              </Link>
                        </li>
                        <li>
                            <Link to="/yelpdelivery" className="text-light bold">
                                {' '}
                                <i className="fas fa-motorcycle" /> Yelp-Delivery
              </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    )
}
Landing.PropTypes = {
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);
